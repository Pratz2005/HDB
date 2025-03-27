from pydantic import BaseModel

class Hawker(BaseModel):
    name: str
    postal: str
    x_coordinate: float
    y_coordinate: float
    latitude: float
    longitude: float
    geohash: str