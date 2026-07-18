# MedoChat

MedoChat is a Flask-based messaging platform project. It currently includes a responsive landing page, user signup/login flow, SQLite storage, static policy documents, and a Docker setup for local container builds.

## Current Features

- Flask app with Jinja2 templates
- SQLite database with a `users` table
- Signup and login routes
- Werkzeug password hashing
- Responsive landing, auth, and about pages
- Browser-based weather preview using geolocation
- Static PDFs for policies and guidelines
- Dockerfile and Docker Compose support

## Planned Features

- Real chat interface
- Flask-Login session management
- User profiles
- Friends system
- Group chats
- AI assistant
- File sharing
- Voice and video calling
- Production deployment

## Tech Stack

- Python
- Flask
- SQLite
- HTML
- CSS
- JavaScript
- Docker

## Project Structure

```text
Medo-Chat/
├── app.py
├── config.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── auth/
│   ├── __init__.py
│   ├── models.py
│   ├── routes.py
│   └── utils.py
├── database/
│   ├── __init__.py
│   ├── db.py
│   └── medochat.db
├── static/
│   ├── css/
│   ├── images/
│   ├── js/
│   └── pdfs/
└── templates/
    ├── about.html
    ├── chat.html
    ├── login.html
    ├── main.html
    └── signup.html
```

## Local Setup

Create and activate a virtual environment:

```bash
python -m venv .venv
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the application:

```bash
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

## Docker

Build and run with Docker Compose:

```bash
docker compose up --build
```

Open:

```text
http://127.0.0.1:5000
```

## Environment Variables

Create a local `.env` file when needed:

```env
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=replace-this-with-a-long-random-secret
DATABASE=database/medochat.db
```

## Developer

Created by Mike.
