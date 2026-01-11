# UIDAI Analytics Dashboard

## Overview

This is a government analytics dashboard for UIDAI (Unique Identification Authority of India) that displays Aadhaar enrollment metrics, demographic data, and biometric trends. The application provides data visualization through interactive charts and role-based perspectives for different user types (Government Officials, Citizens, and Admins).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui built on Radix UI primitives
- **Styling**: Tailwind CSS with custom government-themed color palette
- **Charts**: Recharts for data visualization (bar, line, pie, area charts)
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Style**: RESTful endpoints defined in shared routes
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Validation**: Zod with drizzle-zod integration

### Project Structure
```
├── client/          # React frontend application
│   └── src/
│       ├── components/   # UI components (shadcn/ui + custom)
│       ├── pages/        # Route pages (Dashboard, MetricDetail)
│       ├── hooks/        # Custom React hooks
│       └── lib/          # Utilities and query client
├── server/          # Express backend
│   ├── routes.ts    # API route handlers
│   ├── storage.ts   # Data access layer
│   └── db.ts        # Database connection
├── shared/          # Shared types and schemas
│   ├── schema.ts    # Drizzle database schema
│   └── routes.ts    # API route definitions with Zod validation
└── migrations/      # Drizzle database migrations
```

### Data Flow
1. Shared schema defines database tables and TypeScript types
2. Shared routes define API endpoints with request/response schemas
3. Server implements routes using storage layer
4. Client uses React Query hooks to fetch data from API
5. Components render data with Recharts visualizations

### Key Design Patterns
- **Shared Types**: Schema and route definitions shared between frontend and backend
- **Type-Safe API**: Zod schemas validate responses on both sides
- **Component Library**: shadcn/ui provides accessible, customizable components
- **Memory + Database Storage**: Storage interface supports both in-memory (development) and PostgreSQL (production)

## External Dependencies

### Database
- **PostgreSQL**: Primary database via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database toolkit for TypeScript with PostgreSQL adapter
- **connect-pg-simple**: PostgreSQL session storage for Express

### Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **recharts**: Chart library for data visualization
- **framer-motion**: Animation library
- **lucide-react**: Icon library
- **date-fns**: Date utility library

### UI Framework
- **Radix UI**: Headless UI primitives (dialogs, dropdowns, tooltips, etc.)
- **class-variance-authority**: Variant-based component styling
- **tailwind-merge**: Tailwind class merging utility

### Build and Development
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **tsx**: TypeScript execution for development