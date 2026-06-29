from database.db import get_db_connection


def create_user(display_name, username, email, password_hash):
    """
    Saves a new user into the database.
    """

    connection = get_db_connection()

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO users
        (display_name, username, email, password_hash)

        VALUES (?, ?, ?, ?)
    """, (display_name, username, email, password_hash))

    connection.commit()

    connection.close()


def get_user_by_email(email):
    """
    Returns a user using their email.
    """

    connection = get_db_connection()

    cursor = connection.cursor()

    cursor.execute("""
        SELECT *
        FROM users
        WHERE email = ?
    """, (email,))

    user = cursor.fetchone()

    connection.close()

    return user


def get_user_by_username(username):
    """
    Returns a user using their username.
    """

    connection = get_db_connection()

    cursor = connection.cursor()

    cursor.execute("""
        SELECT *
        FROM users
        WHERE username = ?
    """, (username,))

    user = cursor.fetchone()

    connection.close()

    return user