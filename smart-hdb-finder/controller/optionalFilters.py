from math import radians, sin, cos, asin, sqrt
from typing import List
import pygeohash as pgh
import firebase_admin
from firebase_admin import firestore, credentials
from .model import HDBRecord, HDBSearchParams, MRTStation, Supermarket, Hawker, CommunityClub, CHASClinic

cred = credentials.Certificate("path/to/your/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

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

def fetch_mrt_stations_by_geohash(geohash_prefix: str) -> List[MRTStation]:
    query = db.collection("mrt_stations") \
              .where("geohash", ">=", geohash_prefix) \
              .where("geohash", "<", geohash_prefix + "z")
    results = [doc.to_dict() for doc in query.stream()]
    return [MRTStation(**data) for data in results]

def fetch_chas_clinics_by_geohash(geohash_prefix: str) -> List[CHASClinic]:
    query = db.collection("chas_clinics") \
              .where("geohash", ">=", geohash_prefix) \
              .where("geohash", "<", geohash_prefix + "z")
    results = [doc.to_dict() for doc in query.stream()]
    return [CHASClinic(**data) for data in results]

def fetch_hawkers_by_geohash(geohash_prefix: str) -> List[Hawker]:
    query = db.collection("hawkers") \
              .where("geohash", ">=", geohash_prefix) \
              .where("geohash", "<", geohash_prefix + "z")
    results = [doc.to_dict() for doc in query.stream()]
    return [Hawker(**data) for data in results]

def fetch_community_clubs_by_geohash(geohash_prefix: str) -> List[CommunityClub]:
    query = db.collection("community_clubs") \
              .where("geohash", ">=", geohash_prefix) \
              .where("geohash", "<", geohash_prefix + "z")
    results = [doc.to_dict() for doc in query.stream()]
    return [CommunityClub(**data) for data in results]

def fetch_supermarkets_by_geohash(geohash_prefix: str) -> List[Supermarket]:
    query = db.collection("supermarkets") \
              .where("geohash", ">=", geohash_prefix) \
              .where("geohash", "<", geohash_prefix + "z")
    results = [doc.to_dict() for doc in query.stream()]
    return [Supermarket(**data) for data in results]

def meets_toggle_criteria(record_obj, toggles) -> bool:
    """
    For a given HDB record, for each enabled amenity toggle,
    this function:
      1. Computes the geohash prefix of the HDB record.
      2. Fetches by querying Firestore for the corresponding amenity data.
      3. Calculates the Haversine distance between the HDB record and each candidate.
      4. If a candidate is within 1 km, adds its name to record_obj.nearby_amenities.
    Returns True if at least one candidate is within range.
    """
    record_obj.nearby_amenities = []
    hdb_prefix = get_geohash_prefix(record_obj.latitude, record_obj.longitude, length=5)
    
    if toggles.get("mrtStation", False):
        mrt_candidates = fetch_mrt_stations_by_geohash(hdb_prefix)
        for mrt in mrt_candidates:
            dist = calculate_distance(record_obj.latitude, record_obj.longitude,
                                      mrt.latitude, mrt.longitude)
            if dist <= 1.0:
                record_obj.nearby_amenities.append(mrt.name)
    
    if toggles.get("clinics", False):
        clinics_candidates = fetch_chas_clinics_by_geohash(hdb_prefix)
        for clinic in clinics_candidates:
            dist = calculate_distance(record_obj.latitude, record_obj.longitude,
                                      clinic.latitude, clinic.longitude)
            if dist <= 1.0:
                record_obj.nearby_amenities.append(clinic.name)
    
    if toggles.get("hawkerCentre", False):
        hawker_candidates = fetch_hawkers_by_geohash(hdb_prefix)
        for hawker in hawker_candidates:
            dist = calculate_distance(record_obj.latitude, record_obj.longitude,
                                      hawker.latitude, hawker.longitude)
            if dist <= 1.0:
                record_obj.nearby_amenities.append(hawker.name)
    
    if toggles.get("communityClub", False):
        clubs_candidates = fetch_community_clubs_by_geohash(hdb_prefix)
        for club in clubs_candidates:
            dist = calculate_distance(record_obj.latitude, record_obj.longitude,
                                      club.latitude, club.longitude)
            if dist <= 1.0:
                record_obj.nearby_amenities.append(club.name)
    
    if toggles.get("superMarket", False):
        sms_candidates = fetch_supermarkets_by_geohash(hdb_prefix)
        for sm in sms_candidates:
            dist = calculate_distance(record_obj.latitude, record_obj.longitude,
                                      sm.latitude, sm.longitude)
            if dist <= 1.0:
                record_obj.nearby_amenities.append(sm.name)
    
    return len(record_obj.nearby_amenities) > 0