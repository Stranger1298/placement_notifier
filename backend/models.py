# models.py
from pydantic import BaseModel
from typing import List

class CompanyRequirement(BaseModel):
    internship_name: str
    min_cgpa: float
    required_skills: List[str]
