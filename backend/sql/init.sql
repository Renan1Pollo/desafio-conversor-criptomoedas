-- Tabela de usuários 
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL,
    status VARCHAR(10) DEFAULT 'active'
);

-- Histórico de conversões
CREATE TABLE conversion_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    crypto_id VARCHAR(255) NOT NULL,
    crypto_name VARCHAR(255),
    quantity NUMERIC(20, 10),
    converted_brl NUMERIC(18, 4),
    converted_usd NUMERIC(18, 4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criptomoedas favoritas
CREATE TABLE favorite_cryptos ( 
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    crypto_id VARCHAR(255) NOT NULL,
    crypto_name VARCHAR(255),
    coin_symbol VARCHAR(255),
    coin_image VARCHAR(255),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_favorite_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT unique_user_crypto UNIQUE (user_id, crypto_id)
);
