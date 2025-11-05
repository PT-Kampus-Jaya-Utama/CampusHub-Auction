# CampusHub Auction

A microservices-based e-auction platform built with **NestJS** for backend and **React** for frontend, using a polyglot persistence architecture with containerized deployment.

## Product Description

 CampusHub Auction is a specialized auction platform designed to manage and auction unclaimed items found on campus. This platform enables:
- **Product Owners**: List valuable items for auction with flexible rental periods
- **Bidders**: Access rare items they couldn't otherwise afford
- **Short-term Rentals**: Get products for specific durations without full purchase cost
- **Competitive Bidding**: Multiple interested buyers drive fair market pricing

## Architecture Overview

This platform follows a microservices architecture with **6 independent services**:

### Frontend
- **Technology**: React 18 + TypeScript + Material-UI v5
- **Features**: Blue color palette theme, responsive design, JWT authentication
- **Deployment**: Docker container with Nginx

### Backend Microservices

| Service | Technology | Database | Port | Description |
|---------|-----------|----------|------|-------------|
| **Auth Service** | NestJS + Redis | Redis | 3001 | JWT authentication & user registration |
| **Registration Service** | NestJS + MongoDB + Kafka | MongoDB | 3002 | User & rent item management with event streaming |
| **Search Service** | NestJS + MongoDB | MongoDB | 3003 | Product search with Swagger documentation |
| **Bidding Service** | NestJS + Redis | Redis | 3004 | Real-time bidding with validation logic |
| **Recommendation Service** | NestJS + Neo4j | Neo4j | 3005 | Graph-based product recommendations |

### Databases

- **Redis** (2 instances): Authentication data + Bidding items
- **MongoDB** (2 databases): User registration + Product catalog
- **Neo4j**: Graph database for recommendations
- **Kafka + Zookeeper**: Event streaming for inter-service communication

## Features

- ✅ **Polyglot Persistence**: Right database for each use case
- ✅ **Modern Tech Stack**: NestJS, React 18, TypeScript throughout
- ✅ **Microservices Best Practices**: Independent deployments, fault isolation
- ✅ **Event-Driven**: Kafka integration for asynchronous messaging
- ✅ **Containerized**: Full Docker support with docker-compose
- ✅ **Type-Safe**: TypeScript on both frontend and backend
- ✅ **API Documentation**: Swagger UI for Search Service
- ✅ **Bidding Logic**: Minimum bid validation, rental period checks
- ✅ **Graph Recommendations**: Neo4j for relationship-based suggestions
- ✅ **JWT Security**: Secure authentication with bcrypt password hashing

## Prerequisites

- **Node.js** 20+ and npm
- **Docker** and Docker Compose
- **Git**

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Maung
```

### 2. Set Up Environment Variables

Create `.env` files for each service (use `.env.example` as template):

```bash
# Auth Service
cp auth-service/.env.example auth-service/.env

# Registration Service
cp registration-service/.env.example registration-service/.env

# Search Service
cp search-service/.env.example search-service/.env

# Bidding Service
cp bidding-service/.env.example bidding-service/.env

# Recommendation Service
cp recommendation-service/.env.example recommendation-service/.env
```

**Important**: Update JWT secrets and passwords in production!

### 3. Start All Services with Docker Compose

```bash
docker-compose up --build
```

This will:
- Build all Docker images
- Start all databases (Redis, MongoDB, Neo4j, Kafka)
- Start all 5 microservices
- Start the React frontend

### 4. Access the Application

- **Frontend**: http://localhost
- **Auth Service**: http://localhost:3001
- **Registration Service**: http://localhost:3002
- **Search Service**: http://localhost:3003
  - **Swagger Docs**: http://localhost:3003/api
- **Bidding Service**: http://localhost:3004
- **Recommendation Service**: http://localhost:3005
- **Neo4j Browser**: http://localhost:7474 (neo4j/799124)

## Development Setup

### Running Services Locally (without Docker)

#### 1. Install Dependencies

```bash
# Frontend
cd frontend && npm install

# Each backend service
cd auth-service && npm install
cd ../registration-service && npm install
cd ../search-service && npm install
cd ../bidding-service && npm install
cd ../recommendation-service && npm install
```

#### 2. Start Databases

You'll need local instances of:
- Redis (port 6379)
- MongoDB (port 27017)
- Neo4j (port 7687)
- Kafka + Zookeeper (ports 9092, 2181)

Or use Docker for just the databases:

```bash
docker-compose up redis mongodb neo4j zookeeper kafka
```

#### 3. Start Services in Development Mode

```bash
# Terminal 1 - Frontend
cd frontend && npm run dev

# Terminal 2 - Auth Service
cd auth-service && npm run start:dev

# Terminal 3 - Registration Service
cd registration-service && npm run start:dev

# Terminal 4 - Search Service
cd search-service && npm run start:dev

# Terminal 5 - Bidding Service
cd bidding-service && npm run start:dev

