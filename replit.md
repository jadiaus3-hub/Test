# Overview

This is a full-stack CRUD application built with Express.js backend and React frontend. The application provides a comprehensive records management system with features like creating, reading, updating, and deleting records. It includes search functionality, filtering capabilities, and a modern UI built with shadcn/ui components. The system is designed to handle generic record entities with fields like name, category, description, status, and priority.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built with React and TypeScript, using modern development practices:

- **UI Framework**: React with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

The frontend follows a component-based architecture with clear separation between:
- Pages (main route components)
- Components (reusable UI elements)
- Layout components (header, navigation)
- Feature-specific components (records management)

## Backend Architecture

The backend uses Express.js with TypeScript:

- **Framework**: Express.js for RESTful API
- **Type Safety**: TypeScript throughout the application
- **API Design**: RESTful endpoints for CRUD operations
- **Data Storage**: Abstracted storage interface with in-memory implementation
- **Validation**: Zod schemas for request/response validation
- **Development**: Hot reloading with tsx and Vite integration

The backend implements a clean architecture pattern with:
- Routes layer for HTTP endpoint handling
- Storage abstraction for data persistence
- Shared schemas for type consistency between frontend and backend

## Data Storage Solutions

The application uses a flexible storage architecture:

- **Database**: PostgreSQL configured with Drizzle ORM
- **Connection**: Neon Database serverless PostgreSQL
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Fallback Storage**: In-memory storage implementation for development
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple

The storage layer is abstracted through an interface, allowing easy swapping between different implementations (in-memory for development, PostgreSQL for production).

## Authentication and Authorization

Currently, the application has placeholder user management functionality in the storage layer, indicating future authentication implementation. The session management infrastructure is already in place with PostgreSQL-backed sessions.

## Development and Build Pipeline

- **Development**: Concurrent frontend (Vite) and backend (tsx) development servers
- **Type Checking**: Shared TypeScript configuration across client, server, and shared modules
- **Build Process**: Vite builds the frontend, esbuild bundles the backend
- **Code Quality**: ESModules throughout, strict TypeScript configuration

The monorepo structure allows for shared type definitions and schemas between frontend and backend, ensuring consistency across the full stack.

# External Dependencies

## Core Framework Dependencies
- **Express.js**: Backend web framework for RESTful API
- **React**: Frontend UI library with TypeScript support
- **Vite**: Build tool and development server for the frontend

## Database and ORM
- **Drizzle ORM**: Type-safe database ORM for PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## UI and Styling
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Headless UI components for accessibility and functionality
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

## State Management and Data Fetching
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **Wouter**: Lightweight routing library for React

## Validation and Type Safety
- **Zod**: Runtime type validation and schema definition
- **TypeScript**: Static type checking across the entire application
- **@hookform/resolvers**: Integration between React Hook Form and Zod

## Development Tools
- **tsx**: TypeScript execution for Node.js development
- **esbuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration

## Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional CSS class name utility
- **class-variance-authority**: Type-safe variant API for styling
- **nanoid**: Unique ID generation