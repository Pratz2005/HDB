from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd

app = FastAPI()

# Enable CORS for local development (adjust for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your merged pipeline (preprocessing + model)
# Make sure 'model_pipeline.pkl' is in the same directory or provide a full path.
with open("model_pipeline.pkl", "rb") as f:
    pipeline = pickle.load(f)

# Create a month mapping so we can convert month names to numeric values.
# Adjust to match the months you display in your frontend dropdown.
MONTH_MAP = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12
}

# Define the data structure expected from the frontend
class PredictionInput(BaseModel):
    town: str
    flat_type: str
    future_year: int
    month: str

@app.post("/predict")
async def predict(data: PredictionInput):
    """
    Accepts user inputs: town, flat_type, future_year, and month name.
    Converts month name to month_num. Feeds data into the pipeline for prediction.
    Returns predicted resale price.
    """
    # Convert the month name to its numeric value
    month_num = MONTH_MAP.get(data.month, 0)  # default to 0 if not found

    # Create a DataFrame to feed into the pipeline
    input_df = pd.DataFrame({
        "town": [data.town],
        "flat_type": [data.flat_type],
        "year": [data.future_year],
        "month_num": [month_num]
    })

    # Generate a prediction using the loaded pipeline
    prediction = pipeline.predict(input_df)[0]

    # Return the prediction as JSON (you can format or round as needed)
    return {"predicted_price": float(prediction)}

# For local testing: uvicorn main:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

@app.get("/trend")
async def get_trend(town: str, flat_type: str):
    try:
        # Load the CSV file (ensure the path is correct)
        df = pd.read_csv("ResaleData.csv")
        
        # Filter the dataset by town and flat type
        filtered_df = df[(df["town"] == town) & (df["flat_type"] == flat_type)]
        if filtered_df.empty:
            raise HTTPException(status_code=404, detail="No data found for given parameters")
        
        # Group by year and calculate the average resale price
        trend_data = (
            filtered_df.groupby("year")["resale_price"]
            .mean()
            .reset_index()
            .rename(columns={"resale_price": "average_price"})
            .sort_values("year")
        )
        
        # Return the result as a list of records
        return {"trend": trend_data.to_dict(orient="records")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
# To run the application with uvicorn, add this block:
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("trial:app", host="0.0.0.0", port=8000, reload=True)
