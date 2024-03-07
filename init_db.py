import sqlite3

connection = sqlite3.connect('maintainance.db')

with open("schema.sql") as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("ALTER TABLE maintentry ADD COLUMN user_id INTEGER")

cur.execute("INSERT INTO maintentry (title, place, cost, mialadge, text, user_id) VALUES (?, ?, ?, ?, ?, ?)",
            ("First post", "V8 service", 5555, 230000, "All went good", 1)
            )
cur.execute("INSERT INTO cars (make, model, year, mialadge, engine, user_id) VALUES (?, ?, ?, ?, ?, ?)",
            ("Land Rover", "Range Rover", 2009, 280000, "5.0 supercharged", 1)
            )

connection.commit()
connection.close()
