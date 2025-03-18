-- Create Categories table
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);

-- Create Parts table
CREATE TABLE parts (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    category_id BIGINT NOT NULL,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Create Baskets table
CREATE TABLE baskets (
    id BIGSERIAL PRIMARY KEY
);

-- Create Basket Items table
CREATE TABLE basket_items (
    id BIGSERIAL PRIMARY KEY,
    part_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    basket_id BIGINT,
    CONSTRAINT fk_part FOREIGN KEY (part_id) REFERENCES parts(id),
    CONSTRAINT fk_basket FOREIGN KEY (basket_id) REFERENCES baskets(id)
);
