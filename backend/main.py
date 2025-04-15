"""
import uvicorn
import os

if __name__ == "__main__":
    # Get the port from the environment variable, default to 8080 if not set
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("app.api:app", host="0.0.0.0", port=port)
    """