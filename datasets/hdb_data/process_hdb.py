import json
import firebase_admin
from firebase_admin import credentials, firestore
import pygeohash as pgh

cred = credentials.Certificate("cred.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load original JSON file
file_path = "hdb.json"
with open(file_path, "r", encoding="utf-8") as file:
    json_data = json.load(file)

# Process and save only selected fields to Firestore
collection_ref = db.collection("hdb")

for item in json_data:
    try:
        latitude = float(item["LATITUDE"]) if "LATITUDE" in item else None
        longitude = float(item["LONGITUDE"]) if "LONGITUDE" in item else None

        geopoint = firestore.GeoPoint(latitude, longitude) if latitude is not None and longitude is not None else None
        geohash = pgh.encode(latitude, longitude, precision=8) if latitude is not None and longitude is not None else None

        upload_item = {}
        upload_item.update(item)
        upload_item["geopoint"] = geopoint
        upload_item["geohash"] = geohash
        
        collection_ref.add(upload_item)
        print("item uploaded")
    except Exception as e:
        print(f"Error processing item: {item}\nError: {e}")

print("Upload complete!")