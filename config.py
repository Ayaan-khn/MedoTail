from os import getenv

from dotenv import load_dotenv

load_dotenv()

import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "change-me")
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")

DATABASE = getenv("DATABASE", "database/medochat.db")
