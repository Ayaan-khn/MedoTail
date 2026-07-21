from flask import Flask, render_template
from auth.routes import auth_bp
from database.db import init_db
from config import SECRET_KEY

app = Flask(__name__)

app.config["SECRET_KEY"] = SECRET_KEY

app.register_blueprint(auth_bp, url_prefix="/auth")

# --------------------
# Main Routes
# --------------------

@app.route("/")
def index():
    return render_template("main.html")


@app.route("/signup")
def signup_page():
    return render_template("signup.html")


@app.route("/chat")
def chat():
    return render_template("chat.html")


@app.route("/main")
def main_page():
    return render_template("main.html")


@app.route("/about")
def about():
    return render_template("about.html")


# --------------------
# Start the Application
# --------------------

if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=False)