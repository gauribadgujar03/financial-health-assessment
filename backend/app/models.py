from sqlalchemy import Column, Integer, String, Float
from .database import Base

class FinancialRecord(Base):
    __tablename__ = "financials"

    id = Column(Integer, primary_key=True, index=True)
    revenue = Column(Float)
    expenses = Column(Float)
    cash_flow = Column(Float)
    liabilities = Column(Float)
    assets = Column(Float)
