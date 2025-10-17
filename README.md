# Dockerized Node Starter

A modern, containerized web application starter built with Next.js, TypeScript, and Tailwind CSS. This project provides a solid foundation for building full-stack applications, complete with API routes, a clean UI, and a full Docker-based development and deployment workflow.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [Shadcn/ui](https://ui.shadcn.com/)
- **Testing**: [Jest](https://jestjs.io/) & [Supertest](https://github.com/ladjs/supertest) for API endpoint testing
- **Containerization**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## Project Structure

The project follows the standard Next.js App Router structure. Key files and directories include:

```
.
├── Dockerfile              # For building the production Docker image
├── docker-compose.yml      # For running the app with Docker Compose
├── .dockerignore           # Specifies files to ignore in Docker builds
├── .env.example            # Example environment variables
├── jest.config.ts          # Jest test runner configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── README.md               # This file
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── health/
│   │   │   │   └── route.ts  # Health check endpoint
│   │   │   ├── items/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts # CRUD ops for a single item
│   │   │   │   └── route.ts   # GET and POST for items
│   │   │   └── route.ts      # Root API endpoint
│   │   ├── globals.css     # Global styles & theme
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main landing page
│   ├── components
│   └── lib
└── tests
    └── api.test.ts         # API tests
```

---

## Getting Started

### 1. Local Development

To run the application on your local machine, follow these steps:

1.  **Clone the repository** (if you haven't already).

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Create an environment file**:
    Copy the example environment file to create your local configuration.
    ```bash
    cp .env.example .env
    ```
    You can customize the `PORT` in `.env` if needed.

4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002` (or your configured port). The Next.js dev server supports hot-reloading.

### 2. Running Tests

This project uses Jest and Supertest for integration testing the API endpoints.

**Important**: The tests run against the live development server. Please ensure the dev server is running (`npm run dev`) in a separate terminal before executing the tests.

```bash
npm test
```

## API Endpoints

You can interact with the API endpoints using `curl` or any API client. The development server runs on port 9002.

- **Root API Endpoint**:
  ```bash
  curl http://localhost:9002/api
  ```
  Expected Response:
  ```json
  {"ok":true,"msg":"Hello from Node"}
  ```

- **Health Check Endpoint**:
  ```bash
  curl http://localhost:9002/api/health
  ```
  Expected Response:
  ```json
  {"status":"healthy"}
  ```

- **In-Memory CRUD API Endpoints**:
  - **GET all items**:
    ```bash
    curl http://localhost:9002/api/items
    ```
  - **POST a new item**:
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"name":"My New Item"}' http://localhost:9002/api/items
    ```
  - **GET a single item by ID**:
    ```bash
    curl http://localhost:9002/api/items/1
    ```
  - **PUT (update) an item by ID**:
    ```bash
    curl -X PUT -H "Content-Type: application/json" -d '{"name":"Updated Name"}' http://localhost:9002/api/items/1
    ```
  - **DELETE an item by ID**:
    ```bash
    curl -X DELETE http://localhost:9002/api/items/1
    ```

## Containerization with Docker

The application is configured for production-ready containerization.

### 1. Build the Docker Image

Build the image using the provided `Dockerfile`.

```bash
docker build -t dockerized-node-starter .
```

### 2. Run with Docker

Run the container, mapping the port and providing the environment file.

```bash
docker run -p 3000:3000 --env-file .env.example --name node-starter-app dockerized-node-starter
```
The application will be accessible at `http://localhost:3000`.

### 3. Run with Docker Compose

For a more streamlined experience, use the `docker-compose.yml` file. This is the recommended method for running the containerized application.

```bash
docker-compose up --build
```
To run in detached mode, add the `-d` flag:
```bash
docker-compose up --build -d
```
To stop the services:
```bash
docker-compose down
```

## Troubleshooting

- **Port Already in Use**: If you get an error like `Error: listen EADDRINUSE: address already in use :::3000`, it means another process is using that port.
  - **Solution**: Stop the process using the port, or change the `PORT` in your `.env` file (for local dev) or `docker-compose.yml` (for Docker). For example, change `ports: - "3001:3000"` in `docker-compose.yml` to map to host port 3001.

- **Docker Health Check Failing**: If the container keeps restarting, check the container logs with `docker logs <container_name>`. The health check (`/api/health`) might be failing. Ensure the application starts correctly.
