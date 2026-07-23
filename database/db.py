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
    Creates all required database tables if they don't already exist.
    """

    connection = get_db_connection()

    cursor = connection.cursor()

    # ==========================
    # Users Table
    # ==========================

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

    # ==========================
    # Conversations Table
    # ==========================

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS conversations (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            user_id INTEGER NOT NULL,

            title TEXT DEFAULT 'New Chat',

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (user_id) REFERENCES users(id)

        )
    """)

    connection.commit()

    connection.close()

def create_conversation(user_id):
    """
    Creates a new conversation for a user.
    """

    connection = get_db_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO conversations (user_id)
        VALUES (?)
        """,
        (user_id,)
    )

    conversation_id = cursor.lastrowid

    connection.commit()

    connection.close()

    return conversation_id


def get_conversations(user_id):
    """
    Returns all conversations belonging to a user.
    """

    connection = get_db_connection()

    conversations = connection.execute(
        """
        SELECT *
        FROM conversations
        WHERE user_id = ?
        ORDER BY created_at DESC
        """,
        (user_id,)
    ).fetchall()

    connection.close()

    return conversations