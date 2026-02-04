# Spring Boot CRUD Application

Aplicación web CRUD completa desarrollada con Java Spring Boot siguiendo la arquitectura MVC. Implementa APIs REST integradas con base de datos SQL Server, incluye frontend básico con HTML, CSS y JavaScript, y configuración Docker para despliegue.

## 📋 Características

- **Arquitectura MVC**: Separación clara entre Entity, Repository, Service y Controller
- **APIs REST**: Endpoints completos para operaciones CRUD
- **Base de Datos**: Integración con SQL Server (y H2 para desarrollo)
- **Frontend**: Interfaz web moderna con HTML, CSS y JavaScript
- **Docker**: Configuración completa con Docker y Docker Compose
- **Validación**: Validación de datos con Bean Validation
- **Búsqueda**: Funcionalidad de búsqueda de productos

## 🛠️ Tecnologías

- **Backend**:
  - Java 17
  - Spring Boot 3.1.5
  - Spring Data JPA
  - Spring Web
  - Lombok
  - Bean Validation

- **Base de Datos**:
  - SQL Server (Producción)
  - H2 Database (Desarrollo/Testing)

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (Vanilla)

- **Herramientas**:
  - Maven
  - Docker & Docker Compose
  - Git

## 📁 Estructura del Proyecto

```
springboot-crud-app/
├── src/
│   ├── main/
│   │   ├── java/com/example/springbootcrud/
│   │   │   ├── SpringBootCrudApplication.java
│   │   │   ├── entity/
│   │   │   │   └── Product.java
│   │   │   ├── repository/
│   │   │   │   └── ProductRepository.java
│   │   │   ├── service/
│   │   │   │   └── ProductService.java
│   │   │   └── controller/
│   │   │       ├── ProductController.java
│   │   │       └── HomeController.java
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── css/
│   │       │   │   └── style.css
│   │       │   ├── js/
│   │       │   │   └── app.js
│   │       │   └── index.html
│   │       └── application.properties
│   └── test/
│       └── java/com/example/springbootcrud/
├── Dockerfile
├── docker-compose.yml
├── pom.xml
└── README.md
```

## 🚀 Instalación y Ejecución

### Prerequisitos

- Java 17 o superior
- Maven 3.6+
- SQL Server (o usar H2 para desarrollo)
- Docker y Docker Compose (opcional)

### Opción 1: Ejecución Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/GabiAM-Wr/Springboot-Project.git
   cd Springboot-Project
   ```

2. **Configurar la base de datos**
   
   Para SQL Server, edita `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=SpringBootDB
   spring.datasource.username=sa
   spring.datasource.password=TuContraseña
   ```
   
   O para H2 (desarrollo), comenta la configuración de SQL Server y descomenta:
   ```properties
   spring.datasource.url=jdbc:h2:mem:testdb
   spring.h2.console.enabled=true
   ```

3. **Compilar el proyecto**
   ```bash
   mvn clean install
   ```

4. **Ejecutar la aplicación**
   ```bash
   mvn spring-boot:run
   ```

5. **Acceder a la aplicación**
   - Frontend: http://localhost:8080
   - API: http://localhost:8080/api/products
   - H2 Console (si está habilitado): http://localhost:8080/h2-console

### Opción 2: Ejecución con Docker

1. **Construir y ejecutar con Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Acceder a la aplicación**
   - Frontend: http://localhost:8080
   - API: http://localhost:8080/api/products

3. **Detener los contenedores**
   ```bash
   docker-compose down
   ```

## 📚 API Endpoints

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products/{id}` | Obtener producto por ID |
| GET | `/api/products/search?name={name}` | Buscar productos por nombre |
| GET | `/api/products/price-range?minPrice={min}&maxPrice={max}` | Buscar por rango de precio |
| POST | `/api/products` | Crear nuevo producto |
| PUT | `/api/products/{id}` | Actualizar producto |
| DELETE | `/api/products/{id}` | Eliminar producto |

### Ejemplos de Requests

**Crear Producto (POST /api/products)**
```json
{
  "name": "Laptop",
  "description": "High performance laptop",
  "price": 1200.50,
  "quantity": 10
}
```

**Actualizar Producto (PUT /api/products/1)**
```json
{
  "name": "Laptop Pro",
  "description": "Updated laptop",
  "price": 1500.00,
  "quantity": 8
}
```

## 🧪 Pruebas con Postman

1. Importa la colección de Postman (o crea requests manualmente)
2. Configura la URL base: `http://localhost:8080`
3. Prueba todos los endpoints CRUD

### Ejemplos de pruebas:

1. **GET** `http://localhost:8080/api/products` - Listar todos
2. **POST** `http://localhost:8080/api/products` - Crear producto
3. **GET** `http://localhost:8080/api/products/1` - Obtener por ID
4. **PUT** `http://localhost:8080/api/products/1` - Actualizar
5. **DELETE** `http://localhost:8080/api/products/1` - Eliminar
6. **GET** `http://localhost:8080/api/products/search?name=laptop` - Buscar

## 🗄️ Esquema de Base de Datos

### Tabla: products

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | BIGINT | Primary Key (Auto-increment) |
| name | VARCHAR(255) | Nombre del producto (requerido) |
| description | VARCHAR(1000) | Descripción del producto |
| price | DOUBLE | Precio (requerido, >= 0) |
| quantity | INTEGER | Cantidad en stock (requerido, >= 0) |
| created_at | DATETIME | Fecha de creación |
| updated_at | DATETIME | Fecha de última actualización |

## 💻 Interfaz de Usuario

La aplicación incluye una interfaz web moderna con:
- Formulario para agregar/editar productos
- Tabla de productos con opciones de editar y eliminar
- Búsqueda de productos por nombre
- Diseño responsive
- Validación de formularios
- Mensajes de éxito/error

## 🐳 Docker

### Dockerfile
Construcción multi-stage para optimizar el tamaño de la imagen:
- Stage 1: Compilación con Maven
- Stage 2: Imagen runtime con solo el JAR

### Docker Compose
Incluye:
- Servicio SQL Server
- Servicio Spring Boot Application
- Red compartida
- Volumen persistente para la base de datos
- Health checks

## 🔧 Configuración Adicional

### Perfiles de Spring Boot

Puedes crear perfiles adicionales para diferentes entornos:

**application-dev.properties** (Desarrollo)
```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.h2.console.enabled=true
```

**application-prod.properties** (Producción)
```properties
spring.datasource.url=jdbc:sqlserver://production-server:1433;databaseName=SpringBootDB
```

Ejecutar con perfil específico:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## 📝 Notas de Desarrollo

- La aplicación usa Lombok para reducir código boilerplate
- JPA genera/actualiza las tablas automáticamente (ddl-auto=update)
- CORS está habilitado en el controlador para desarrollo
- Las validaciones se aplican usando Bean Validation
- Los logs están configurados para mostrar las queries SQL

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al Branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [MIT License](LICENSE).

## 👨‍💻 Autor

**GabiAM-Wr**

## 🙏 Agradecimientos

- Spring Boot Documentation
- Baeldung Tutorials
- Stack Overflow Community

---

**Proyecto educativo para aprender Spring Boot, arquitectura MVC, APIs REST y Docker.**
