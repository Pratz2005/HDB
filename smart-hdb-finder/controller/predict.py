from fastapi import APIRouter, HTTPException
import pickle
import os
import pandas as pd

from model.predictionModel.PredictionParams import PredictionParams

router = APIRouter()

# Construct an absolute file path to model_pipeline.pkl relative to this file.
base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_dir, "..", "model", "predictionModel", "model_pipeline.pkl")
csv_path = os.path.join(base_dir, "..", "model", "predictionModel", "ResaleData.csv")

# Load your merged pipeline (preprocessing + model)
with open(model_path, "rb") as f:
    pipeline = pickle.load(f)

# Create a month mapping so we can convert month names to numeric values.
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

@router.post("/predict")
async def predict(data: PredictionParams):
    """
    Accepts user inputs: town, flat_type, future_year, and month name.
    Converts month name to month_num, feeds data into the pipeline for prediction,
    and returns the predicted resale price.
    """
    # Convert the month name to its numeric value.
    month_num = MONTH_MAP.get(data.month, 0)  # default to 0 if not found

    # Create a DataFrame to feed into the pipeline.
    input_df = pd.DataFrame({
        "town": [data.town],
        "flat_type": [data.flat_type],
        "year": [data.future_year],
        "month_num": [month_num]
    })

    # Generate a prediction using the loaded pipeline.
    prediction = pipeline.predict(input_df)[0]

    # Return the prediction as JSON.
    return {"predicted_price": float(prediction)}

@router.get("/trend")
async def get_trend(town: str, flat_type: str):
    try:
        # Load the CSV file (ensure the path is correct)
        df = pd.read_csv(csv_path)
        
        # Convert 'month' to datetime and create 'year' column
        df['month'] = pd.to_datetime(df['month'], format="%Y-%m", errors='coerce')
        df['year'] = df['month'].dt.year
        
        # Standardize text columns for a case-insensitive match
        df['town'] = df['town'].str.upper().str.strip()
        df['flat_type'] = df['flat_type'].str.upper().str.strip()
        input_town = town.strip().upper()
        input_flat_type = flat_type.strip().upper()
        
        # Filter the dataset by town and flat type
        df_filtered = df[(df["town"] == input_town) & (df["flat_type"] == input_flat_type)]
        if df_filtered.empty:
            raise HTTPException(status_code=404, detail="No data found for given parameters")
        
        # Group by year and calculate the average resale price
        trend_data = (
            df_filtered.groupby("year")["resale_price"]
            .mean()
            .reset_index()
            .rename(columns={"resale_price": "average_price"})
            .sort_values("year")
        )
        
        # Return the result as a list of records
        return {"trend": trend_data.to_dict(orient="records")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))