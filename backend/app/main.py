from fastapi import FastAPI
from .financial_analysis import calculate_financial_health
from .ai_recommendation import generate_recommendation

app = FastAPI()

@app.post("/analyze")
def analyze_financials(data: dict):
    summary = calculate_financial_health(data)
    recommendations = generate_recommendation(summary)

    return {
        "summary": summary,
        "recommendations": recommendations
    }
