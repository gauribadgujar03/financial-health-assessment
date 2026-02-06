def calculate_financial_health(data):
    revenue = data["revenue"]
    expenses = data["expenses"]
    assets = data["assets"]
    liabilities = data["liabilities"]

    profit_margin = (revenue - expenses) / revenue
    debt_ratio = liabilities / assets
    cash_score = data["cash_flow"] / expenses

    risk_score = round((1 - profit_margin + debt_ratio) * 50, 2)

    return {
        "profit_margin": round(profit_margin * 100, 2),
        "debt_ratio": round(debt_ratio, 2),
        "risk_score": risk_score
    }
