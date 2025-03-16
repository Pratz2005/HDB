import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables
load_dotenv()

# Get MongoDB URI from .env.local
MONGODB_URI = os.getenv("MONGODB_URI")

# Test connection
try:
    client = MongoClient(MONGODB_URI)
    db = client.admin  # Test connection with the admin database
    print("✅ Connected to MongoDB successfully!")
    #print("Databases:", client.list_database_names())  # List databases
except Exception as e:
    print("❌ MongoDB connection failed:", e)