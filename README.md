# TypeScript Clean Architecture Example

A practical implementation of Clean Architecture principles in TypeScript, featuring an e-commerce order management system.

## 🏗️ Architecture

This project demonstrates Clean Architecture with clear separation of concerns:

- **Domain Layer**: Core business entities and rules
- **Application Layer**: Use cases and business logic
- **Infrastructure Layer**: External concerns (database, HTTP, external APIs)

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- Docker & Docker Compose
- PostgreSQL (via Docker)

### Setup

```bash
# Install dependencies
npm install

# Start PostgreSQL database
make up

# Run the application
npm run dev
```

The server will start on `http://localhost:3000`

### Testing

```bash
npm test
```

## 📁 Project Structure

```
src/
├── domain/          # Business entities and rules
├── application/     # Use cases and business logic
└── infrastructure/  # External concerns (DB, HTTP, APIs)
```

## 🛠️ Key Features

- **Order Management**: Place orders with items, coupons, and shipping calculation
- **Repository Pattern**: Abstract data access with multiple implementations (Memory/PostgreSQL)
- **Dependency Injection**: Clean separation through factory pattern
- **Comprehensive Testing**: Unit and integration tests
- **Multiple HTTP Servers**: Support for both Express and Hapi

## 🗄️ Database

PostgreSQL with automatic schema initialization via Docker Compose. Database runs on port `5433` with credentials:

- User: `postgres`
- Password: `password`
- Database: `app`

## 🧪 Testing

- **Unit Tests**: Domain entities and business logic
- **Integration Tests**: Database repositories and HTTP endpoints
- **Test Coverage**: Comprehensive test suite with Jest

## 📦 Dependencies

- **Runtime**: Express/Hapi, PostgreSQL, pg-promise
- **Development**: TypeScript, Jest, ts-node-dev
