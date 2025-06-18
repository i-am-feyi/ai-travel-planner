# AI Travel Planner - Deployment Documentation

## Overview

This document describes how to deploy the AI Travel Planner application to a production environment.

## Prerequisites

- Node.js (v18+ recommended)
- PNPM (v8+)
- PostgreSQL database
- Environment variables configured (see .env.example)
- Cloud provider account (e.g., Vercel, AWS, GCP, or DigitalOcean)

## Environment Variables

- Copy `.env.example` to `.env` and fill in all required values:
  - Database URL
  - Clerk API keys
  - Google AI and Maps API keys
  - Any other required secrets

## Build Steps

1. Install dependencies:
   ```sh
   pnpm install
   ```
2. Generate Prisma client:
   ```sh
   pnpm prisma generate
   ```
3. Push database schema (if needed):
   ```sh
   pnpm prisma db push
   ```
4. Build the Next.js app:
   ```sh
   pnpm build
   ```

## Deployment Options

### 1. Vercel (Recommended)

- Connect your GitHub repository to Vercel
- Set environment variables in the Vercel dashboard
- Deploy directly from the main branch

### 2. Docker

- Build the Docker image:
  ```sh
  docker build -t ai-travel-planner .
  ```
- Run the container:
  ```sh
  docker run -p 3000:3000 --env-file .env ai-travel-planner
  ```

### 3. Custom Server (e.g., AWS, GCP, DigitalOcean)

- SSH into your server
- Clone the repository
- Set up environment variables
- Run the build and start commands:
  ```sh
  pnpm install
  pnpm build
  pnpm start
  ```

## Database Migration

- Use Prisma for schema migrations:
  ```sh
  pnpm prisma migrate deploy
  ```

## Monitoring & Logging

- Use Vercel/Cloud provider dashboards for logs
- Integrate with third-party monitoring (see PERFORMANCE_MONITORING.md)

## Rollback

- Use Git and deployment platform features to roll back to a previous version if needed
