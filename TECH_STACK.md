# AI Travel Planner - Technical Stack Documentation

## Core Technologies

### Frontend Framework

- **Next.js 15.3.1**: A React framework for building full-stack web applications
  - Features server-side rendering (SSR) and static site generation (SSG)
  - Built-in API routes and server components
  - Uses Turbopack for faster development experience

### UI Framework and Styling

- **React 19.0.0**: JavaScript library for building user interfaces
- **Tailwind CSS 4**: Utility-first CSS framework for rapid UI development
- **Framer Motion 12.7.4**: Animation library for React
- **Radix UI**: Unstyled, accessible components for building high‑quality design systems
  - Includes components like Accordion, Dialog, Popover, Tabs, and more
- **Lucide React**: Beautiful & consistent icons
- **Sonner**: Toast notifications
- **Embla Carousel**: Carousel/slider component
- **React Day Picker**: Date picker component

### State Management & Data Fetching

- **Zustand 5.0.3**: Lightweight state management
- **TanStack Query (React Query) 5.74.4**: Data fetching and caching library
- **React Hook Form 7.56.0**: Form handling with validation
- **Zod 3.24.3**: TypeScript-first schema validation

### Backend & API

- **Hono 4.7.7**: Fast, lightweight web framework
- **Prisma 6.6.0**: Next-generation ORM
  - Type-safe database queries
  - Database migrations and schema management
- **Clerk**: Authentication and user management
  - Backend SDK (@clerk/backend)
  - Next.js integration (@clerk/nextjs)

### AI & External Services

- **Google AI (Gemini)**: AI integration for travel planning
  - @google/genai
  - @google/generative-ai
- **Google Maps Services**: Location and mapping features
  - @googlemaps/google-maps-services-js
  - react-google-places-autocomplete

### Development Tools

- **TypeScript 5**: Static type checking
- **ESLint 9**: Code linting
- **PNPM 10.6.5**: Package manager
- **Turbopack**: Next.js development server

### Additional Libraries

- **date-fns 4.1.0**: Date utility functions
- **class-variance-authority**: Class name management
- **clsx**: Conditional class name utility
- **tailwind-merge**: Tailwind CSS class merging
- **zod-prisma-types**: Type generation for Prisma schemas

## Development Environment

- **Node.js**: JavaScript runtime
- **TypeScript**: For type safety and better developer experience
- **ESLint**: For code quality and consistency
- **Tailwind CSS**: For styling and responsive design

## Database

- **Prisma ORM**: Database toolkit and ORM
  - Supports multiple databases (PostgreSQL, MySQL, SQLite, etc.)
  - Type-safe database queries
  - Schema migrations

## Authentication & Security

- **Clerk**: Complete authentication solution
  - User management
  - Social login
  - Session management
  - Security features

## Deployment & Infrastructure

- The application is built to be deployed on modern cloud platforms
- Supports both development and production environments
- Includes build optimization and performance features

## Notable Features

- Full-stack TypeScript implementation
- Modern React patterns with Server Components
- Responsive and accessible UI components
- AI-powered travel planning
- Real-time location services
- Secure authentication system
- Type-safe database operations
