# OAuth2 Authentication Project

This project is a full-stack application that implements authentication and authorization using Google OAuth2 and JSON Web Tokens (JWT). The application consists of three main components:

1. **OAuth2 App**: A React application that serves as the frontend.
2. **OAuth Google**: A Java backend service for Google authentication and authorization, with user data stored in MySQL.
3. **JWT**: A Java backend service for user login and JWT management, with user data stored in MySQL.

## Project Structure

## Components

### 1. OAuth2 App

- **Description**: A React application that allows users to log in using their Google account and interact with the application.
- **Port**: `localhost:3000`
- **Setup**:
  1. Navigate to the `oauth2-app` directory.
  2. Install dependencies:
     ```bash
     npm install
     ```
  3. Start the application:
     ```bash
     npm start
     ```

### 2. OAuth Google

- **Description**: A Java backend service that handles authentication and authorization using Google OAuth2. It manages the OAuth flow and stores user data in a MySQL database.
- **Port**: `localhost:8081`
- **Setup**:
  1. Navigate to the `oauth-google` directory.
  2. Ensure you have Java (version 11 or higher) and Maven installed.
  3. Set up your MySQL database:
     - Create a database (e.g., `oauth_db`).
     - Create a table for storing Google user data.
  4. Update the `application.properties` or `application.yml` file with your MySQL database connection details:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/oauth_db
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     ```
  5. Build the project:
     ```bash
     mvn clean install
     ```
  6. Start the server:
     ```bash
     mvn spring-boot:run
     ```

### 3. JWT

- **Description**: A Java backend service that manages user login and issues JSON Web Tokens (JWT) for authenticated users. It also stores user data in a MySQL database.
- **Port**: `localhost:8080`
- **Setup**:
  1. Navigate to the `JWT` directory.
  2. Ensure you have Java (version 11 or higher) and Maven installed.
  3. Set up your MySQL database:
     - Create a database (e.g., `jwt_db`).
     - Create a table for storing user login data.
  4. Update the `application.properties` or `application.yml` file with your MySQL database connection details:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/jwt_db
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     ```
  5. Build the project:
     ```bash
     mvn clean install
     ```
  6. Start the server:
     ```bash
     mvn spring-boot:run
     ```

## Prerequisites

- Java (version 11 or higher)
- Maven (for building Java projects)
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- MySQL (version 5.7 or higher)
- A Google Cloud project with OAuth 2.0 credentials set up for the OAuth Google backend.

## Configuration

1. **Google OAuth Setup**:
   - Create a project in the [Google Cloud Console](https://console.cloud.google.com/).
   - Enable the Google+ API.
   - Create OAuth 2.0 credentials and set the redirect URI to `http://localhost:3000/auth/google/callback`.
   - Update the credentials in the `oauth-google` backend configuration.


## Usage

1. Start the `oauth-google` backend service.
2. Start the `JWT` backend service.
3. Start the `oauth2-app` frontend application.
4. Navigate to `http://localhost:3000` in your web browser to access the application.


## License
This project is licensed under the MIT License - see the [ LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Google OAuth2](https://developers.google.com/identity/protocols/oauth2)
- [JSON Web Tokens](https://jwt.io/)
- [MySQL](https://www.mysql.com/)
