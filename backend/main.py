from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from utils.excel_parser import parse_excel
from utils.emailer import send_bulk_email
from typing import List
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# ✅ Allow CORS (for frontend like Next.js to access this API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to ["http://localhost:3000"] for specific frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Define schema for internship criteria
class InternshipCriteria(BaseModel):
    internship_name: str
    min_cgpa: float
    required_skills: List[str]

# ✅ Notify eligible students
@app.post("/notify")
async def notify_students(internship: InternshipCriteria):
    try:
        # Load student data from Excel
        students = parse_excel("data/students.xlsx")

        eligible_emails = []

        for student in students:
            try:
                student_cgpa = float(student.get("cgpa", 0))
            except (ValueError, TypeError):
                student_cgpa = 0

            if student_cgpa >= internship.min_cgpa:
                student_skills = [
                    skill.strip().lower()
                    for skill in str(student.get("skills", "")).split(",")
                ]
                required_skills_lower = [skill.lower() for skill in internship.required_skills]

                if all(skill in student_skills for skill in required_skills_lower):
                    if student.get("email"):
                        eligible_emails.append(student["email"])

        # Send bulk email
        if eligible_emails:
            subject = f"Opportunity: {internship.internship_name}"
            body = (
                f"Dear Student,\n\n"
                f"You are eligible for the internship: {internship.internship_name}.\n"
                f"Please check your dashboard for more details.\n\n"
                f"Best,\nPlacement Cell"
            )
            await send_bulk_email(subject=subject, body=body, recipients=eligible_emails)

        return {"message": f"Notified {len(eligible_emails)} eligible students."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
