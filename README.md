# Project Setup Guide

### Project Folder Structure

## Getting Started
To ensure a smooth development workflow, please follow these steps before coding:

### 1. Navigate into the App Directory
If you have created an additional folder in your file system to store this GitHub project, make sure to `cd` into the app itself before proceeding:
```sh
cd smart-hdb-finder
```

### 2. Install Dependencies
Run the following command to install all necessary dependencies and match the required versions:
```sh
npm install
```
This step ensures that everyone is working with the same package versions and avoids compatibility issues.

### 3. Start Coding
Once `npm install` completes successfully, you are good to go! Feel free to start coding 🚀.

### 4. Running the Website (Development Mode)
First, run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Create a virtual environment (if it has not been created)
```sh
python3 -m venv venv
```
### 6. Activate the virtual environment
```sh
# For Windows
venv\Scripts\activate

# For macOS/Linux
source venv/bin/activate
```
### 7. Install required packages
```sh
pip install -r requirements.txt
```
> 💡 **After switching branches or pulling new changes from the repository**, always re-run `pip install -r requirements.txt` to keep your environment in sync.

#### Adding New Dependencies (IMPORTANT) in Virtual Environment
If you install any new packages during development using:
```sh
pip install <package-name>
```
Then, immediately update the requirements file so others can install the same dependencies and avoid "ModuleNotFoundError" issues:
```sh
pip freeze > requirements.txt
```

✅ This ensures that everyone's development environment stays consistent.

---

### Additional Frontend Setup

### OneMap Token Authentication and Auto-Refresh

#### Step 1: Navigate into the Controller Directory
```sh
cd controller
```
#### Step 2: Run Authentication Script
```sh
python OneMap_token_auth.py
```

This step is essential to ensure your API token is valid. If the token is expired, this script will refresh it. Without a valid token, the OneMap API will not work.

---

### Additional Backend Setup

### Start the FastAPI Backend Server
From within the `controller` directory:
```sh
uvicorn controller.main:app --reload
```

- Access the API at: [http://127.0.0.1:8000](http://127.0.0.1:8000)  
- Interactive API Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### Test Database Connection

#### Step 1: Navigate to Model Directory
```sh
cd ../model
```
#### Step 2: Run DB Connection Test Script
```sh
python db_conn.py
```

This ensures the backend is able to connect to the database correctly.

---

### Commit Guidelines
To maintain a clean and meaningful commit history, please follow commit message semantics:
feat: add a new feature  
fix: fix a bug  
docs: update documentation  
style: format code (no code change)  
refactor: code refactoring  
chore: other changes that don't modify src or test files



### Available NPM Scripts
| Command                | Description                              |
|------------------------|------------------------------------------|
| `npm run dev:api`      | Starts FastAPI backend server            |
| `npm run dev:token`    | OneMap API Token Authentication          |
| `npm run dev:db`       | Tests database connection                |
| `npm run dev:frontend` | Runs website and authenticates token     |

### 💡 Important Notes:
- Make sure your **virtual environment is activated** before running `dev:api` or `dev:db`.
- Ensure you are in the correct directory (`smart-hdb-finder`) before running these scripts.
