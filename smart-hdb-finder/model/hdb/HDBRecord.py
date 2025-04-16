from pydantic import BaseModel, Field, root_validator
from typing import List

class HDBRecord(BaseModel):
    town: str
    block: str
    flat_type: str
    floor_area_sqm: float
    latitude: float
    longitude: float
    month: str
    postal: int
    street_name: str
    remaining_lease: str
    resale_price: float
    geohash: str
    nearby_amenities: List[dict] = Field(default_factory=list)
    
    @root_validator(pre=True)
    def map_firestore_keys(cls, values):
        return {
            "town": values.get("TOWN"),
            "block": values.get("BLOCK"),
            "flat_type": values.get("FLAT_TYPE"),
            "floor_area_sqm": values.get("FLOOR_AREA_SQM"),
            "latitude": float(values.get("LATITUDE")) if values.get("LATITUDE") is not None else 0.0,
            "longitude": float(values.get("LONGITUDE")) if values.get("LONGITUDE") is not None else 0.0,
            "month": values.get("MONTH"),
            "postal": int(values.get("POSTAL")) if values.get("POSTAL") is not None else 0,
            "street_name": values.get("STREET_NAME"),
            "remaining_lease": values.get("REMAINING_LEASE"),
            "resale_price": values.get("RESALE_PRICE"),
            "geohash": values.get("geohash")
        }