# Terminal 6 - Recommendation Service
cd recommendation-service && npm run start:dev
```

## Project Structure

```
Maung/
├── docker-compose.yml           # Orchestrates all services
├── README.md                    # This file
│
├── frontend/                    # React + TypeScript + MUI
│   ├── src/
│   │   ├── components/         # Header, Footer, etc.
│   │   ├── pages/              # All page components
│   │   ├── services/           # API service layers
│   │   ├── store/              # Zustand state management
│   │   ├── types/              # TypeScript interfaces
│   │   ├── theme.ts            # MUI blue theme
│   │   └── App.tsx            # Main app with routing
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── auth-service/               # NestJS + Redis
│   ├── src/
│   │   ├── auth/              # Authentication module
│   │   ├── users/             # User management
│   │   └── main.ts
│   ├── Dockerfile
│   └── package.json
│
├── registration-service/       # NestJS + MongoDB + Kafka
│   ├── src/
│   │   ├── users/             # User CRUD + schemas
│   │   ├── kafka/             # Kafka producer
│   │   └── main.ts
│   ├── Dockerfile
│   └── package.json
│
├── search-service/            # NestJS + MongoDB
│   ├── src/
│   │   ├── products/          # Product search
│   │   └── main.ts
│   ├── Dockerfile
│   └── package.json
│
├── bidding-service/           # NestJS + Redis
│   ├── src/
│   │   ├── items/             # Bidding logic
│   │   └── main.ts
│   ├── Dockerfile
│   └── package.json
│
└── recommendation-service/    # NestJS + Neo4j
    ├── src/
    │   ├── recommendations/   # Graph queries
    │   └── main.ts
    ├── Dockerfile
    └── package.json
```

## API Endpoints

### Auth Service (3001)
- `POST /authenticate` - Login
- `POST /register` - Register new user

### Registration Service (3002)
- `POST /api/v1/user` - Create user
- `POST /api/v1/rentItems/:email` - Add rent items
- `GET /api/v1/getAllUsers` - Get all users
- `GET /api/v1/getRentItems/:email` - Get user's rent items
- `PUT /api/v1/update` - Update user
- `PUT /api/v1/updateRentItems/:email/:id` - Update rent item
- `DELETE /api/v1/delete/:email` - Delete user
- `DELETE /api/v1/deleteRentItems/:email/:id` - Delete rent item

### Search Service (3003)
- `POST /api/v1/product` - Create product
- `GET /api/v1/product` - Get all products
- `GET /api/v1/product/:id` - Get product by ID
- `GET /api/v1/productname/:name` - Search by name

### Bidding Service (3004)
- `GET /getAllItems` - Get all items
- `GET /item/:itemId` - Get item by ID
- `POST /addItem` - Add new item
- `PUT /updateItem/:itemId/:bid/:days` - Place bid

### Recommendation Service (3005)
- `GET /api/v1/users` - Get all users
- `GET /api/v1/userslikes` - Get user likes
- `GET /api/v1/userrcm` - Get recommendations
- `GET /api/v1/myproducts` - Get wishlist
- `POST /api/v1/savewishlist` - Add to wishlist
- `POST /api/v1/removefav` - Remove from wishlist

## Technology Stack

### Frontend
- React 18.2
- TypeScript 5.3
- Material-UI (MUI) 5.15
- React Router 6
- Axios
- Zustand (state management)
- Vite (build tool)

### Backend
- NestJS 10.3
- TypeScript 5.3
- Passport JWT
- Class Validator
- Class Transformer

### Databases & Messaging
- Redis 7 (ioredis client)
- MongoDB 8 (Mongoose ODM)
- Neo4j 5 (neo4j-driver)
- Kafka (KafkaJS client)

### DevOps
- Docker & Docker Compose
- Nginx (frontend reverse proxy)
- Multi-stage Docker builds

## Key Improvements from Original

1. **Modern Language**: Migrated from Java to TypeScript/Node.js
2. **Consistent Framework**: NestJS across all backend services
3. **Updated Frontend**: Angular → React 18 with modern hooks
4. **Blue Theme**: Custom Material-UI theme as requested
5. **Containerization**: Full Docker support with compose
6. **Type Safety**: TypeScript throughout entire stack
7. **Auth Migration**: MySQL → Redis for authentication
8. **Best Practices**: Dependency injection, DTOs, validation
9. **API Docs**: Swagger integration
10. **No H2**: Removed as requested

## Production Considerations

Before deploying to production:

1. **Environment Variables**: Change all default passwords and secrets
2. **CORS**: Update `CORS_ORIGIN` to your production domain
3. **Database Volumes**: Ensure data persistence configuration
4. **SSL/TLS**: Add HTTPS certificates (Let's Encrypt recommended)
5. **Monitoring**: Add Prometheus/Grafana for metrics
6. **Logging**: Centralize logs (ELK stack recommended)
7. **Scaling**: Consider Kubernetes for orchestration
8. **API Gateway**: Add Kong/NGINX for centralized routing
9. **Service Discovery**: Implement if not using container networking
10. **Backup Strategy**: Regular database backups

## Troubleshooting

### Port Conflicts
If ports are already in use, update the ports in `docker-compose.yml`

### Database Connection Issues
Ensure health checks pass before services start. Check logs:
```bash
docker-compose logs <service-name>
```

### Kafka Not Starting
Kafka requires Zookeeper. Ensure Zookeeper is healthy first.

### Neo4j Connection Failed
Default credentials: `neo4j/799124`. Change if modified.

## License

MIT

## Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ using modern microservices architecture**
