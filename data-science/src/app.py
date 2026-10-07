from fastapi import FastAPI
from pydantic import BaseModel

from .predict import predict_traffic


app = FastAPI(title="Bangalore Traffic Prediction API")


class TrafficInput(BaseModel):
    area_name: str
    road_intersection_name: str
    traffic_volume: float
    average_speed: float
    incident_reports: float
    public_transport_usage: float
    traffic_signal_compliance: float
    parking_usage: float
    pedestrian_and_cyclist_count: float
    weather_conditions: str
    roadwork_and_construction_activity: str
    year: int
    month: int
    day: int
    day_of_week: str


@app.get("/")
def home():
    return {"message": "Bangalore Traffic Prediction API is running"}


@app.post("/predict")
def predict(data: TrafficInput):

    input_data = {
        "Area Name": data.area_name,
        "Road/Intersection Name": data.road_intersection_name,
        "Traffic Volume": data.traffic_volume,
        "Average Speed": data.average_speed,
        "Incident Reports": data.incident_reports,
        "Public Transport Usage": data.public_transport_usage,
        "Traffic Signal Compliance": data.traffic_signal_compliance,
        "Parking Usage": data.parking_usage,
        "Pedestrian and Cyclist Count": data.pedestrian_and_cyclist_count,
        "Weather Conditions": data.weather_conditions,
        "Roadwork and Construction Activity": data.roadwork_and_construction_activity,
        "Year": data.year,
        "Month": data.month,
        "Day": data.day,
        "Day_of_Week": data.day_of_week
    }

    prediction, category = predict_traffic(input_data)

    return {
        "predicted_congestion": prediction,
        "congestion_level": category
    }