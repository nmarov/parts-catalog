-- Insert Categories
INSERT INTO categories (name, description) VALUES 
('Electronics', 'Electronic components and parts'),
('Mechanical', 'Mechanical parts and components'),
('Tools', 'Tools for assembly and repair');

-- Get the IDs for the categories
DO $$
DECLARE
    electronics_id BIGINT;
    mechanical_id BIGINT;
    tools_id BIGINT;
BEGIN
    SELECT id INTO electronics_id FROM categories WHERE name = 'Electronics';
    SELECT id INTO mechanical_id FROM categories WHERE name = 'Mechanical';
    SELECT id INTO tools_id FROM categories WHERE name = 'Tools';

    -- Insert Parts for Electronics category
    INSERT INTO parts (name, description, price, stock_quantity, category_id) VALUES 
    ('Arduino Uno', 'Microcontroller board based on the ATmega328P', 22.99, 50, electronics_id),
    ('Raspberry Pi 4', 'Single-board computer with 4GB RAM', 55.00, 30, electronics_id),
    ('LED Kit', 'Assorted LEDs with resistors', 12.50, 100, electronics_id),
    ('Breadboard', 'Solderless breadboard for prototyping', 8.99, 75, electronics_id);

    -- Insert Parts for Mechanical category
    INSERT INTO parts (name, description, price, stock_quantity, category_id) VALUES 
    ('Gear Set', 'Assorted metal gears', 18.75, 40, mechanical_id),
    ('Bearing Kit', 'Various sizes of ball bearings', 15.50, 60, mechanical_id),
    ('Aluminum Extrusion', '1m aluminum profile', 24.99, 25, mechanical_id),
    ('Stepper Motor', 'NEMA 17 stepper motor', 14.50, 45, mechanical_id);

    -- Insert Parts for Tools category
    INSERT INTO parts (name, description, price, stock_quantity, category_id) VALUES 
    ('Screwdriver Set', 'Set of precision screwdrivers', 19.99, 35, tools_id),
    ('Soldering Iron', 'Temperature controlled soldering iron', 35.00, 20, tools_id),
    ('Multimeter', 'Digital multimeter for electronics testing', 28.50, 15, tools_id),
    ('Wire Cutter', 'Precision wire cutter and stripper', 12.99, 30, tools_id);
END $$;
