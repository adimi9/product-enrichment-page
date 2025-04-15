# Use official Python base image
FROM python:3.10-slim

# Set work directory
WORKDIR /app

# Copy the requirements.txt and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the app code
COPY . .

# Start the app
CMD ["uvicorn", "app.api:app", "--host", "0.0.0.0", "--port", "8080"]
