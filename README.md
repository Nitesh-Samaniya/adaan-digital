# Adaan Digital User-Profile Aplication

### API doc link: https://adaan-digital.onrender.com/docs/
### Application : https://adaan-digital.vercel.app/login

This project is a full stack implementation for an user to onBoard, view and update their profile.Backend includes User authentication with jwt token.The backend is built using Node.js, Express, and MongoDB, with API documentation provided via Swagger. Frontend built with React and Chakra-UI.

## Installation for backend

1. Clone the repository:
    ```bash
    git clone https://github.com/Nitesh-Samaniya/adaan-digital.git
    ```

2. Install dependencies:
    ```bash
    cd server
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables:
    ```plaintext
    PORT=8080
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```



- **MongoDB**: This project uses MongoDB as the database. Ensure you have a MongoDB instance running and provide the connection string in the `.env` file.
- **JWT**: Used for user authentication. Add your JWT secret in the `.env` file.

## Usage

## API Documentation

Swagger is used to document the API, uncomment the code in swagger.js and comment the deploy url and https.

1. To autogenerate swagger doc
    ```bash
    node swagger.js
    ```

2. Start the server:
    ```bash
    npm run dev
    ```

3. The server will be running at `http://localhost:8080`.

## To run frontend locally

    1. Install dependencies:
    ```bash
    cd client
    npm install
    ```

    2. npm run start


## Author
- [@Nitesh-Samaniya](https://github.com/Nitesh-Samaniya)
