# Overview

Keane Site Services is a premium single-page marketing website built with React, TypeScript, and Tailwind CSS. The site showcases professional site clear-out and groundwork services with an industrial aesthetic combined with Apple-level polish. The application features a full-viewport hero video background, responsive design, and accessibility-compliant implementation focused on converting visitors into customers through clear calls-to-action.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Styling**: Tailwind CSS with custom CSS variables for brand theming, utilizing a mobile-first responsive approach
- **Component Library**: Radix UI primitives with shadcn/ui component system for accessible, customizable UI components
- **State Management**: React hooks for local state management, React Query for server state and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Server Framework**: Express.js with TypeScript for type-safe server development
- **Development Setup**: Hot module replacement and runtime error overlay for enhanced developer experience
- **API Structure**: RESTful API design with modular route organization
- **Session Management**: Connect-pg-simple for PostgreSQL-backed session storage

## Data Storage
- **Database**: PostgreSQL with Neon serverless deployment for scalability
- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Schema Definition**: Centralized schema definitions in shared directory for consistency between client and server
- **Migration System**: Drizzle Kit for database migrations and schema synchronization

## Design System
- **Brand Colors**: Industrial orange (#F15A29), charcoal blacks, and metallic grays for premium industrial aesthetic
- **Typography**: Inter font family with system font fallbacks for consistent cross-platform rendering
- **Component Theming**: CSS custom properties for consistent theming across components
- **Accessibility**: WCAG AA compliance with focus management, reduced motion support, and semantic HTML

## Performance Optimizations
- **Asset Loading**: Lazy loading for non-critical assets, preconnect hints for external resources
- **Video Handling**: Compressed video with poster frames, respects prefers-reduced-motion
- **SEO**: Complete meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- **Core Web Vitals**: Optimized for mobile performance metrics

# External Dependencies

## Development Tools
- **Vite**: Build tool and development server with hot reload capabilities
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast bundling for production builds
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer

## UI Framework
- **Radix UI**: Headless UI primitives for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for creating variant-based component APIs

## Database & Backend
- **Neon Database**: Serverless PostgreSQL database platform
- **Drizzle ORM**: Type-safe ORM for database operations
- **Express.js**: Web framework for API development
- **Connect-pg-simple**: PostgreSQL session store for Express

## Form & Validation
- **React Hook Form**: Performant forms with minimal re-renders
- **Hookform Resolvers**: Validation schema integration
- **Zod**: TypeScript-first schema validation

## Development Experience
- **Replit Integration**: Runtime error modal and cartographer for enhanced debugging
- **React Query**: Server state management and caching
- **Date-fns**: Date manipulation utilities

## Asset Management
- **Video Assets**: Construction site aerial loop video for hero background
- **Brand Assets**: Company logo and favicon generation
- **Image Optimization**: Responsive image handling with appropriate formats