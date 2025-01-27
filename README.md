# Wallet Service Project

## Overview
This project is a Wallet Management Service implemented using NestJS, PostgreSQL, Redis, and RabbitMQ. The service provides functionality for creating, updating, and analyzing cryptocurrency wallets.

## Key Features
- **Transaction Analysis**:
  - Calculate metrics such as average purchase amount, success rate, net profit, and holding duration.
  - Identify and categorize trading activities (e.g., "Dex Trader").
  - Detect suspicious bot-like activities.
- **Data Storage**:
  - Use PostgreSQL for data persistence.
  - Implement caching with Redis for faster access.
- **Message Queue Management**:
  - Use RabbitMQ for asynchronous processing and queue management.
- **RESTful API**:
  - Interact with the service via RESTful endpoints.
- **Blockchain Support**:
  - Create and manage cryptocurrency wallets with support for multiple blockchain networks.
- **Token Performance Analysis**:
  - Identify profitable tokens.
  - Calculate entry and exit prices.
  - Analyze trading patterns.

## Setup Instructions

### Install Dependencies
```bash
npm install
```

### Configure Environment Variables
Create a `.env` file with the following content:
```env
DATABASE_URL=postgresql://root:7V36pDHYak9uKbvCZXk5mX0J@apo.liara.cloud:32615/postgres
REDIS_HOST=apo.liara.cloud
REDIS_PORT=30000
RABBITMQ_URL=amqp://localhost:5672
```

### Run the Application
```bash
npm run start:dev
```

## API Endpoints
- **POST /wallets**: Create a new wallet from JSON.
- **GET /wallets**: Retrieve a list of all wallets.
- **GET /wallets/:id**: Retrieve information about a specific wallet.
- **GET /analyze**: Start transaction analysis for wallets.

## Scalability Solutions
- **Caching with Redis**:
  - Reduces database load and improves response time by storing frequently accessed data temporarily.
- **Asynchronous Processing with RabbitMQ**:
  - Handles time-consuming tasks such as transaction analysis via queues, enabling horizontal scalability.
- **Modular Architecture**:
  - Built using NestJS’s modular architecture for easier development and maintenance.
- **ORM with Sequelize**:
  - Facilitates better database management and future database migrations.
- **Environment Configuration**:
  - Uses `.env` files for seamless deployment in different environments.
- **Advanced Logging and Monitoring**:
  - Implements structured and searchable logging using the ELK stack, along with monitoring dashboards to track system performance.

## Scalability Options
To further enhance scalability:
1. **Horizontal Scaling**:
   - Deploy multiple instances of the service behind a load balancer.
2. **Service Isolation**:
   - Separate components such as transaction analysis into dedicated services.

## Testing
To run tests:
```bash
npm run test
```

## API Documentation
Complete API documentation is available via Swagger at:
```
http://localhost:3000/api
```
