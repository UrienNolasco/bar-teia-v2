# GEMINI Project Context: bar-teia-v2

## Project Overview

This is a full-stack web application built with Next.js (version 15) and TypeScript. It uses Prisma as an ORM for database interaction with a PostgreSQL database. The frontend is styled with Tailwind CSS, and `lucide-react` is used for icons. The project is set up with ESLint for code linting.

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Linting**: ESLint


## Development Conventions

- **Database Schema**: The database schema is defined in `prisma/schema.prisma`. After modifying this file, you need to run `npx prisma migrate dev` to apply the changes to the database and `npx prisma generate` to update the Prisma Client.
- **Environment Variables**: Database connection and other secrets are managed through a `.env` file. The `DATABASE_URL` is a required variable.
- **Styling**: Utility classes from Tailwind CSS are used for styling. The `tailwind-merge` and `clsx` packages are available to help manage conditional and conflicting classes.
- **Components**: The main application page is `src/app/page.tsx` and the main layout is `src/app/layout.tsx`. Reusable components should be created within the `src/components` directory (which is a common convention, though not yet created).

