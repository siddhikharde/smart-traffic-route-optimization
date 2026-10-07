import joblib
from pathlib import Path
import pandas as pd


# Load the trained Bangalore traffic model
MODEL_PATH = Path(__file__).parent.parent / "models" / "bangalore_traffic_final_model.pkl"

model = joblib.load(MODEL_PATH)
print("Model type:", type(model))
print("Model features:", model.feature_names_in_)
print("Bangalore traffic model loaded successfully!")


# Function for traffic prediction
def predict_traffic(input_data):
    print("API Input:", input_data)
    input_df = pd.DataFrame([input_data])

    prediction = model.predict(input_df)[0]
    print("Data sent to model:")
    print(input_df)

    if prediction < 25:
        category = "Very Low"
    elif prediction < 50:
        category = "Low"
    elif prediction < 75:
        category = "Moderate"
    elif prediction < 90:
        category = "High"
    else:
        category = "Very High"

    return prediction, category


# Test input
# test_input = {
#     "Area Name": "Indiranagar",
#     "Road/Intersection Name": "CMH Road",
#     "Traffic Volume": 30000,
#     "Average Speed": 35,
#     "Incident Reports": 1,
#     "Public Transport Usage": 45,
#     "Traffic Signal Compliance": 80,
#     "Parking Usage": 75,
#     "Pedestrian and Cyclist Count": 100,
#     "Weather Conditions": "Clear",
#     "Roadwork and Construction Activity": "No",
#     "Year": 2024,
#     "Month": 8,
#     "Day": 9,
#     "Day_of_Week": "Friday"
# }


# Get prediction
# result, category = predict_traffic(test_input)


# # Display result
# print("Predicted Congestion:", result)
# print("Congestion Level:", category)