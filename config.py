from os import getenv

from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = getenv("SECRET_KEY", "change-this-secret-key")
DATABASE = getenv("DATABASE", "database/medochat.db")
