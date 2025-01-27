# Online Store API

## Project Structure

The project consists of the following modules:

1. **AppModule**: The main module that connects all other modules.
2. **ProductModule**: Manages products, including creating, updating, deleting, and retrieving product information.
3. **PurchaseModule**: Handles purchases and orders.
4. **UserModule**: Manages users and authentication.
5. **SharedModule**: Contains shared services and components used across other modules.

## How to Run the Project

1. Ensure that Node.js and MongoDB are installed on your system.

2. Clone the repository:

   ```bash
   git clone https://github.com/daniel3380rm/microservice-nestjs-cqrs
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project and add the following environment variables:

   ```env
   MONGODB_URI=mongodb://localhost:27017/online-store
   ```

5. Start the project:

   ```bash
   npm run start:dev
   yarn run start:dev
   ```

6. The API will now be available at `http://localhost:3000`.

## Key Features

1. **Clean Architecture**: The project is implemented using Clean Architecture principles, ensuring separation of layers and improved maintainability and scalability.

2. **CQRS**: The Command Query Responsibility Segregation (CQRS) pattern is implemented, enabling better scalability and separation of read and write operations.

3. **Swagger**: API documentation is provided using Swagger, allowing for easy testing and review of the API.

4. **Validation**: Input data is validated using `class-validator`, ensuring data integrity and security.

5. **Testing**: Unit and integration tests are written using Jest, providing confidence in code functionality.

6. **Automatic Default User Management**: A service is included to create and manage a default user, making it easier to work with the API during the initial stages of development.

7. **TypeScript**: The project is written entirely in TypeScript, enabling safer and more reliable development.

## Highlights

1. **Scalable Architecture**: The project structure is designed to support easy development and the addition of new features.

2. **NestJS Best Practices**: Advanced NestJS features such as Dependency Injection, Decorators, and Pipes are utilized.

3. **Testability**: The project structure simplifies writing and executing tests.

4. **Automatic Documentation**: Swagger generates API documentation automatically, making it easier for front-end developers to interact with the API.

5. **Flexibility**: MongoDB is used as the database, providing high flexibility for data storage.

This project demonstrates the ability to design and implement a scalable, secure, and maintainable API that can be used for large and complex projects.

