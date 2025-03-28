from pydantic import root_validator
from .Amenity import Amenity

class CHASClinic(Amenity):
    x_coordinate: float
    y_coordinate: float

    @root_validator(pre=True)
    def map_extra_keys(cls, values):
        # Call the base class validator explicitly to map common fields.
        values = Amenity.map_firestore_keys.__func__(cls, values)
        extras = {
            "x_coordinate": float(values.get("X_COORDINATE", 0)),
            "y_coordinate": float(values.get("Y_COORDINATE", 0))
        }
        return {**values, **extras}