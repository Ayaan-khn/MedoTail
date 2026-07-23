from werkzeug.security import generate_password_hash, check_password_hash


def hash_password(password):
    """
    Converts a plain password into a secure hash.
    """

    return generate_password_hash(password)


def verify_password(password, password_hash):
    """
    Checks if a password matches its hash.
    """

    return check_password_hash(password_hash, password)

