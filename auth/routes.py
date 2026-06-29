from flask import Blueprint, render_template, request, redirect, url_for

# Create the authentication blueprint
auth_bp = Blueprint("auth", __name__)


# --------------------
# Login
# --------------------

@auth_bp.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":
        # TODO: Verify user from the database
        # TODO: Create a login session

        return redirect(url_for("chat"))

    return render_template("login.html")


# --------------------
# Signup
# --------------------

@auth_bp.route("/signup", methods=["GET", "POST"])
def signup():

    if request.method == "POST":
        # TODO: Save the user into the database

        return redirect(url_for("chat"))

    return render_template("signup.html")