# 1. Base image
FROM python:3.10-slim

# 2. Thiết lập working directory
WORKDIR /app

# 3. Copy requirements
COPY requirements.txt .

# 4. Cài dependencies hệ thống để build mysqlclient
RUN apt-get update && \
    apt-get install -y build-essential pkg-config default-libmysqlclient-dev && \
    pip install --no-cache-dir -r requirements.txt && \
    apt-get purge -y --auto-remove build-essential pkg-config

# 5. Copy source code vào container
COPY . .

# 6. Thiết lập biến môi trường
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# 7. Collect static files (nếu có)
RUN python manage.py collectstatic --noinput || true

# 8. Expose port
EXPOSE 8000

# 9. Chạy Gunicorn
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
