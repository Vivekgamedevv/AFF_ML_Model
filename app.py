from flask import Flask, render_template, request, jsonify
from pathlib import Path
import pickle
import numpy as np

app = Flask(__name__)
BASE_DIR = Path(__file__).resolve().parent

with open(BASE_DIR / "models" / "lin_model.pkl", "rb") as f:
    model = pickle.load(f)

with open(BASE_DIR / "models" / "scalar.pkl", "rb") as f:
    scaler = pickle.load(f)

FEATURES = [
    "Temperature", "RH", "Ws", "Rain",
    "FFMC", "DMC", "ISI", "Classes", "Region"
]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(silent=True) or request.form.to_dict()

        missing = [f for f in FEATURES if f not in data or str(data[f]).strip() == ""]
        if missing:
            return jsonify({
                "success": False,
                "error": "Missing: " + ", ".join(missing)
            }), 400

        values = np.array([[float(data[f]) for f in FEATURES]], dtype=float)
        scaled = scaler.transform(values)
        prediction = float(model.predict(scaled)[0])

        return jsonify({
            "success": True,
            "prediction": round(prediction, 2)
        })

    except Exception as exc:
        return jsonify({"success": False, "error": str(exc)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
