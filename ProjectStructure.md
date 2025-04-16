# 📁 SmartHDB Finder – Project Structure

## 🧠 Overview
This structure separates responsibilities clearly across backend logic, frontend views, utilities, and model classes for clean modular design.

---

## 📂 Root Directory
```
smart-hdb-finder/
├── main.py                    # API entry point or script runner
├── firebase-key.json          # Firebase service credentials
├── package.json               # JavaScript dependencies
├── requirements.txt           # Python dependencies
├── .env, .gitignore           # Environment config and Git settings
```

---

## 📂 controller/
Handles backend logic and orchestration.

```
controller/
├── insights/
│   └── predict.py                     # Handles price prediction logic
├── search/
│   ├── mainFilter.py                 # Core HDB filtering logic
│   └── optionalFilters.py            # Extra filters: MRT, amenities
├── utils/
│   ├── firebaseClient.py            # Firebase interaction layer
│   ├── OneMap_token_auth.py         # OneMap token handling
│   └── sync_firestore.py            # Syncs data to Firestore
└── fetchRecentlyViewed.py           # Retrieves recent searches
```

---

## 📂 model/
Contains all data representations and ML model configs.

```
model/
├── amenities/
│   └── CHASClinic.py, MRTStation.py, Supermarket.py, ...  # Amenity data models
├── hdb/
│   ├── HDBRecord.py                # HDB listing data class
│   └── HDBSearchParams.py         # Filtering parameter structure
└── predictionModel/
    ├── model_pipeline.pkl         # Serialized ML pipeline
    ├── PredictionParams.py        # ML config
    └── ResaleData.csv             # Resale data for predictions
```

---

## 📂 public/
Static assets used by the frontend.

```
public/
├── *.jpeg, *.png, *.ico           # UI graphics and images
```

---

## 📂 src/
Frontend logic and layout (Next.js app).

```
src/
├── app/
│   ├── about-us/, auth/, dashboard/, insights/  # Route folders
│   └── page.js files within for page-specific logic
├── utils/
│   └── authUtil.js, firebaseClient.js           # Utility functions
├── components/
│   └── Reusable UI elements (icons, Header, Footer, Map, etc.)
├── layout.js, globals.css                       # Global styles and layout
```
