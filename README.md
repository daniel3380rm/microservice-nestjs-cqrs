# Online Store API

This project is an API for an online store built using NestJS and MongoDB. The API provides functionalities to manage products, orders, and users.

## Project Structure

The project is organized into the following modules:

1. **AppModule**: The main module that connects other modules.
2. **ProductModule**: Handles product management, including creating, updating, deleting, and retrieving product information.
3. **PurchaseModule**: Manages purchases and orders.
4. **UserModule**: Manages users and authentication.
5. **SharedModule**: Contains shared services and components used across other modules.

## How to Run the Project

1. Ensure that Node.js and MongoDB are installed on your system.

2. Clone the project:

   ```bash
   git clone https://github.com/daniel3380rm/task-blue
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project and add the following environment variables:

   ```plaintext
   MONGODB_URI=mongodb://localhost:27017/online-store
   ```

5. Start the project:

   ```bash
   npm run start:dev
   yarn run start:dev
   ```

6. The API will now be accessible at `http://localhost:3000`.

## Key Features

1. **Clean Architecture**: The project is implemented using Clean Architecture principles, ensuring separation of layers and enhancing maintainability and scalability.

2. **CQRS**: The Command Query Responsibility Segregation (CQRS) pattern is implemented, enabling better scalability and separation of read and write operations.

3. **Swagger**: API documentation is generated using Swagger, making it easy to test and explore the API.

4. **Validation**: Input data validation is handled using `class-validator`, ensuring data integrity and security.

5. **Testing**: Unit and integration tests are written using Jest, ensuring code reliability and correctness.

6. **Default User Management**: A service for creating and managing a default user is included, simplifying initial API usage during development.

7. **TypeScript**: The entire project is written in TypeScript, providing type safety and reducing potential bugs.

## Highlights

1. **Scalable Architecture**: The project structure is designed to facilitate easy development and addition of new features.

2. **Best Practices with NestJS**: Advanced NestJS features such as Dependency Injection, Decorators, and Pipes are utilized.

3. **Testability**: The project structure supports easy test writing and execution.

4. **Automatic Documentation**: Using Swagger, API documentation is automatically generated, streamlining collaboration with front-end developers.

5. **Flexibility**: MongoDB as the database provides high flexibility in data storage.

This project demonstrates the ability to design and implement a scalable, secure, and maintainable API, suitable for large and complex projects.
