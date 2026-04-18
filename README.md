# Sannaliya E-commerce Platform

A comprehensive e-commerce website for Sannaliya, specializing in casual wear, office wear, and accessories.

## Features
- **Frontend**: React JS with Tailwind CSS and Material UI.
- **Backend**: Spring Boot with MongoDB.
- **Security**: JWT-based authentication and authorization.
- **Real-time**: WebSocket integration for order notifications.
- **Delivery**: District-based delivery charge calculation (Sri Lanka).
- **Multi-language**: Support for English and Sinhala.

## Setup Instructions

### Prerequisites
- Java 21+
- Node.js 22+
- MongoDB

### Running the Backend
1. Navigate to the `backend` directory.
2. Configure MongoDB in `src/main/resources/application.properties`.
3. Run `mvn spring-boot:run`.
4. Initial admin account: `admin@sannaliya.com` / `admin123`.

### Running the Frontend
1. Navigate to the `frontend` directory.
2. Run `npm install`.
3. Run `npm run dev`.

## Delivery Charges
- **Zone 1 (LKR 450 + 100/kg)**: Colombo, Gampaha, Kaluthara, Galle, Matara, Kegalle.
- **Zone 2 (LKR 500 + 100/kg)**: All other districts.
