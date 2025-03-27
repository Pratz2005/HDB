import json
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials, firestore
import pygeohash as pgh

# Initialize Firebase Admin SDK with your credentials
cred = credentials.Certificate(".json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def fix_postal_code(code):
    # Ensure code is a string, trim spaces and check its length
    code = str(code).strip()
    if len(code) == 5:
        return "0" + code
    return code

# Load original geojson file
file_path = "CommunityClubs.geojson"
with open(file_path, "r", encoding="utf-8") as file:
    geojson_data = json.load(file)

converted_features = []

# Iterate through each feature
for feature in geojson_data["features"]:
    # Get and parse the Description HTML to extract the table fields
    description_html = feature["properties"].get("Description", "")
    soup = BeautifulSoup(description_html, "html.parser")
    data = {}
    for tr in soup.find_all("tr"):
        th = tr.find("th")
        td = tr.find("td")
        if th and td:
            key = th.text.strip()
            value = td.text.strip()
            data[key] = value

    # Get geometry coordinates (GeoJSON is [longitude, latitude, ...])
    geom = feature.get("geometry", {})
    coords = geom.get("coordinates", [])
    if len(coords) >= 2:
        lon, lat = coords[0], coords[1]
    else:
        lon, lat = None, None

    # Create Firestore GeoPoint and compute a geohash if valid
    geo_point = None
    geohash_val = None
    if lat is not None and lon is not None:
        geo_point = firestore.GeoPoint(lat, lon)
        # Compute geohash with a precision of 8 characters
        geohash_val = pgh.encode(lat, lon, precision=8)

    doc_data = {
        "NAME": data.get("NAME", ""),
        "POSTAL_CD": fix_postal_code(data.get("ADDRESSPOSTALCODE", "")),
        "geopoint": geo_point,
        "geohash": geohash_val
    }
    converted_features.append(doc_data)

# Write each document to a Firestore collection called "community_clubs"
collection_ref = db.collection("community_clubs")
for doc in converted_features:
    # Use POSTAL_CD as document id or let Firestore generate one
    collection_ref.document(doc["POSTAL_CD"]).set(doc)

print("Documents written to Firestore.")