# 🎓 Placement Notifier System

A modern, full-stack web application for automating placement notifications to eligible students based on company requirements. The system streamlines the recruitment process by allowing administrators to upload student data and automatically notify qualified candidates via email.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?style=flat-square&logo=fastapi)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.11+-yellow?style=flat-square&logo=python)

## ✨ Features

- 📊 **Student Data Management**: Upload and parse Excel files containing student information
- 🎯 **Smart Filtering**: Automatically filter students based on CGPA and required skills
- 📧 **Bulk Email Notifications**: Send personalized emails to eligible students
- 🎨 **Modern UI**: Clean, responsive interface built with Next.js and shadcn/ui
- ⚡ **Real-time Feedback**: Instant status updates for uploads and notifications
- 🔒 **Type Safety**: Full TypeScript support for robust development
- 🚀 **High Performance**: Fast API responses with optimized data processing

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for beautiful, accessible components
- **React Hooks** for state management

### Backend
- **FastAPI** for high-performance REST API
- **Python 3.11+** with async/await support
- **Pandas** for efficient Excel data processing
- **Pydantic** for data validation and serialization
- **SMTP** for reliable email delivery

## 📁 Project Structure

```
placement_system/
├── frontend/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css     # Global styles
│   │   │   ├── layout.tsx      # Root layout
│   │   │   └── page.tsx        # Main page component
│   │   ├── components/ui/      # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── label.tsx
│   │   └── lib/
│   │       └── utils.ts        # Utility functions
│   ├── components.json         # shadcn/ui configuration
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── next.config.ts
├── backend/                     # FastAPI backend application
│   ├── data/                   # Student data storage
│   ├── templates/              # Email HTML templates
│   ├── utils/                  # Backend utilities
│   │   ├── excel_parser.py     # Excel file processing
│   │   └── emailer.py          # Email functionality
│   ├── main.py                 # FastAPI application entry point
│   ├── models.py               # Pydantic data models
│   └── requirements.txt        # Python dependencies
├── venv/                       # Python virtual environment
├── README.md                   # Project documentation
└── .gitignore                  # Git ignore rules
```

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** 18+ and npm/yarn
- **Python** 3.11+
- **Git** for version control
- **Gmail account** or SMTP server for email notifications

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/placement_system.git
cd placement_system
```

### 2. Backend Setup

```bash
# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Environment Configuration**: Create a `.env` file in the root directory:

```env
# CORS Configuration
CORS_ORIGINS=http://localhost:3000

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_SENDER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Optional: Database Configuration
DATABASE_URL=sqlite:///./placement.db
```

**Start the FastAPI server**:
```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

🌐 API Documentation: `http://127.0.0.1:8000/docs`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

🌐 Application: `http://localhost:3000`

## 📊 Usage Guide

### Step 1: Prepare Student Data

Create an Excel file (.xlsx or .xls) with the following columns:

| Column | Description | Example |
|--------|-------------|---------|
| `name` | Student full name | "John Doe" |
| `email` | Student email address | "john.doe@university.edu" |
| `cgpa` | Cumulative GPA | 8.5 |
| `skills` | Comma-separated skills | "JavaScript, React, Node.js" |

### Step 2: Upload Student Data

1. Navigate to the application homepage
2. Click **"Select Excel File"** and choose your prepared file
3. Click **"Upload Students Data"** to process and validate the data
4. Monitor the success message with total student count

### Step 3: Create Placement Notifications

1. Fill in the internship details:
   - **Internship Name**: "Software Development Internship"
   - **Minimum CGPA**: 7.5
   - **Required Skills**: "JavaScript, React, Python" (comma-separated)
2. Click **"Notify Eligible Students"**
3. View the notification results

## 🔧 API Documentation

### Endpoints

#### `POST /upload-students`
Upload and process student Excel file.

**Request**: Multipart form data with Excel file
**Response**:
```json
{
  "message": "Students uploaded successfully",
  "total_students": 150,
  "valid_students": 145
}
```

#### `POST /notify`
Send notifications to eligible students.

**Request Body**:
```json
{
  "internship_name": "Software Development Internship",
  "min_cgpa": 7.5,
  "required_skills": ["JavaScript", "React", "Node.js"]
}
```

**Response**:
```json
{
  "message": "Notifications sent to 23 eligible students",
  "eligible_count": 23,
  "total_students": 150
}
```

## 📧 Email Configuration

### Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** in your Google Account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Use App Password** in the `EMAIL_PASSWORD` environment variable

### Other SMTP Providers

The system supports any SMTP provider. Update the environment variables accordingly:

```env
SMTP_HOST=smtp.outlook.com     # For Outlook
SMTP_PORT=587
EMAIL_SENDER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

## 🎨 Customization

### Adding New UI Components

```bash
cd frontend
npx shadcn@latest add [component-name]
```

Available components: `alert`, `badge`, `dialog`, `dropdown-menu`, `select`, `textarea`, `toast`, etc.

### Email Template Customization

Edit `backend/templates/notification_email.html` to customize the email appearance:

```html
<!DOCTYPE html>
<html>
<body>
  <h2>🎉 New Internship Opportunity</h2>
  <p>Dear {{student_name}},</p>
  <p>We're excited to inform you about: <strong>{{internship_name}}</strong></p>
  <!-- Customize as needed -->
</body>
</html>
```

## 🚀 Production Deployment

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build
npm start
```

### Backend (Railway/Heroku/DigitalOcean)

```bash
# Using gunicorn for production
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Docker Deployment

```dockerfile
# Dockerfile example
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🔍 Troubleshooting

### Common Issues

**1. Hydration Error (Frontend)**
- Ensure `useEffect` and `mounted` state are properly implemented
- Check for server/client rendering mismatches

**2. CORS Error**
- Verify `CORS_ORIGINS` in environment variables
- Ensure frontend URL matches the CORS configuration

**3. Email Sending Issues**
- Verify SMTP credentials and app password
- Check firewall/network restrictions
- Ensure "Less secure app access" is enabled (if applicable)

**4. Excel Upload Errors**
- Verify column names match exactly: `name`, `email`, `cgpa`, `skills`
- Check for special characters or formatting issues
- Ensure CGPA values are numeric

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript/Python type annotations
- Write descriptive commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Contact

- 📧 **Email**: support@placementsystem.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/placement_system/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/placement_system/discussions)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [FastAPI](https://fastapi.tiangolo.com/) for the high-performance API framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

---

**Made with ❤️ for educational institutions and their students**