# 證件浮水印工具 - Replit.md

## Overview

This is a client-side watermark application for documents and images, built with a focus on privacy and security. The application allows users to add watermarks to images entirely within the browser, without uploading files to any server. It's specifically designed for sensitive documents like ID cards and certificates.

The system uses a full-stack TypeScript architecture with React on the frontend and Express.js on the backend, though the watermarking functionality is entirely client-side.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for development and production
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React hooks with custom watermark processing logic
- **Client-side Processing**: HTML5 Canvas for image manipulation and watermark application

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Structure**: RESTful routes with `/api` prefix (currently minimal backend usage)
- **Development**: Hot reload with Vite integration in development mode

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: User management schema defined in shared directory
- **Database**: Configured for PostgreSQL via environment variables
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

## Key Components

### 1. Watermark Processing Engine
- **Location**: `client/src/lib/watermarkProcessor.ts`
- **Purpose**: Handles all image processing operations client-side
- **Features**: Canvas-based image loading, watermark application with customizable settings
- **Security**: All processing happens in browser - no server uploads

### 2. File Upload System
- **Component**: `FileUploadZone.tsx`
- **Features**: Drag-and-drop interface, file type validation (JPEG/PNG only)
- **Security**: Files never leave the client browser

### 3. Watermark Controls
- **Component**: `WatermarkControls.tsx`
- **Settings**: Text content, opacity (0-100%), position (5 options), font size (4 sizes)
- **Real-time**: Live preview updates as settings change

### 4. Canvas Preview System
- **Component**: `CanvasPreview.tsx`
- **Purpose**: Real-time preview of watermarked images
- **Implementation**: HTML5 Canvas with responsive scaling

### 5. Progressive Web App Features
- **Manifest**: PWA configuration for offline usage
- **Service Worker**: Caching strategy for offline functionality
- **Responsive**: Mobile-first design with touch-friendly interface

## Data Flow

1. **File Selection**: User selects image file through upload zone or drag-and-drop
2. **Image Loading**: File is loaded into HTML5 Canvas for preview
3. **Watermark Configuration**: User adjusts watermark settings via controls panel
4. **Real-time Processing**: Watermark is applied to canvas in real-time as settings change
5. **Final Processing**: User triggers final watermark application
6. **Download**: Processed image is made available for download as blob URL

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Type-safe variant styling

### Development and Build
- **Vite**: Fast build tool with HMR support
- **TypeScript**: Type safety across the entire application
- **React Hook Form**: Form validation and management
- **TanStack React Query**: Server state management (prepared for future API usage)

### Database and Backend
- **Drizzle ORM**: Type-safe database queries
- **@neondatabase/serverless**: PostgreSQL database connection
- **Express.js**: Backend server framework

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Features**: Hot reload, development error overlay, Replit integration
- **Database**: Uses memory storage for development

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild compiles server code to `dist/index.js`
- **Deployment**: Single command (`npm run build`) prepares both frontend and backend

### Database Migration
- **Command**: `npm run db:push`
- **Tool**: Drizzle Kit for schema synchronization
- **Configuration**: Environment-based database URL configuration

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable
- **Development**: Automatic Replit integration when `REPL_ID` is present
- **Production**: `NODE_ENV=production` for optimized builds

## Changelog
```
Changelog:
- July 04, 2025. Initial setup
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```