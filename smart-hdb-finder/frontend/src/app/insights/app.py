from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI()

# Load your trained model
model = joblib.load("resale_price_model.pkl")  # Save this from your notebook

# Define input schema
class InputData(BaseModel):
    town: str
    flat_type: str
    floor_area_sqm: float
    remaining_lease: int
    storey_range: str
    flat_model: str

@app.post("/predict")
def predict_price(data: InputData):
    try:
        # Convert to DataFrame
        input_df = pd.DataFrame([data.dict()])
        prediction = model.predict(input_df)[0]
        return {"predicted_price": round(prediction, 2)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

