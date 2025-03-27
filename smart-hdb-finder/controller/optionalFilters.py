from math import radians, sin, cos, asin, sqrt
from typing import List
import pygeohash as pgh
import firebase_admin
from firebase_admin import firestore, credentials
from .model import HDBRecord, HDBSearchParams, MRTStation, Supermarket, Hawker, CommunityClub, CHASClinic

cred = credentials.Certificate("smart-hdb-finder-firebase-adminsdk-fbsvc-7384d88d6e.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Mapping of amenity keys to a tuple of (Firestore Collection Name, Pydantic Model)
AMENITY_MAP = {
    "mrtStation": ("mrt_stations", MRTStation),
    "clinics": ("clinic_locations", CHASClinic),
    "hawkerCentre": ("hawkers_centres", Hawker),
    "communityClub": ("community_clubs", CommunityClub),
    "superMarket": ("supermarket_locations", Supermarket),
}

#####################################
# Helper functions 
#####################################
def get_geohash_prefix(lat: float, lon: float, length: int = 5) -> str:
    full_hash = pgh.encode(lat, lon)
    return full_hash[:length]

def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculates the Haversine distance (in km) between two points.
    """
    R = 6371  # Earth's radius in kilometers
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    return R * c

def fetch_amenities_by_type(amenity_key: str, geohash_prefix: str) -> List[Any]:
    """
    Fetches amenities from Firestore for the given amenity key using the provided geohash prefix.
    
    amenity_key: One of the keys in AMENITY_MAP, e.g., 'mrtStation', 'clinics', etc.
    geohash_prefix: The prefix of the geohash to use for filtering.
    
    Returns a list of instances of the corresponding Pydantic model.
    """
    if amenity_key not in AMENITY_MAP:
        return []
    collection, model: (str, Type) = AMENITY_MAP[amenity_key]
    query = db.collection(collection).where("geohash", ">=", geohash_prefix).where("geohash", "<", geohash_prefix + "z")
    results = [doc.to_dict() for doc in query.stream()]
    return [model(**data) for data in results]

#####################################
# Main function
#####################################

def meets_toggle_criteria(record_obj, toggles) -> bool:
    """
    For each enabled amenity toggle in 'toggles', fetch the corresponding amenities
    and, if any candidate is within 1 km of the record, add its name to record_obj.nearby_amenities.
    
    Returns True if at least one candidate was found within range.
    """
    record_obj.nearby_amenities = []
    hdb_prefix = get_geohash_prefix(record_obj.latitude, record_obj.longitude, length=5)
    
    for amenity_key, is_enabled in toggles.items():
        if is_enabled:
            candidates = fetch_amenities_by_type(amenity_key, hdb_prefix)
            for candidate in candidates:
                dist = calculate_distance(record_obj.latitude, record_obj.longitude,
                                          candidate.latitude, candidate.longitude)
                if dist <= 1.0:
                    record_obj.nearby_amenities.append(candidate.name)
    
    return len(record_obj.nearby_amenities) > 0