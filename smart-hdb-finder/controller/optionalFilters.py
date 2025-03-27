from math import radians, sin, cos, asin, sqrt
from typing import List, Any, Tuple, Type
import os
import pygeohash as pgh
import firebase_admin
from firebase_admin import firestore, credentials
from .model.HDBRecord import HDBRecord
from .model.MRTStation import MRTStation
from .model.Supermarket import Supermarket
from .model.Hawker import Hawker
from .model.CommunityClub import CommunityClub
from .model.CHASClinic import CHASClinic
from .onemap import get_lat_lon_from_onemap

import logging
logging.basicConfig(
    level=logging.INFO,  # Set the logging level to INFO
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",  # Format for logs
)
logger = logging.getLogger("controller.main")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
cred_file = os.path.join(BASE_DIR, "smart-hdb-finder-firebase-adminsdk-fbsvc-7384d88d6e.json")

cred = credentials.Certificate(cred_file)
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
    prefix = full_hash[:length]
    logger.info("Generated full geohash: %s, prefix: %s", full_hash, prefix)
    return prefix

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
    logger.info("fetch_amenities_by_type called with amenity_key: %s, geohash_prefix: %s", amenity_key, geohash_prefix)
    if amenity_key not in AMENITY_MAP:
        return []
    collection, model = AMENITY_MAP[amenity_key]
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
    logger.info("meets_toggle_criteria called with record_obj: %s, toggles: %s", record_obj, toggles)
    record_obj.nearby_amenities = []
    hdb_address = record_obj.block + " " + record_obj.street_name
    hdb_latitude, hdb_longitude = get_lat_lon_from_onemap(hdb_address)
    hdb_prefix = get_geohash_prefix(hdb_latitude, hdb_longitude, length=5)
    
    for amenity_key, is_enabled in toggles.items():
        logger.info("Inside loop for key: %s", amenity_key)
        logger.info("Checking toggle for %s: %s", amenity_key, is_enabled)
        if is_enabled:
            candidates = fetch_amenities_by_type(amenity_key, hdb_prefix)
            logger.info("Candidates for %s: %s", amenity_key, candidates)
            for candidate in candidates:
                dist = calculate_distance(hdb_latitude, hdb_longitude,
                                        candidate.latitude, candidate.longitude)
                logger.info("Distance to %s: %s km", candidate.name, dist)
                if dist <= 1.0:
                    record_obj.nearby_amenities.append(candidate.name)
    
    return len(record_obj.nearby_amenities) > 0