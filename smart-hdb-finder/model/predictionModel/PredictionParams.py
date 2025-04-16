from pydantic import BaseModel

class PredictionParams(BaseModel):
    town: str
    flat_type: str
    future_year: int
    month: str