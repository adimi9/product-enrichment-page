from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

# Load environment variables from a .env file (if available)
load_dotenv()

# Fetch the MongoDB URI and Database name from environment variables
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

# Initialize the AsyncIOMotorClient with the MongoDB URI
client = AsyncIOMotorClient(MONGO_URI)

# Access the MongoDB database specified in the environment variable
db = client[MONGO_DB_NAME]

# Define references to the 'users' and 'products' collections in the MongoDB database
users_collection = db["users"]
products_collection = db["products"]
