CREATE TABLE maintentry (
    id INTEGER PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    place VARCHAR(100) NOT NULL,
    cost INTEGER NOT NULL,
    mialadge INTEGER NOT NULL,
    text TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
, user_id INTEGER);
INSERT INTO maintentry VALUES(3,'4th service','v10',500,250000,'','2024-03-01 12:57:33',NULL);
INSERT INTO maintentry VALUES(4,'3rd service','some',200,2550000,'','2024-03-01 12:57:58',NULL);
INSERT INTO maintentry VALUES(5,'kdsjhfsd','sd;flksd',5412,654,'test','2024-03-01 17:01:50',NULL);
INSERT INTO maintentry VALUES(6,'First post','V8 service',5555,230000,'All went good','2024-03-05 20:15:41',NULL);
INSERT INTO maintentry VALUES(7,'First post','V8 service',5555,230000,'All went good','2024-03-06 01:13:29',NULL);
INSERT INTO maintentry VALUES(8,'First post','V8 service',5555,230000,'All went good','2024-03-07 00:29:33',NULL);
INSERT INTO maintentry VALUES(9,'First post','V8 service',5555,230000,'All went good','2024-03-07 00:36:09',NULL);
INSERT INTO maintentry VALUES(10,'First post','V8 service',5555,230000,'All went good','2024-03-07 00:38:47',NULL);
INSERT INTO maintentry VALUES(11,'First post','V8 service',5555,230000,'All went good','2024-03-07 00:47:37',1);
INSERT INTO maintentry VALUES(12,'fsdfs','sdfsfs',444,444,'sfd','2024-03-07 00:47:52',1);
INSERT INTO maintentry VALUES(13,'Replaced fender on tesla','home',500,150000,'All good','2024-03-07 00:58:24',2);
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL
);
INSERT INTO users VALUES(1,'serg.papusha@gmail.com','scrypt:32768:8:1$57INEhGE1y9HucYE$48a319ef07ae1b4a6b02aa1076c58135883edff7838e5613e065e7ad890f8f1b9e6ca58933336a30b4526e67684d44f677d11f466a743a3717d6b5bfa42ecc30');
INSERT INTO users VALUES(2,'igor3334@gmail.com','scrypt:32768:8:1$eRsib6KfH8im9WcD$30c7602f3435a8e675bb90eeada12d3c9ac99157745352ae36ccf7dd183798e7c1df33cda5da3c9a40bc3c4e50ccd453586af8d9f88feb628dacfe03f317d6e0');
CREATE TABLE cars (
    car_id INTEGER PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    mialadge INTEGER NOT NULL,
    engine VARCHAR NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (user_id) 

);
INSERT INTO cars VALUES(1,'Land Rover','Range Rover',2009,280000,'5.0 supercharged',1);
INSERT INTO cars VALUES(2,'tesla','modex s',2016,1500000,'75',2);
INSERT INTO cars VALUES(3,'bmw','5 series',2012,240000,'3.0',2);
INSERT INTO cars VALUES(4,'Land Rover','Range Rover',2009,280000,'5.0 supercharged',1);
INSERT INTO cars VALUES(5,'Land Rover','Range Rover',2009,280000,'5.0 supercharged',1);
INSERT INTO cars VALUES(6,'Land Rover','Range Rover',2009,280000,'5.0 supercharged',1);
INSERT INTO cars VALUES(7,'Land Rover','Range Rover',2009,280000,'5.0 supercharged',1);
