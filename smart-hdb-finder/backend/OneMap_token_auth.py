import requests
import os
from dotenv import load_dotenv

load_dotenv()  # Load variables from .env.local

url = os.getenv('ONEMAP_AUTH_URL')
payload = {
    "email": os.getenv('ONEMAP_AUTH_EMAIL'),
    "password": os.getenv('ONEMAP_AUTH_PASSWORD')
}

response = requests.post(url, json=payload)
print(response.text)