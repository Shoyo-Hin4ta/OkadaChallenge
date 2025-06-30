from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

# Load .env from root
load_dotenv(dotenv_path=Path(__file__).resolve().parents[1] / ".env")

MONGO_URI = os.getenv("MONGODB_URI")

client = AsyncIOMotorClient(MONGO_URI)
db = client["frontend_db"]