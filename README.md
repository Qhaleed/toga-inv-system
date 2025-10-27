# Toga Inventory System

A modern web application for managing university toga rental inventory built with React and Node.js.

## Tech Stack

**Frontend:**
- React 18 + Vite
- React Query (TanStack Query) for data fetching
- React Router for navigation
- Tailwind CSS for styling

**Backend:**
- Node.js + Express
- Supabase (PostgreSQL)
- JWT Authentication

## Quick Start

### 1. Backend Setup

```sh
cd backend
npm install
node server.js
```

The backend server will run on `http://localhost:5001`

**Required Environment Variables** (create `.env` file):
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SECRET_KEY=your_jwt_secret
PORT=5001
```

### 2. Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## Features

- 🔐 **Authentication**: JWT-based login for admins and students
- 📋 **Pending Page**: Approve/reject student registrations
- 📦 **Inventory Management**: Track toga items (gowns, hoods, tassels, caps)
- 📅 **Reservation System**: Manage toga rentals and returns
- 🔍 **Search**: Fast client-side search across all pages
- ✅ **Evaluation**: Assess returned items for damage/repair
- 📊 **Dashboard**: Real-time statistics and reports

## Project Structure

```
toga-inv-system/
├── backend/
│   ├── database/
│   │   └── db.js              # Supabase connection
│   ├── routes/
│   │   ├── accounts.js
│   │   ├── auth.js
│   │   ├── inventory.js
│   │   ├── items.js
│   │   ├── evaluation.js
│   │   └── ...
│   ├── .env                   # Environment variables
│   ├── server.js              # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── lib/
│   │   │   ├── api.js         # API functions
│   │   │   ├── queryClient.js # React Query config
│   │   │   └── utils.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Default Credentials

Use these to log in after setup:

**Admin Account:**
- Email: admin@toga.edu
- Password: admin2024

**Student Account:**
- Email: student@toga.edu
- Password: student123
