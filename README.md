# Energi og miljø nettside

This repository is the repository for EmilNTNU.no. It is a [Next.js](https://nextjs.org/) application that uses prisma for database management with a PostgreSQL database and firebase for dynamic file storage. This document gives an introduction to how to get started with development.

## Table of Contents

- [About](#about)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [Technologies Used](#technologies-used)

---

## About

This project is a Next.js application designed as a student organisational website. The app includes authentication, reusable components, and organized modules. As this is a next.js project it suuports dynamic routing through the app-folder. This is where the route of the project lies with each page containing it's own page.tsx and occasionally layout.tsx file.

This project is made by [Maria Wembstad](https://github.com/MariaWembstad), [Nicolai Faye](https://github.com/nicohfaye), [Emil Lunde Bakke](https://github.com/emillub) and [Mauritz Skogøy](https://github.com/Mauritzskog) for the ownership and usage of Energi og Miljøstudentenes linjeforening, represented by [Trubadur](https://github.com/EMIL-Trubadur). For any issues, questions and other inqueries feel free to contact of the developers as they are responsible for functionality untill summer 2026.

---

## Project Structure

The project files are organized as follows:

```
src/
├── app/                # Application entry points and page components
│   ├── layout.tsx      # Root layout for all pages
│   ├── page.tsx        # Default page component
│   └── globals.css     # Global CSS styles
├── components/         # Reusable UI components
├── data/               # Static and dynamic data definitions
├── hooks/              # Custom React hooks for shared logic
├── lib/                # Shared libraries or utilities
├── schemas/            # Type and schema definitions for data validation
├── static/             # Static assets such as images
├── tests/              # Unit and integration tests
├── types/              # TypeScript custom types
└── utils/              # General utility functions
```

### Key Files

- **`auth.ts`**: Manages authentication logic.
- **`routes.ts`**: Defines application routes and related logic.
- **`middleware.ts`**: Includes middleware functions for server-side processing.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or newer)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/emil-webkom/webapp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd webapp
   ```

3. Navigate to the frontend directory:

   ```bash
   cd ./frontend
   ```

4. Install the dependencies:

   ```bash
   npm install
   ```

5. Run the application in development mode:
   ```bash
   npm run dev
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Scripts

- `npm run dev`: Runs the application in development mode.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production build.
- `npm run test`: Runs the test suite. As the backend is quite simple, the project consisted in large parts of exploratory testing and ther are not a lot of written test except for some backend functions.

---

## Configuration

Configuration files are located in the `config/` directory. Update these files to change the application's settings.

---

## Technologies Used

- **Next.js**: React framework for server-rendered applications.
- **TypeScript**: Static typing for JavaScript.
- **NextAuth.js**: Authentication for Next.js.
- **Prisma**: Database toolkit and ORM.
- **React Query**: Data fetching and state management.
- **Radix UI**: Accessible and customizable UI primitives.
- **React Hook Form**: Form handling in React.
- **Tailwind CSS**: Utility-first CSS framework.
