# 1. Base image
FROM python:3.11-slim

# 2. Prevent Python buffering (so logs show up immediately)
ENV PYTHONUNBUFFERED=1

# 3. Set working dir
WORKDIR /app

# 4. Copy & install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of your code
COPY . .

# 6. Expose the port your Django dev server (or Gunicorn) will listen on
EXPOSE 5000

# 7. Default command: run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:5000"]
