CREATE TABLE IF NOT EXISTS maintentry (
    id INTEGER PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    place VARCHAR(100) NOT NULL,
    cost INTEGER NOT NULL,
    mialadge INTEGER NOT NULL,
    text TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cars (
    car_id INTEGER PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    mialadge INTEGER NOT NULL,
    engine VARCHAR NOT NULL,
    user_id INTEGER,
    current INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (user_id) 

)