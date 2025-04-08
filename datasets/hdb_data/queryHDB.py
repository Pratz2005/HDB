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

# Instead of storing a flag, store the parsed coordinates
unique_addresses = {}
output_data = []

with open('ResaleflatpricesbasedonregistrationdatefromJan2017onwards.csv', mode='r') as file:
    csv_reader = csv.reader(file)
    for idx, row in enumerate(csv_reader, start=1):
        curr_adr = row[3] + " " + row[4]
        if curr_adr in unique_addresses:
            lat, lon, postal = unique_addresses[curr_adr]
            print(f"Row {idx}: DUPLICATE!!!! using stored coordinates for {curr_adr}")
        else:
            try:
                lat, lon, postal = get_lat_lon_from_onemap(curr_adr)
            except Exception as e:
                print("Error processing address", curr_adr)
                continue
            unique_addresses[curr_adr] = (lat, lon, postal)
            print(f"Row {idx}: {curr_adr} added")
            
        record = {
            "TOWN": row[1],
            "MONTH": row[0],
            "FLAT_TYPE": row[2],
            "BLOCK": row[3],
            "STREET_NAME": row[4],
            "RESALE_PRICE": float(row[10]),
            "LATITUDE": lat,
            "LONGITUDE": lon,
            "POSTAL": postal,
            "FLOOR_AREA_SQM": float(row[6]),
            "REMAINING_LEASE": row[9]
        }
        output_data.append(record)

with open('hdb.json', mode='w') as jsonfile:
    json.dump(output_data, jsonfile, indent=4)