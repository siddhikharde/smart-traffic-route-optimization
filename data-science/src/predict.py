
import pandas as pd
import joblib

# Load trained model and feature information
model = joblib.load("models/traffic_congestion_model.pkl")
model_features = joblib.load("models/traffic_model_features.pkl")


def predict_congestion(road_id, hour, day):

    new_data = pd.DataFrame({
        "road_id": [road_id],
        "hour": [hour],
        "day": [day]
    })

    # Apply the same encoding used during training
    new_data_encoded = pd.get_dummies(
        new_data,
        columns=["road_id", "day"]
    )

    # Match the exact features used by the model
    new_data_encoded = new_data_encoded.reindex(
        columns=model_features,
        fill_value=False
    )

    prediction = model.predict(new_data_encoded)

    return prediction[0]


if __name__ == "__main__":

    result = predict_congestion("R1", 18, "Monday")

    print("Predicted Congestion:", result)
