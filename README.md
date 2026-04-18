# Sannaliya E-commerce Platform

A comprehensive e-commerce website for Sannaliya, specializing in casual wear, office wear, and accessories.

## Features
- **Frontend**: React JS with Tailwind CSS and Material UI.
- **Backend**: Spring Boot with MongoDB.
- **Security**: JWT-based authentication and authorization.
- **Real-time**: WebSocket integration for order notifications.
- **Delivery**: District-based delivery charge calculation (Sri Lanka).
- **Interactive Map**: Interactive Sri Lanka map for district selection.
- **Audit Logs**: Comprehensive logging of system and admin actions.
- **Docker**: Full containerization for easy deployment.

## Setup Instructions

### Prerequisites
- Docker and Docker Compose

### Running the Full System
1. Navigate to the root directory.
2. Run `docker-compose up --build`.
3. The frontend will be available at `http://localhost`.
4. The backend API will be available at `http://localhost:8080`.

### Initial Credentials
- **Admin Email**: `sannaliya98@gmail.com`
- **Admin Password**: `Admin@sannaliya.lk`

## Delivery Charges
- **Zone 1 (LKR 450 + 100/kg)**: Colombo, Gampaha, Kalutara, Galle, Matara, Kegalle.
- **Zone 2 (LKR 500 + 100/kg)**: All other districts.

## MongoDB Samples
See `MONGODB_SAMPLES.md` for example data structures.
