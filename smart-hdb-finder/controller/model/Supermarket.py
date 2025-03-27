from pydantic import BaseModel

class Supermarket(BaseModel):
    name: str
    postal: str
    latitude: float
    longitude: float
    geohash: str