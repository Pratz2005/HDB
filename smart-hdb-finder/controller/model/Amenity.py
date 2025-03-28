from pydantic import BaseModel
from typing import Any, Dict

class Amenity(BaseModel):
    name: str
    postal: str
    latitude: float
    longitude: float
    geohash: str

    @classmethod
    def map_firestore_keys(cls, values: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "name": values.get("NAME") or "",
            "postal": values.get("POSTAL_CD") or "",
            "latitude": values.get("geopoint").latitude if values.get("geopoint") else 0.0,
            "longitude": values.get("geopoint").longitude if values.get("geopoint") else 0.0,
            "geohash": values.get("geohash") or "",
        }