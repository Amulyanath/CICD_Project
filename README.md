# Full-Stack Task Management Platform

A full-stack task management application built with **React + Spring Boot + MySQL**, with containerized deployment using **Docker Compose** and local orchestration using **Kubernetes**. The repository also includes a GitHub Actions CI workflow for backend tests/builds and frontend builds.

## Architecture

```text
React + Vite
     |
     v
Nginx / Docker
     |
     v
Spring Boot REST API
     |
     v
MySQL
```

For Kubernetes, the application is split into frontend, backend, and MySQL workloads in the `task-app` namespace.

## Features

- User registration and login
- BCrypt password hashing
- Create tasks
- Assign priority and category
- Mark tasks complete/incomplete
- Delete completed tasks
- REST API with Spring Boot
- MySQL persistence through Spring Data JPA
- React frontend with Vite
- Docker multi-stage builds
- Docker Compose orchestration
- Kubernetes Deployments and Services
- GitHub Actions CI for backend and frontend

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Axios, React Router |
| Backend | Java 17, Spring Boot 3.5, Spring Web, Spring Data JPA |
| Security | Spring Security, BCrypt |
| Database | MySQL 8 |
| Containers | Docker, Docker Compose, Nginx |
| Orchestration | Kubernetes |
| CI | GitHub Actions |

## Repository Structure

```text
.
├── ProjectCICD/                 # Spring Boot backend
├── task-manager/                # React frontend
├── Docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   ├── docker-compose.yml
│   ├── nginx.conf
│   └── .env.example
├── Kubernetes/
│   ├── mysql.yaml
│   ├── backend.yaml
│   └── frontend.yaml
└── .github/
    └── workflows/
        └── ci.yml
```

## Run Locally

### Backend

Create `ProjectCICD/.env` from `ProjectCICD/.env.example` and provide a local MySQL password.

```bash
cd ProjectCICD
./mvnw spring-boot:run
```

The backend runs on `http://localhost:8082` by default.

### Frontend

```bash
cd task-manager
npm ci
npm run dev
```

The local Vite development server uses the backend URL from `VITE_API_URL`, defaulting to `http://localhost:8082`.

## Docker Compose

Copy the Docker environment template:

```bash
cp Docker/.env.example Docker/.env
```

Set a real database password in `Docker/.env`, then run from the repository root:

```bash
docker compose --env-file Docker/.env -f Docker/docker-compose.yml up --build
```

The Compose setup provides:

- Frontend: `http://localhost`
- Backend: `http://localhost:8081`
- MySQL: `localhost:3308`

The browser talks to the backend through the Nginx `/api/` reverse proxy inside the frontend container.

## Kubernetes

The manifests are designed for a local Kubernetes/Minikube workflow and use locally built images.

Build the images in the Minikube Docker environment, then apply the manifests:

```bash
kubectl apply -f Kubernetes/mysql.yaml
kubectl apply -f Kubernetes/backend.yaml
kubectl apply -f Kubernetes/frontend.yaml
```

Check the deployment:

```bash
kubectl get pods -n task-app
kubectl get services -n task-app
```

The frontend Service uses NodePort `30080`.

> The Kubernetes manifests use `imagePullPolicy: Never` because they are intended for local images in a Minikube-style environment. For a cloud deployment, the images should be pushed to a container registry and the image references should be changed accordingly.

## Continuous Integration

GitHub Actions runs on pushes and pull requests to `main`.

The workflow:

1. Checks out the repository.
2. Sets up Java 17 and runs backend tests.
3. Packages the Spring Boot backend.
4. Sets up Node.js 20.
5. Installs frontend dependencies with `npm ci`.
6. Builds the React application.

Workflow file: `.github/workflows/ci.yml`

## Security Notes

- Database credentials are supplied through environment variables rather than committed passwords.
- `.env` files are ignored by Git; `.env.example` files provide templates.
- User passwords are hashed with BCrypt before storage.
- The current application is a portfolio/academic project and is not presented as production-grade authentication or authorization.

## Future Improvements

- Add JWT-based authentication and endpoint-level authorization.
- Add automated integration tests against a disposable MySQL instance.
- Publish versioned Docker images to a registry.
- Replace local Kubernetes image references with registry-backed images for cloud deployment.
- Add persistent Kubernetes storage for MySQL.
- Add observability with application metrics and centralized logs.
