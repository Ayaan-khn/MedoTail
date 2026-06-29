import sqlite3
from pathlib import Path

# Path to the SQLite database file
DB_PATH = Path(__file__).parent / "medochat.db"


def get_db_connection():
    """
    Creates a connection to the SQLite database.
    """

    connection = sqlite3.connect(DB_PATH)

    # Allows accessing columns by name instead of index
    connection.row_factory = sqlite3.Row

    return connection


def init_db():
    """
    Creates the users table if it doesn't already exist.
    """

    connection = get_db_connection()

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            display_name TEXT NOT NULL,

            username TEXT NOT NULL UNIQUE,

            email TEXT NOT NULL UNIQUE,

            password_hash TEXT NOT NULL,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

        )
    """)

    connection.commit()

    connection.close()