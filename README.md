# AntD NextJS App

A responsive web application built with Next.js and Ant Design featuring theme switching, authentication flows, and a user dashboard.

## Features

- **Authentication System**: Complete login, signup, forgot password, and reset password flows
- **Theme Switching**: Toggle between light and dark themes with persistent settings
- **Responsive Design**: Fully responsive layout for both desktop and mobile devices
- **Protected Routes**: Dashboard page accessible only to authenticated users
- **User Dashboard**: Shows user profile and statistics

## Tech Stack

- Next.js 14 (App Router)
- Ant Design (antd)
- TypeScript
- Tailwind CSS
- React Hooks

## Pages

- `/` - Home page with app introduction
- `/login` - User login page
- `/signup` - User registration page
- `/forgot-password` - Password reset request page
- `/reset-success` - Password reset confirmation page
- `/dashboard` - User dashboard (protected route)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Components

- **Theme Context**: Manages theme state (light/dark) and persists in localStorage
- **Navigation Component**: Responsive navigation bar with user dropdown
- **Protected Route**: Higher-order component for route protection
- **Authentication Utilities**: Mock authentication functions for login/signup

## Authentication Flow

The app simulates authentication by storing a mock JWT token in localStorage. In a production environment, this would connect to a backend API.

## Responsive Design

The application uses Ant Design's responsive grid system and includes custom CSS media queries to ensure optimal viewing experience across different screen sizes.