from pydantic import BaseModel, root_validator

class Supermarket(BaseModel):
    name: str
    postal: str
    latitude: float
    longitude: float
    geohash: str
    
    @root_validator(pre=True)
    def map_firestore_keys(cls, values):
        return {
            "name": values.get("NAME"),
            "postal": values.get("POSTAL_CD"),
            "latitude": values.get("geopoint").latitude if "geopoint" in values else None,
            "longitude": values.get("geopoint").longitude if "geopoint" in values else None,
            "geohash": values.get("geohash"),
        }