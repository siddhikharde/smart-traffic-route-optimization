
from fastapi import FastAPI
from pydantic import BaseModel, Field
from .predict import predict_congestion

app = FastAPI(
    title="Smart Traffic Prediction API",
    description="ML API for traffic congestion prediction",
    version="1.0"
)

class TrafficInput(BaseModel):
    road_id: str
    hour: int = Field(..., ge=0, le=23)
    day: str = Field(
        ...,
        pattern="^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$"
    )

@app.get("/")
def home():
    return {"message": "Smart Traffic Prediction API is running"}

@app.post("/predict")
def predict(data: TrafficInput):
    result = predict_congestion(
        data.road_id,
        data.hour,
        data.day
    )

    return {
        "road_id": data.road_id,
        "hour": data.hour,
        "day": data.day,
        "predicted_congestion": result
    }
