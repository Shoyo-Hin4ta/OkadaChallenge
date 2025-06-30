# Property Management System

A full-stack property management application built with FastAPI (backend) and React (frontend).

## Features

- 📋 Full CRUD operations for property listings
- 🔍 Filter properties by rent and size ranges
- 📊 Sort properties by creation date, price, or size
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with Tailwind CSS
- ⚡ Real-time updates with React Query

## Prerequisites

Before you begin, ensure you have the following:
- MongoDB connection string (update the `.env` file with your `MONGODB_URL`)

## Project Structure

```
hiring-backend-apis/
├── app/                    # Backend FastAPI application
│   ├── database.py        # MongoDB connection setup
│   ├── main.py           # FastAPI app initialization
│   ├── models.py         # Pydantic models
│   └── routes.py         # API endpoints
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── api/          # API client functions
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Page components
│   │   └── utils/        # Utility functions
│   └── package.json
├── requirements.txt       # Python dependencies
└── seed.py               # Database seeding script
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd hiring-backend-apis
```

### 2. Backend Setup

#### Create Python Virtual Environment

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

#### Install Python Dependencies

```bash
pip install -r requirements.txt
```

#### Configure Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB connection string
# For local MongoDB:
MONGODB_URL=mongodb://localhost:27017/

# For MongoDB Atlas (replace with your connection string):
# MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority

# Database name
DATABASE_NAME=property_management
```

#### Seed the Database (Optional)

#### Start the Backend Server

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### 3. Frontend Setup

#### Navigate to Frontend Directory

```bash
cd frontend
```

#### Install Node Dependencies

```bash
npm install
```

#### Start the Frontend Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

## API Endpoints

### Base URL: `http://localhost:8000/api/properties`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | Get all properties |
| POST   | `/`      | Create a new property |
| PUT    | `/{id}`  | Update a property |
| DELETE | `/{id}`  | Delete a property |

### Property Model

```json
{
  "id": 123456,
  "address": "123 Main St",
  "floor": "2",
  "suite": "201",
  "size": 1500,
  "rent": 2500,
  "annual_rent": 30000,
  "status": "available",
  "broker_name": "John Doe",
  "broker_email": "john@example.com",
  "broker_phone": "1234567890",
  "landlord_name": "Jane Smith",
  "landlord_email": "jane@example.com"
}
```

## Usage Guide

### Adding a Property

1. Click the "Add Property" button in the header
2. Fill in all required fields (marked with *)
3. Annual rent is automatically calculated from monthly rent
4. Click "Save Property" to add the listing

### Filtering Properties

1. Click the "Filters" button in the dashboard
2. Enter min/max values for rent and/or size
3. Click "Apply Filters" to see filtered results
4. Click "Clear" to remove all filters

### Sorting Properties

1. Click the "Sort" dropdown in the dashboard
2. Select from options:
   - Newest/Oldest First
   - Highest/Lowest Price
   - Largest/Smallest Size

### Editing Properties

1. Click the pencil icon on any property card
2. Update the desired fields
3. Click "Save Property" to save changes

### Deleting Properties

1. Click the trash icon on any property card
2. Confirm deletion in the modal dialog

## Development

### Running Tests

```bash
# Frontend tests
cd frontend
npm test
```

### Building for Production

```bash
# Frontend build
cd frontend
npm run build
```