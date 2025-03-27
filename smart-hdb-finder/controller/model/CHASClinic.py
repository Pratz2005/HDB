from pydantic import BaseModel, root_validator

class CHASClinic(BaseModel):
    name: str
    postal: str
    x_coordinate: float
    y_coordinate: float
    latitude: float
    longitude: float
    geohash: str
    
    @root_validator(pre=True)
    def map_firestore_keys(cls, values):
        return {
            "name": values.get("NAME"),
            "postal": values.get("POSTAL_CD"),
            "x_coordinate": float(values.get("X_COORDINATE", 0)),
            "y_coordinate": float(values.get("Y_COORDINATE", 0)),
            "latitude": values.get("geopoint").latitude if "geopoint" in values else None,
            "longitude": values.get("geopoint").longitude if "geopoint" in values else None,
            "geohash": values.get("geohash"),
        }