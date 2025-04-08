import json
import firebase_admin
from firebase_admin import credentials, firestore
import pygeohash as pgh

cred = credentials.Certificate(".json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load original JSON file
file_path = "mrt.json"
with open(file_path, "r", encoding="utf-8") as file:
    json_data = json.load(file)

# Process and save only selected fields to Firestore
collection_ref = db.collection("mrt_stations")
for item in json_data:
    postal = item.get("POSTAL")
    if postal == "NIL":
        continue  # Skip invalid postal codes

    try:
        upload_item = {
            "NAME": item.get("BUILDING"),
            "POSTAL_CD": postal,
            "X_COORDINATE": item.get("X"),
            "Y_COORDINATE": item.get("Y"),
            "geopoint": firestore.GeoPoint(float(item["LATITUDE"]), float(item["LONGITUDE"])),
            "geohash": pgh.encode(float(item["LATITUDE"]), float(item["LONGITUDE"]), precision=8)
        }

        # Use postal code as the document ID
        doc_ref = collection_ref.document(postal)  # Use 'postal' directly
        doc_ref.set(upload_item)

    except Exception as e:
        print(f"Error processing {postal}: {e}")

print("Upload complete!")
