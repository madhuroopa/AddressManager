FROM python:3.8-slim-buster

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY address_Manager_app/ .

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "address_Manager_app.app:create_app()"]
