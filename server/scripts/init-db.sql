-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Programs Table
CREATE TABLE IF NOT EXISTS programs (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    activities JSONB,
    images JSONB
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE,
    location VARCHAR(255),
    description TEXT
);

-- Resources Table
CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    url TEXT
);

-- Applications Table
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    program_id VARCHAR(100) REFERENCES programs(id),
    user_id INTEGER REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'pending',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data (Optional, but helpful for initial testing)
INSERT INTO users (name, email, password, role)
VALUES ('Super User', 'superuser@y4c.com', 'password123', 'superuser')
ON CONFLICT (email) DO NOTHING;

INSERT INTO users (name, email, password, role)
VALUES ('Guest User', 'guest@y4c.com', 'password123', 'guest')
ON CONFLICT (email) DO NOTHING;
