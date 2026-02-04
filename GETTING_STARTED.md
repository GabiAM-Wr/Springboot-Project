# Getting Started with Spring Boot CRUD Application

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- SQL Server (optional, H2 is configured by default)
- Docker (optional, for containerized deployment)

## Quick Start Guide

### 1. Clone the Repository

```bash
git clone https://github.com/GabiAM-Wr/Springboot-Project.git
cd Springboot-Project
```

### 2. Run with H2 Database (Recommended for Development)

The application is pre-configured to use H2 in-memory database. Simply run:

```bash
mvn spring-boot:run
```

The application will start on http://localhost:8080

### 3. Access the Application

- **Web Interface**: http://localhost:8080
- **API Base URL**: http://localhost:8080/api/products
- **H2 Console**: http://localhost:8080/h2-console (if enabled)

### 4. Test the API with cURL

**Create a Product:**
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gaming Mouse",
    "description": "RGB gaming mouse with 7 buttons",
    "price": 49.99,
    "quantity": 25
  }'
```

**Get All Products:**
```bash
curl http://localhost:8080/api/products
```

**Search Products:**
```bash
curl "http://localhost:8080/api/products/search?name=mouse"
```

**Update a Product:**
```bash
curl -X PUT http://localhost:8080/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product",
    "description": "Updated description",
    "price": 59.99,
    "quantity": 30
  }'
```

**Delete a Product:**
```bash
curl -X DELETE http://localhost:8080/api/products/1
```

## Using SQL Server (Production)

1. Start SQL Server and create a database:
```sql
CREATE DATABASE SpringBootDB;
```

2. Edit `src/main/resources/application.properties`:
```properties
# Comment out H2 configuration
# Uncomment SQL Server configuration and update credentials
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=SpringBootDB
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Run the application:
```bash
mvn spring-boot:run
```

## Using Docker

### Option 1: Docker Compose (Includes SQL Server)

```bash
docker-compose up --build
```

This will start:
- SQL Server on port 1433
- Spring Boot application on port 8080

### Option 2: Build Docker Image Only

```bash
docker build -t springboot-crud-app .
docker run -p 8080:8080 springboot-crud-app
```

## Project Structure Overview

```
src/
├── main/
│   ├── java/com/example/springbootcrud/
│   │   ├── SpringBootCrudApplication.java  # Main class
│   │   ├── config/                         # Configuration classes
│   │   ├── controller/                     # REST controllers
│   │   ├── entity/                         # JPA entities
│   │   ├── exception/                      # Custom exceptions
│   │   ├── repository/                     # Data repositories
│   │   └── service/                        # Business logic
│   └── resources/
│       ├── application.properties          # Configuration
│       └── static/                         # Frontend files
│           ├── css/
│           ├── js/
│           └── index.html
└── test/                                   # Test files
```

## Available API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/products | Get all products |
| GET    | /api/products/{id} | Get product by ID |
| GET    | /api/products/search?name={name} | Search by name |
| GET    | /api/products/price-range?minPrice={min}&maxPrice={max} | Filter by price |
| POST   | /api/products | Create new product |
| PUT    | /api/products/{id} | Update product |
| DELETE | /api/products/{id} | Delete product |

## Testing with Postman

1. Import the following collection or create requests manually
2. Set base URL: `http://localhost:8080`
3. For POST/PUT requests, use Content-Type: `application/json`

## Troubleshooting

### Port 8080 Already in Use
```bash
# Change port in application.properties
server.port=8081
```

### Database Connection Issues
- Verify SQL Server is running
- Check credentials in application.properties
- Ensure database exists
- For H2, it's automatically created in memory

### Build Errors
```bash
# Clean and rebuild
mvn clean install
```

## Next Steps

1. **Customize the Product Entity**: Add more fields to the Product model
2. **Add Authentication**: Implement Spring Security
3. **Add More Entities**: Create relationships (e.g., Category, Supplier)
4. **Implement Pagination**: Add pagination to product list
5. **Add File Upload**: Support product images
6. **Write Tests**: Add unit and integration tests

## Support

For issues or questions:
- Check the main README.md
- Review application logs
- Ensure all prerequisites are installed

## License

This project is open source and available under the MIT License.
