# Science 1B - St. John's Grammar SHS, Achimota

A full-stack class magazine/portfolio website for Science 1B students.

## Tech Stack

- **Frontend**: Next.js (React + TypeScript), TailwindCSS, Framer Motion
- **Backend**: Node.js + Express + PostgreSQL
- **Testing**: Jest + Playwright
- **Code Quality**: Prettier + ESLint (Airbnb rules)
- **Deployment**: Frontend on Netlify, Backend on Render

## Project Structure

```
science-1b-website/
├── frontend/          # Next.js frontend application
├── backend/           # Node.js + Express backend API
├── docs/             # Documentation and deployment guides
└── package.json      # Root package.json for workspace management
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` files in both frontend and backend directories
   - Fill in the required values

4. Set up the database:
   ```bash
   cd backend
   npm run db:setup
   ```

5. Start development servers:
   ```bash
   npm run dev
   ```

This will start both frontend (http://localhost:3000) and backend (http://localhost:5000) servers.

## Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both applications for production
- `npm run test` - Run all tests
- `npm run lint` - Lint all code
- `npm run format` - Format all code with Prettier

## Deployment

See `docs/deployment.md` for detailed deployment instructions for Netlify and Render.

## Features

- 🏠 **Home Page**: Class introduction with hero banner animation
- 📖 **About Page**: Class history, achievements, and profile
- 🖼️ **Gallery**: Image and video showcase with animations
- 📝 **Articles/Blog**: Student posts and news
- 📧 **Contact Page**: Contact form with email functionality

## Contributing

1. Follow the ESLint and Prettier configurations
2. Write tests for new features
3. Ensure all tests pass before submitting PRs
