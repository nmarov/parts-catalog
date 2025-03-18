# Windsurf Parts Catalog Application

A modern full-stack application for browsing and purchasing windsurf equipment with an intuitive shopping basket functionality.

## Tech Stack

- **Backend**: Java 17, Spring Boot 3.2.3, Gradle
- **Frontend**: React 18, Material UI 5, React Router
- **Database**: PostgreSQL
- **Containerization**: Docker

## Running the Application

### Using Docker Compose (Recommended)

1. Make sure you have Docker and Docker Compose installed.
2. Navigate to the project root directory.
3. Run the following command:

```bash
docker compose down && docker compose up --build
```

This will start:
- PostgreSQL database on port 5432
- Spring Boot backend on port 8080
- React frontend on port 3000

Access the application at http://localhost:3000

### Running Locally (Development)

#### Backend

1. Make sure you have Java 17 and Gradle installed.
2. Start a PostgreSQL instance (or use Docker):

```bash
docker run -d --name postgres -e POSTGRES_DB=parts_catalog -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:15-alpine
```

3. Navigate to the project root directory and run:

```bash
./gradlew bootRun
```

The backend will be available at http://localhost:8080

#### Frontend

1. Make sure you have Node.js installed.
2. Navigate to the frontend directory.
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

The frontend will be available at http://localhost:3000

## Features

- Browse windsurf parts by category with image previews
- Responsive UI with modern design and animations
- Mobile-friendly navigation with drawer menu
- Add parts to basket with quantity selection
- View basket contents with product images
- Checkout summary with pricing details
- Optimized performance with Nginx caching
- Fallback colored placeholders for parts without images

## API Endpoints

- `GET /api/categories` - List all categories
- `GET /api/parts` - List all parts
- `GET /api/parts/category/{id}` - List parts by category
- `POST /api/basket` - Create a new basket
- `GET /api/basket/{id}` - Get basket by ID
- `POST /api/basket/{basketId}/items` - Add item to basket

## Design Features

### UI Components
- **Theme**: Custom Material UI theme with green primary color and orange accent color
- **Cards**: Animated product cards with hover effects
- **Navigation**: Responsive navigation with mobile drawer
- **Images**: Unsplash CDN images for all products with fallback mechanism
- **Typography**: Improved typography with custom font weights

### Performance Optimizations
- **Nginx Configuration**: Optimized for static asset caching
- **Gzip Compression**: Enabled for faster content delivery
- **Image Handling**: Unsplash CDN images with fallback to colored placeholders if images fail to load
- **Lazy Loading**: Components load as needed for better performance

## Tasks
- Keep basket between refreshes
- Implement ability to remove a basket item
- Implement ability to update a basket item quantity
- Display part category name in the basket 