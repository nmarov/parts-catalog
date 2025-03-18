-- Add imageUrl column to parts table
ALTER TABLE parts ADD COLUMN image_url VARCHAR(255);

-- Update existing parts with Unsplash CDN images
UPDATE parts SET image_url = 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=300&h=200&fit=crop' WHERE name = 'Arduino Uno';
UPDATE parts SET image_url = 'https://images.unsplash.com/photo-1580154158708-b9ea08c3f0a7?w=300&h=200&fit=crop' WHERE name = 'Raspberry Pi 4';
UPDATE parts SET image_url = 'https://images.unsplash.com/photo-1520869309377-88c9274a27c2?w=300&h=200&fit=crop' WHERE name = 'LED Kit';
UPDATE parts SET image_url = 'https://images.unsplash.com/photo-1555543451-eeaff0fcc3d3?w=300&h=200&fit=crop' WHERE name = 'Breadboard';

UPDATE parts SET image_url = 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261?w=300&h=200&fit=crop' WHERE name = 'Gear Set';
UPDATE parts SET image_url = 'https://images.unsplash.com/photo-1531752074002-abf991376d04?w=300&h=200&fit=crop' WHERE name = 'Bearing Kit';
UPDATE parts SET image_url = 'https://images.unsplash.com/photo-1581092921461-39b21de32ad1?w=300&h=200&fit=crop' WHERE name = 'Aluminum Extrusion';
UPDATE parts SET image_url = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=200&fit=crop' WHERE name = 'Stepper Motor';

UPDATE parts SET image_url = 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300&h=200&fit=crop' WHERE name = 'Screwdriver Set';
UPDATE parts SET image_url = 'https://images.unsplash.com/photo-1623240976097-0d0066e5a6a7?w=300&h=200&fit=crop' WHERE name = 'Soldering Iron';
UPDATE parts SET image_url = 'https://images.unsplash.com/photo-1589149098258-3b71a54013e5?w=300&h=200&fit=crop' WHERE name = 'Multimeter';
UPDATE parts SET image_url = 'https://images.unsplash.com/photo-1572981779416-6c31c1d66a88?w=300&h=200&fit=crop' WHERE name = 'Wire Cutter';
