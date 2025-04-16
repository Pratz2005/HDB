from pydantic import root_validator
from .Amenity import Amenity

class SecondarySch(Amenity):
    @root_validator(pre=True)
    def map_keys(cls, values):
        return Amenity.map_firestore_keys(values)