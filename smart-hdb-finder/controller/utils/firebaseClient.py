import os
import firebase_admin
from firebase_admin import credentials, firestore

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
cred_file = os.path.join(BASE_DIR, "firebase-key.json")
cred = credentials.Certificate(cred_file)
firebase_admin.initialize_app(cred)
db = firestore.client()