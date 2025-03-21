import requests
import time
import os
from dotenv import load_dotenv

# Load environment variables from .env file located in the root folder
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env')
load_dotenv(env_path) 

# Read the expiry timestamp and access token from .env
access_token = os.getenv('ACCESS_TOKEN')
expiry_timestamp = int(os.getenv('TOKEN_EXPIRY_TIMESTAMP', 0))

# Function to authenticate and get a new token
def authenticate_and_get_token():
    url =  os.getenv('ONEMAP_AUTH_URL')
    payload = {
        "email": os.getenv('ONEMAP_AUTH_EMAIL'),
        "password": os.getenv('ONEMAP_AUTH_PASSWORD')
    }
    response = requests.post(url, json=payload)
    print(response.json())
    
    data = response.json()
    global access_token, expiry_timestamp
    access_token = data["access_token"]
    expiry_timestamp = data["expiry_timestamp"]
        
    # Save the new token and expiry to the .env file
    with open(env_path, "a") as f:
        f.write(f"\nACCESS_TOKEN={access_token}\n")
        f.write(f"TOKEN_EXPIRY_TIMESTAMP={expiry_timestamp}\n")
        
    print("Token received.")
    
# Function to check if token is expired
def is_token_expired():
    # If there's no token, it means the user is not authenticated
    if not access_token:
        return True
    
    current_timestamp = int(time.time())  # Get the current timestamp in UNIX format
    if current_timestamp >= expiry_timestamp:
        return True
    return False

# Function to renew the token if expired
def renew_token_if_expired():
    if is_token_expired():
        print("Token expired or not available. Renewing token...")
        authenticate_and_get_token()
    else:
        print("Token is still valid.")

# Function to get the current valid token (with auto-renew)
def get_valid_token():
    renew_token_if_expired()  # Ensure the token is valid before returning
    return access_token

token = get_valid_token()