Online Store API
This project is an API for an online store built using NestJS and MongoDB. It provides features for managing products, orders, and users.

Project Structure
The project consists of the following modules:

AppModule: The main module that connects other modules.
ProductModule: Handles product management, including creating, updating, deleting, and retrieving product information.
PurchaseModule: Manages purchases and orders.
UserModule: Handles user management and authentication.
SharedModule: Includes shared services and components used across other modules.
How to Run the Project
Ensure that Node.js and MongoDB are installed on your system.

Clone the project:

bash
Copy
Edit
git clone https://github.com/daniel3380rm/task-blue
Install dependencies:

Copy
Edit
npm install
Create a .env file at the root of the project and add the following environment variables:

bash
Copy
Edit
MONGODB_URI=mongodb://localhost:27017/online-store
Run the project:

arduino
Copy
Edit
npm run start:dev
yarn run start:dev
The API will be accessible at http://localhost:3000.

Key Features
Clean Architecture: The project is implemented following Clean Architecture principles, ensuring separation of concerns, maintainability, and scalability.

CQRS Pattern: Implements the Command Query Responsibility Segregation (CQRS) pattern, enabling better scalability and separation of read and write operations.

Swagger Integration: The API documentation is generated using Swagger, allowing easy testing and exploration of the API.

Validation: Uses class-validator for validating incoming data, ensuring data integrity and security.

Testing: Unit and integration tests are written using Jest to ensure code reliability and functionality.

Default User Management: Includes a service for creating and managing a default user, making it easier to work with the API during initial development.

TypeScript: The entire project is written in TypeScript, enabling safer and more reliable development with fewer errors.

Highlights
Scalable Architecture: The project structure is designed to facilitate easy development and addition of new features.

Best Practices for NestJS: Leverages advanced features of NestJS such as Dependency Injection, Decorators, and Pipes.

Testability: The project structure simplifies writing and executing tests.

Automated Documentation: Swagger automatically generates API documentation, making it easier for front-end developers to interact with the API.

Flexibility: MongoDB as the database offers high flexibility in data storage.

This project demonstrates the ability to design and implement a scalable, secure, and maintainable API that can be used for large and complex projects.







