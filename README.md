<div align="center">

```
██████╗ ███████╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗
██╔══██╗██╔════╝██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝╚════██║
██║  ██║█████╗  ██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗      ██╔╝
██║  ██║██╔══╝  ██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝     ██╔╝ 
██████╔╝███████╗██║     ███████╗╚██████╔╝   ██║   ███████╗   ██║  
╚═════╝ ╚══════╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝   ╚═╝  
```

### 🚀 Your Own Deployment Platform — Like Vercel, But Yours.

[![Made with MERN](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-blue?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![Redis](https://img.shields.io/badge/Cache-Redis-red?style=for-the-badge&logo=redis)](https://redis.io/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-Pipeline-orange?style=for-the-badge&logo=githubactions)](https://github.com/features/actions)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

</div>

---

## 📖 What is DeployEZ?

**DeployEZ** is a simplified DevOps Deployment Platform that lets developers connect their GitHub repositories, deploy applications with one click, manage environment variables, view real-time logs, and roll back to previous versions — all from a single dashboard.

Think of it as your own **Render + Vercel**, built from scratch using the MERN Stack, Docker, Redis, and a full CI/CD Pipeline.

> Built at Hackathon 2026 by a team of 4 passionate full-stack developers.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔗 **Repository Connect** | Connect your GitHub repos directly to DeployEZ |
| 🚀 **One-Click Deploy** | Deploy any Node.js / React app instantly |
| 🔐 **Environment Variables** | Securely manage `.env` variables per project |
| 📋 **Real-time Logs** | View live deployment and runtime logs |
| ⏪ **Version Rollback** | Roll back to any previous deployment in one click |
| ⚡ **Redis Caching** | Blazing fast responses with Redis-powered caching |
| 🐳 **Docker Isolation** | Every app runs in its own Docker container |
| 🔄 **CI/CD Pipeline** | Automated build, test, and deploy on every push |

---

## 🛠️ Tech Stack

### Frontend
- **React.js** — UI Framework
- **Tailwind CSS** — Styling
- **Axios** — API calls
- **React Router** — Navigation

### Backend
- **Node.js + Express.js** — REST API Server
- **MongoDB + Mongoose** — Database
- **Redis (ioredis)** — Caching & Session Management
- **JWT** — Authentication
- **Cookie Parser** — Cookie Management

### DevOps & Infrastructure
- **Docker** — Containerization — every deployment runs in isolation
- **Docker Compose** — Multi-container orchestration
- **GitHub Actions** — CI/CD Pipeline
- **MongoDB Atlas** — Cloud Database

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT (React)                      │
│              Dashboard | Logs | Settings                 │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP / WebSocket
┌──────────────────────────▼──────────────────────────────┐
│                  EXPRESS.JS REST API                     │
│         Auth | Deploy | Logs | Env | Rollback           │
└────────┬──────────────────────────────┬─────────────────┘
         │                              │
┌────────▼────────┐          ┌──────────▼──────────┐
│    MongoDB      │          │       Redis          │
│  (Persistent    │          │  (Cache + Sessions)  │
│    Storage)     │          └─────────────────────┘
└─────────────────┘
         │
┌────────▼──────────────────────────────────────────────┐
│                  DOCKER ENGINE                         │
│   [Container 1]  [Container 2]  [Container 3]  ...    │
│   User App 1     User App 2     User App 3            │
└───────────────────────────────────────────────────────┘
         │
┌────────▼──────────────────────────────────────────────┐
│              CI/CD PIPELINE (GitHub Actions)           │
│     Push → Build → Test → Dockerize → Deploy          │
└───────────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
DeployEZ/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js           # MongoDB connection
│   │   │   └── redis.js        # Redis connection
│   │   ├── controllers/        # Request handlers
│   │   ├── services/           # Business logic
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # API routes
│   │   ├── middlewares/        # Auth, error handling
│   │   └── app.js              # Express app setup
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── features/           # Feature-based structure
│   │   │   ├── auth/
│   │   │   ├── deploy/
│   │   │   ├── logs/
│   │   │   └── settings/
│   │   ├── shared/
│   │   │   └── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .gitignore
│   └── Dockerfile
│
├── docker-compose.yml
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) or MongoDB Atlas account
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/) + Docker Compose
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/DeployEZ.git
cd DeployEZ
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file in `Backend/`:

```env
PORT=8080
MONGO_URI=your_mongodb_atlas_uri
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_super_secret_key
```

Start backend:

```bash
npx nodemon server.js
```

### 3. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

### 4. Run with Docker Compose (Recommended)

```bash
# From root folder
docker-compose up --build
```

This starts:
- ✅ Backend on `http://localhost:8080`
- ✅ Frontend on `http://localhost:5173`
- ✅ MongoDB on port `27017`
- ✅ Redis on port `6379`

---

## 🔄 CI/CD Pipeline

Every push to `main` branch triggers:

```
Push to main
    ↓
GitHub Actions triggered
    ↓
Install dependencies + Run tests
    ↓
Build Docker image
    ↓
Push to Docker Hub
    ↓
Deploy to server
    ↓
Health check ✅
```

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |

### Deployments
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/deploy` | Get all deployments |
| POST | `/api/deploy` | Create new deployment |
| DELETE | `/api/deploy/:id` | Delete deployment |
| POST | `/api/deploy/:id/rollback` | Rollback to version |

### Logs
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/logs/:deployId` | Get deployment logs |

### Environment Variables
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/env/:projectId` | Get env variables |
| POST | `/api/env/:projectId` | Add env variable |
| DELETE | `/api/env/:projectId/:key` | Delete env variable |

---

## 👥 Team

| Developer | Role |
|---|---|
| **Mandeep Malakar** | Full Stack Developer |
| **Sravan Kumar**    | Full Stack Developer |
| **Jaya Mehta**      | Frontend Developer   |
| **Mayank Kumar**    | Frontend Developer   |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ at Hackathon 2026**

*DeployEZ — Deploy Anything. Anywhere. EZly.*

</div>