# Algerian Forest Fire Index

A Flask application built around the upgraded Linear Regression model.

## Model feature order

The application sends the inputs in the exact order used by the saved scaler:

Temperature, RH, Ws, Rain, FFMC, DMC, ISI, Classes, Region

The model was trained after dropping `day`, `month`, and `year`.

## Run locally

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Open `http://127.0.0.1:5000`.

## Deployment

The project includes a Gunicorn Procfile and can be prepared for AWS deployment.
