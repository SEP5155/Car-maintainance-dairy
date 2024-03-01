import sqlite3

connection = sqlite3.connect('maintainance.db')

with open("schema.sql") as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO maintentry (title, place, cost, mialadge, text) VALUES (?, ?, ?, ?, ?)",
            ("First post", "V8 service", 5555, 230000, "All went good")
            )

connection.commit()
connection.close()
