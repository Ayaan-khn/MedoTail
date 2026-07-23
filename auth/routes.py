from flask import Blueprint, render_template, request, redirect, url_for, session

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

        username_or_email = request.form["username_or_email"].strip()
        password = request.form["password"]

        # Try finding the user by email
        user = get_user_by_email(username_or_email)

        # If not found, try username
        if user is None:
            user = get_user_by_username(username_or_email)

        # Invalid username/email
        if user is None:
            return render_template(
                "login.html",
                error="Invalid username/email or password.",
                username_or_email=username_or_email
            )

        # Wrong password
        if not verify_password(password, user["password_hash"]):
            return render_template(
                "login.html",
                error="Invalid username/email or password.",
                username_or_email=username_or_email
            )

        # --------------------
        # Login Successful
        # --------------------
        session["user_id"] = user["id"]
        session["display_name"] = user["display_name"]
        session["username"] = user["username"]

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
            return render_template(
                "signup.html",
                error="Username already exists."
            )

        # Email already exists
        if get_user_by_email(email):
            return render_template(
                "signup.html",
                error="Email already exists."
            )

        # Hash password
        password_hash = hash_password(password)

        # Save user
        create_user(
            display_name,
            username,
            email,
            password_hash
        )

        return redirect(url_for("auth.login"))

    return render_template("signup.html")


# --------------------
# Logout
# --------------------
@auth_bp.route("/logout")
def logout():

    session.clear()

    return redirect(url_for("index"))