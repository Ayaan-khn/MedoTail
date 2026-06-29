from flask import Blueprint, render_template, request, redirect, url_for

from auth.models import (
    create_user,
    get_user_by_email,
    get_user_by_username
)

from auth.utils import (
    hash_password,
    verify_password
)

# Create the authentication blueprint
auth_bp = Blueprint("auth", __name__)


# --------------------
# Login
# --------------------

@auth_bp.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        username_or_email = request.form["username_or_email"]
        password = request.form["password"]

        # Find user using email first
        user = get_user_by_email(username_or_email)

        # If not found, try username
        if user is None:
            user = get_user_by_username(username_or_email)

        # User doesn't exist
        if user is None:
            return "Invalid username/email."

        # Wrong password
        if not verify_password(password, user["password_hash"]):
            return "Incorrect password."

        # Login successful
        return redirect(url_for("chat"))

    return render_template("login.html")


# --------------------
# Signup
# --------------------

@auth_bp.route("/signup", methods=["GET", "POST"])
def signup():

    if request.method == "POST":

        display_name = request.form["display_name"]
        username = request.form["username"]
        email = request.form["email"]
        password = request.form["password"]

        # Username already exists
        if get_user_by_username(username):
            return "Username already exists."

        # Email already exists
        if get_user_by_email(email):
            return "Email already exists."

        # Hash password
        password_hash = hash_password(password)

        # Save user
        create_user(
            display_name,
            username,
            email,
            password_hash
        )

        return redirect(url_for("index"))

    return render_template("signup.html")