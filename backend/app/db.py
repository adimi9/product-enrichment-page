# Import necessary libraries for asynchronous MongoDB client and environment variable management
from motor.motor_asyncio import AsyncIOMotorClient  # AsyncIOMotorClient is an asynchronous MongoDB client
import os  # For environment variable handling
from dotenv import load_dotenv  # dotenv for loading environment variables from a .env file

# Load environment variables from a .env file into the environment
load_dotenv()

# Fetch MongoDB URI and database name from environment variables
# These should be set in the environment or .env file
MONGO_URI = os.getenv("MONGO_URI")  # URI to connect to MongoDB, should include username/password if needed
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")  # Name of the MongoDB database to use

# Create an asynchronous MongoDB client using the connection string (URI)
# AsyncIOMotorClient is specifically for async database operations
client = AsyncIOMotorClient(MONGO_URI)

# Access the specified database from the client
db = client[MONGO_DB_NAME]

# Define the collection of users within the database
# MongoDB collections are akin to tables in relational databases
users_collection = db["users"]  # Accessing the "users" collection from the database

