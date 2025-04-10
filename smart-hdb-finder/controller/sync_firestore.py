import os
import requests
import json
import pygeohash as pgh
from firebase_admin import firestore
from .firebaseClient import db  

def get_lat_lon_from_onemap(address: str):
    bearer = os.getenv('ACCESS_TOKEN')
    url = f"https://www.onemap.gov.sg/api/common/elastic/search?searchVal={address}&returnGeom=Y&getAddrDetails=Y&pageNum=1"
    headers = {"Authorization": f"Bearer {bearer}"}
    
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return None, None, None

    results = response.json().get("results")
    if not results:
        return None, None, None

    result = results[0]

    lat = result.get("LATITUDE")
    lon = result.get("LONGITUDE")
    postal = result.get("POSTAL")

    if not lat or not lon or postal == "NIL":
        return None, None, None

    return float(lat), float(lon), int(postal)


def normalize_lease(lease):
    lease = lease.upper().replace(" ", "_")
    if "YEARS" in lease and "MONTHS" not in lease:
        lease += "_00_MONTHS"
    return lease

def generate_doc_id(item):
    resale_price = str(float(item["RESALE_PRICE"]))  # keep .0 if present
    lease = normalize_lease(item["REMAINING_LEASE"])
    
    return f"{item['BLOCK'].strip()}_{item['STREET_NAME'].strip()}_{item['MONTH'].strip()}_" \
           f"{item['FLAT_TYPE'].strip()}_{resale_price}_{lease}" \
           .replace(" ", "_").upper()

def normalize_keys(record):
    return {
        "BLOCK": record["block"],
        "STREET_NAME": record["street_name"],
        "MONTH": record["month"],
        "FLAT_TYPE": record["flat_type"],
        "RESALE_PRICE": record["resale_price"],
        "REMAINING_LEASE": record["remaining_lease"],
        "FLOOR_AREA_SQM": record["floor_area_sqm"],
        "TOWN": record["town"]
    }

def fetch_and_upload_latest_hdb_data():
    dataset_id = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc"
    base_url = "https://data.gov.sg/api/action/datastore_search"
    filters = {
        "month": [
            "2025-01", "2025-02", "2025-03", "2025-04", "2025-05", "2025-06",
            "2025-07", "2025-08", "2025-09", "2025-10", "2025-11", "2025-12"
        ]
    }
    params = {
        "resource_id": dataset_id,
        "limit": 5000,
        "filters": json.dumps(filters)
    }

    response = requests.get(base_url, params=params)
    records = response.json()["result"]["records"]

    for rec in records:
        item = normalize_keys(rec)

        doc_id = generate_doc_id(item)
        doc_ref = db.collection("hdb").document(doc_id)

        if doc_ref.get().exists:
            print(f"Skipped: {doc_id} already in Firestore.")
            continue

        full_address = f"{rec['block']} {rec['street_name']}"
        lat, lon, postal = get_lat_lon_from_onemap(full_address)
        if not lat or not lon:
            print(f"⚠️  Skipping {doc_id} due to missing lat/lon.")
            continue

        enriched = {
            "TOWN": rec["town"],
            "MONTH": rec["month"],
            "FLAT_TYPE": rec["flat_type"],
            "BLOCK": rec["block"],
            "STREET_NAME": rec["street_name"],
            "RESALE_PRICE": float(rec["resale_price"]),
            "LATITUDE": lat,
            "LONGITUDE": lon,
            "POSTAL": postal,
            "FLOOR_AREA_SQM": float(rec["floor_area_sqm"]),
            "REMAINING_LEASE": rec["remaining_lease"],
            "geopoint": firestore.GeoPoint(lat, lon),
            "geohash": pgh.encode(lat, lon, precision=8)
        }

        doc_ref.set(enriched)
        print(f"Uploaded: {doc_id}")
