CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    user_name TEXT NOT NULL,
    hash_password TEXT NOT NULL
);

CREATE TABLE card_sets (
    set_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users
);

CREATE TABLE cards (
    card_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    set_id INTEGER NOT NULL,
    FOREIGN KEY (set_id) REFERENCES card_sets
);
