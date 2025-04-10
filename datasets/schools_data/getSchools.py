import csv
import requests
import os
import json

def get_lat_lon_from_onemap(address: str) -> tuple:
    """
    Query OneMap API to get latitude and longitude for the given address.
    """
    url = f"https://www.onemap.gov.sg/api/common/elastic/search?searchVal={address}&returnGeom=Y&getAddrDetails=Y&pageNum=1"
    bearer = os.getenv('ACCESS_TOKEN')
    headers = {"Authorization": f"Bearer {bearer}"}
    
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print("OneMap API call failed with status code:", response.status_code)
    
    data = response.json()
    results = data.get("results")
    if not results:
        print("No results returned from OneMap API for address:", address)
    
    # Assuming the first result is the best match
    result = results[0]
    try:
        latitude = float(result.get("LATITUDE"))
        longitude = float(result.get("LONGITUDE"))
        postalCode = int(result.get("POSTAL"))
    except (TypeError, ValueError):
        print("Failed to parse latitude or longitude from OneMap API result:", result)
    
    return latitude, longitude, postalCode


output_data = []

with open('jc_schools_2025.txt', mode='r') as file:
    # Read file line by line and split based on whitespace (adjust the delimiter if needed)
    for idx, line in enumerate(file, start=1):
        lat, lon, postal = get_lat_lon_from_onemap(line.strip())
        record = {
            "NAME": line.strip(),
            "POSTAL_CD": postal,
            "LATITUDE": lat,
            "LONGITUDE": lon
        }
        output_data.append(record)

with open('jc.json', mode='w') as jsonfile:
    json.dump(output_data, jsonfile, indent=4)
    
    