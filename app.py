from flask import Flask, render_template, request, jsonify, session

from auth.routes import auth_bp
from database.db import (
    init_db,
    create_conversation
)
from config import SECRET_KEY
from ai.deepseek import ask_deepseek

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
# API Route
# --------------------

@app.route("/api/chat", methods=["POST"])
def api_chat():

    data = request.get_json()

    message = data.get("message", "")

    model = data.get("model", "deepseek-chat")

    reply = ask_deepseek(message, model)

    return jsonify({
        "reply": reply
    })


# --------------------
# NEW CHAT API
# --------------------

@app.route("/api/new_chat", methods=["POST"])
def new_chat():

    # Check if user is logged in
    if "user_id" not in session:
        return jsonify({
            "error": "User not logged in"
        }), 401

    conversation_id = create_conversation(session["user_id"])

    return jsonify({
        "conversation_id": conversation_id
    })


# --------------------
# Start Application
# --------------------

if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=False)