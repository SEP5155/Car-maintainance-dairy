import sqlite3
from flask import Flask, render_template, url_for, redirect, request, flash, get_flashed_messages
from flask_sqlalchemy import SQLAlchemy
from flask import session, g
from datetime import timedelta
from werkzeug.exceptions import abort
from werkzeug.security import generate_password_hash, check_password_hash
import logging
from sqlalchemy import text

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config["PERMANENT_SESSION_LIFITIME"] = timedelta(minutes=30)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://sep5155:password@192.168.110.10:3306/maintainance'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

def get_db_connection():
    return db.engine.connect()
    # conn = sqlite3.connect('maintainance.db')
    # conn.row_factory = sqlite3.Row
    # return conn

def get_post(post_id):
    conn = get_db_connection()
    post = conn.execute(text("SELECT * FROM maintentry WHERE id = :id"), {'id': post_id}).fetchone()
    conn.close()
    if post is None:
        abort(404)
    return post

def if_user_has_car(user_id):
    conn = get_db_connection()
    has_car = conn.execute(text("SELECT * FROM cars WHERE user_id = :user_id AND current = :current"), 
                           {'user_id': user_id, 'current': 1}).fetchone()
    conn.close()
    if has_car:
        return True
    else:
        return False


def get_user_by_id(email):
    conn = get_db_connection()
    user = conn.execute(text("SELECT * FROM users WHERE email = :email"), {'email': email}).fetchone()
    conn.close
    return user



# logging.basicConfig(filename='/var/www/html/car_app/myapp.log', level=logging.DEBUG)

@app.before_request
def before_request():
    if "username" in session:
        g.current_user = get_user_by_id(session["username"])
    else:
        g.current_user = None


@app.route("/")
def index():
    if g.current_user:
        conn = get_db_connection()
        car = conn.execute(text("SELECT * FROM cars WHERE user_id = :user_id"),{'user_id': g.current_user[0]}).fetchone()
        conn.close()
        return render_template("index.html", car=car)
    return render_template("index.html")

@app.route("/login", methods=["POST", "GET"])
def login():
    if g.current_user:
        return redirect(url_for("index"))
    elif request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        conn = get_db_connection()
        user = conn.execute(text("SELECT * FROM users WHERE email = :email"),{'email': email}).fetchone()
        conn.close()
        if user and check_password_hash(user[2], password):
            session["username"] = request.form["email"]
            flash("login successfull", "info")
            return redirect(url_for("index"))
        else:
            flash("Username or password is incorrect", "info")
            return redirect(url_for("login"))
    return render_template("login.html")

@app.route("/logout")
def logout():
    session.pop("username", None)
    return redirect(url_for("index"))

@app.route("/register", methods=["POST", "GET"])
def register():
    messages = get_flashed_messages()
    if g.current_user:
        return redirect(url_for("index"))
    elif request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        confirm_password = request.form["confirm_password"]
        if not email or not password or not confirm_password:
            flash("All fields are required", "error")
            return redirect(url_for('register'))
        elif password != confirm_password:
            flash("Passwords do not match!", "error")
            return redirect(url_for('register'))
        else:
            
            password_hash = generate_password_hash(password)
            conn = get_db_connection()
            try:
                conn.execute(text("INSERT INTO users (email, password_hash) VALUES (:email, :password_hash)"),
                {"email": email, "password_hash": password_hash})
                flash("Account created successfully", "info")
                return redirect(url_for('login'))
            except Exception as e:
                conn.rollback()
                flash(f"error creating account: {e}", "error")
                return redirect(url_for("register"))
            finally:
                conn.close()

    return render_template("register.html", messages=messages)

@app.route("/add-entrie", methods=["POST", "GET"])
def add_entrie():
    if request.method == "POST":
        title = request.form["title"]
        place = request.form["place"]
        cost = request.form["cost"]
        mialadge = request.form["mialadge"]
        text = request.form["text"]
        user_id = request.form["user_id"]
        if not title:
            flash('Title is required')
        else:
            conn = get_db_connection()
            conn.execute(text("INSERT INTO maintentry (title, place, cost, mialadge, text, user_id) VALUES (:title, :place, :cost, :mialadge, :text, :user_id)"),
            {"title": title, "place": place, "cost": cost, "mialadge": mialadge, "text": text, "user_id": user_id})
            conn.close()
            return redirect("all-entries")
    return render_template("add-entrie.html")

@app.route("/all-entries")
def all_entries():
    conn = get_db_connection()
    try:
        if g.current_user:
            # posts = conn.execute("SELECT * FROM maintentry").fetchall()
            posts = conn.execute(text("SELECT * FROM maintentry WHERE user_id = :user_id"), {'user_id': g.current_user[0]}).fetchall()
        else:
            # conn = get_db_connection()
            posts = conn.execute(text("SELECT * FROM maintentry WHERE user_id IS NULL")).fetchall()
        return render_template("all-entries.html", posts=posts)
    finally:
        conn.close()

@app.route("/post/<int:post_id>")
def show_post(post_id):
    post = get_post(post_id)
    return render_template("post.html", post=post)

@app.route("/post/<int:post_id>/edit", methods=["POST", "GET"])
def edit_post(post_id):
    post = get_post(post_id)
    if request.method == "POST":
        title = request.form["title"]
        place = request.form["place"]
        cost = request.form["cost"]
        mialadge = request.form["mialadge"]
        text = request.form["text"]
        if not title:
            flash('Title is required')
        else:
            conn = get_db_connection()
            conn.execute(text("UPDATE maintentry SET title = :title, place = :place, cost = :cost, mialadge = :mialadge, text = :text"
                         "WHERE id = :id"),
            {"title": title, "place": place, "cost": cost, "mialadge": mialadge, "text": text, "id": post_id})
            conn.close()
            return redirect(url_for("all_entries"))
    return render_template("edit.html", post=post)
@app.route("/post/<int:post_id>/delete", methods=["POST", "GET"])
def delete_post(post_id):
    post = get_post(post_id)
    conn = get_db_connection()
    conn.execute(text("DELETE FROM maintentry WHERE id = :id"), {"id": post_id})
    conn.close()
    flash(f'{post["title"]} was successfully deleted')
    return redirect(url_for("all_entries"))

@app.route("/add-vehicle", methods=["POST", "GET"])
def add_vehicle():
    if request.method == "POST":
        make = request.form["make"]
        model = request.form["model"]
        year = request.form["year"]
        mialadge = request.form["mialadge"]
        engine = request.form["engine"]
        current = 0
        if if_user_has_car(g.current_user[0]):
            current = 1
        user_id = request.form["user_id"]
        conn = get_db_connection()
        conn.execute(text("INSERT INTO cars (make, model, year, mialadge, engine, current, user_id) VALUES (:make, :model, :year, :mialadge, :engine, :current, :user_id)"),
                     {"make": make, "model": model, "year": year, "mialadge": mialadge, "engine": engine, "current": current, "user_id": user_id})
        conn.close()
        return redirect(url_for("index"))
    return render_template("add-vehicle.html")



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

