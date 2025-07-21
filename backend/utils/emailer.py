# utils/emailer.py
import os
from dotenv import load_dotenv
from email.message import EmailMessage
import aiosmtplib

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
EMAIL_SENDER = os.getenv("EMAIL_SENDER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

async def send_bulk_email(subject: str, body: str, recipients: list[str]):
    if not recipients:
        return

    message = EmailMessage()
    message["From"] = EMAIL_SENDER
    message["To"] = ", ".join(recipients)
    message["Subject"] = subject
    message.set_content(body)

    await aiosmtplib.send(
        message,
        hostname=SMTP_HOST,
        port=SMTP_PORT,
        start_tls=True,
        username=EMAIL_SENDER,
        password=EMAIL_PASSWORD,
    )
