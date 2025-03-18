-- Update Categories to be windsurf-specific
UPDATE categories SET name = 'Sails', description = 'Windsurf sails and accessories' WHERE name = 'Electronics';
UPDATE categories SET name = 'Boards', description = 'Windsurf boards for all conditions' WHERE name = 'Mechanical';
UPDATE categories SET name = 'Accessories', description = 'Essential windsurf accessories and gear' WHERE name = 'Tools';

-- Get the IDs for the updated categories
DO $$
DECLARE
    sails_id BIGINT;
    boards_id BIGINT;
    accessories_id BIGINT;
BEGIN
    SELECT id INTO sails_id FROM categories WHERE name = 'Sails';
    SELECT id INTO boards_id FROM categories WHERE name = 'Boards';
    SELECT id INTO accessories_id FROM categories WHERE name = 'Accessories';

    -- Delete old parts
    DELETE FROM basket_items;
    DELETE FROM baskets;
    DELETE FROM parts;

    -- Insert Parts for Sails category
    INSERT INTO parts (name, description, price, stock_quantity, category_id, image_url) VALUES 
    ('Wave Sail 4.7', 'High performance wave sail for radical conditions', 499.99, 15, sails_id, 'https://images.unsplash.com/photo-1542546068979-b6affb46ea8f?w=300&h=200&fit=crop'),
    ('Freeride Sail 6.5', 'All-round freeride sail for cruising and speed', 549.00, 20, sails_id, 'https://images.unsplash.com/photo-1565246075319-62fb5fed7d9c?w=300&h=200&fit=crop'),
    ('Race Sail 8.5', 'Competition race sail for maximum speed', 699.50, 10, sails_id, 'https://images.unsplash.com/photo-1601944179066-29b8f7e31678?w=300&h=200&fit=crop'),
    ('Beginner Sail 5.5', 'Easy to handle sail for beginners', 399.99, 25, sails_id, 'https://images.unsplash.com/photo-1563203273-a9895f1a3fb7?w=300&h=200&fit=crop');

    -- Insert Parts for Boards category
    INSERT INTO parts (name, description, price, stock_quantity, category_id, image_url) VALUES 
    ('Wave Board 85L', 'Compact wave board for radical maneuvers', 999.75, 12, boards_id, 'https://images.unsplash.com/photo-1531722569936-825d3dd91b15?w=300&h=200&fit=crop'),
    ('Freeride Board 130L', 'Versatile board for all conditions', 1199.50, 18, boards_id, 'https://images.unsplash.com/photo-1602551270784-799d3c979f31?w=300&h=200&fit=crop'),
    ('Slalom Board 95L', 'Fast and maneuverable slalom board', 1499.99, 8, boards_id, 'https://images.unsplash.com/photo-1626447852999-4e5fd7b55db7?w=300&h=200&fit=crop'),
    ('Beginner Board 180L', 'Stable board with plenty of volume for beginners', 899.00, 22, boards_id, 'https://images.unsplash.com/photo-1626447457151-acc6e5965ba3?w=300&h=200&fit=crop');

    -- Insert Parts for Accessories category
    INSERT INTO parts (name, description, price, stock_quantity, category_id, image_url) VALUES 
    ('Carbon Boom', 'Lightweight carbon boom for performance sailing', 299.99, 30, accessories_id, 'https://images.unsplash.com/photo-1564419188231-c53abc864bd1?w=300&h=200&fit=crop'),
    ('Mast Extension', 'Adjustable mast extension for perfect sail trim', 89.00, 40, accessories_id, 'https://images.unsplash.com/photo-1564419188434-43f4433a24f7?w=300&h=200&fit=crop'),
    ('Harness Lines', 'Premium harness lines with adjustable length', 49.50, 50, accessories_id, 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=300&h=200&fit=crop'),
    ('Wetsuit 4/3', 'Warm and flexible wetsuit for all seasons', 199.99, 25, accessories_id, 'https://images.unsplash.com/photo-1628689469838-524a4a973b8e?w=300&h=200&fit=crop');
END $$;
