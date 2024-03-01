import sqlite3
from flask import Flask, render_template, url_for, redirect, request, flash
from werkzeug.exceptions import abort


def get_db_connection():
    conn = sqlite3.connect('maintainance.db')
    conn.row_factory = sqlite3.Row
    return conn

def get_post(post_id):
    conn = get_db_connection()
    post = conn.execute("SELECT * FROM maintentry WHERE id = ?",
                        (post_id,)).fetchone()
    conn.close()
    if post is None:
        abort(404)
    return post

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your secret key'


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/add-entrie", methods=["POST", "GET"])
def add_entrie():
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
            conn.execute("INSERT INTO maintentry (title, place, cost, mialadge, text) VALUES (?, ?, ?, ?, ?)",
            (title, place, cost, mialadge, text)
            )
            conn.commit()
            conn.close()
            return redirect("all-entries")
    return render_template("add-entrie.html")

@app.route("/all-entries")
def all_entries():
    conn = get_db_connection()
    posts = conn.execute("SELECT * FROM maintentry").fetchall()
    conn.close()
    return render_template("all-entries.html", posts=posts)

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
            conn.execute("UPDATE maintentry SET title = ?, place = ?, cost = ?, mialadge = ?, text = ?"
                         "WHERE id = ?",
            (title, place, cost, mialadge, text, post_id)
            )
            conn.commit()
            conn.close()
            return redirect(url_for("all_entries"))
    return render_template("edit.html", post=post)
@app.route("/post/<int:post_id>/delete", methods=["POST", "GET"])
def delete_post(post_id):
    post = get_post(post_id)
    conn = get_db_connection()
    conn.execute("DELETE FROM maintentry WHERE id = ?", (post_id,))
    conn.commit()
    conn.close()
    flash(f"{post["title"]} was successfully deleted")
    return redirect(url_for("all_entries"))



if __name__ == "__main__":
    app.run(debug=True)

