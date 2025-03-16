# Project Setup Guide

## Getting Started

To ensure a smooth development workflow, please follow these steps before coding:

### 1. Navigate into the App Directory
If you have created an additional folder in your file system to store this GitHub project, make sure to `cd` into the app itself before proceeding:
```sh
cd smart-hdb-finder
```
### 2. Navigate into the Frontend Folder
Before installing dependencies, make sure you are inside the frontend folder:

<<<<<<< HEAD
### 2. Install Dependencies
Run the following commands to install all necessary dependencies and match the required versions:
=======
```sh
cd frontend
```
⚠️ Note: npm install must be run in the frontend folder. Running it elsewhere (e.g., the root folder) will result in issues as the necessary package.json resides within the frontend directory.


### 3. Install Dependencies
Run the following command to install all necessary dependencies and match the required versions:
>>>>>>> 696b43a69723415e48d4f4478b9147d61c546b9a
```sh
npm install
```
```sh
npm install firebase
```

This step ensures that everyone is working with the same package versions and avoids compatibility issues.

### 4. Start Coding
Once `npm install` completes successfully, you are good to go! Feel free to start coding 🚀.

### 5. Follow Commit Message Semantics
To maintain a clean and meaningful commit history, please follow commit message semantics.
feat: add a new feature  
fix: fix a bug  
docs: update documentation  
style: format code (no code change)  
refactor: code refactoring  
chore: other changes that don't modify src or test files


# FastAPI Project SetUp

## Windows SetUp

### Navigate to project directory
cd smart-hdb-finder/backend

### Create a virtual environment
python -m venv venv

### Activate the virtual environment
venv\Scripts\activate

### Install required packages
pip install -r requirements.txt

### Start the FastAPI application
uvicorn main:app --reload

## MacOS/Linus SetUp

### Navigate to project directory
cd smart-hdb-finder/backend

### Create a virtual environment
python3 -m venv venv

### Activate the virtual environment
source venv/bin/activate

### Install required packages
pip install -r requirements.txt

### Start the FastAPI application
uvicorn main:app --reload

### Accessing the API
Once the application is running, you can:

Access the API at: http://127.0.0.1:8000
View the interactive API documentation at: http://127.0.0.1:8000/docs
