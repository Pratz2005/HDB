# Project Setup Guide

## Getting Started

To ensure a smooth development workflow, please follow these steps before coding:

### 1. Navigate into the App Directory
If you have created an additional folder in your file system to store this GitHub project, make sure to `cd` into the app itself before proceeding:
```sh
cd smart-hdb-finder
```

### 3. Install Dependencies
Run the following command to install all necessary dependencies and match the required versions:
```sh
npm install
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

### Navigate to project directory
```sh
cd smart-hdb-finder/backend
```

### Create a virtual environment
```sh
python3 -m venv venv
```
### Activate the virtual environment
#### For Windows:
```sh
venv\Scripts\activate
```
#### For MacOS:

```sh
source venv/bin/activate
```

### Install required packages
```sh
pip install -r requirements.txt
```

### Start the FastAPI application
```sh
uvicorn main:app --reload
```

### Accessing the API
Once the application is running, you can access the API at: http://127.0.0.1:8000

View the interactive API documentation at: http://127.0.0.1:8000/docs
