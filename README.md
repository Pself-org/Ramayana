# Ramayana Odyssey

Pillar I of Project Self. An immersive content hub and platform bringing the ancient wisdom of the Ramayana into modern life.

## Features

- **Built with Next.js 15 App Router**
- **MySQL Database** via Drizzle ORM (`mysql2`)
- **TailwindCSS 4** styling according to the Project Self Brand Kit
- **Resend API Integration** for robust weekly digest newsletter signups
- **Responsive Mobile-First Design** with "Immersive" and "Educational" viewing modes

## Getting Started

### 1. Install Dependencies

You MUST use `--legacy-peer-deps` due to older React peer dependencies from Drizzle ORM overriding React 19.

```bash
npm install --legacy-peer-deps
```

### 2. Environment Setup

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Fill in the values:
- `DATABASE_URL` — Your MySQL connection string (e.g. `mysql://user:pass@localhost:3306/ramayana_odyssey`)
- `NEXT_PUBLIC_SITE_URL` — The public URL of the site
- `RESEND_API_KEY` — Your Resend API key for email

### 3. Run Database Migrations

Push the Drizzle schema to your MySQL database:

```bash
npm run db:push
```

### 4. Start the Development Server

```bash
npm run dev
```

The site will run on `http://localhost:3001`.

## Database Management

```bash
npm run db:push       # Push schema changes to DB
npm run db:generate   # Generate migration files
npm run db:migrate    # Run pending migrations
npm run db:studio     # Open Drizzle Studio (visual DB editor)
```

## Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Database ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Database**: MySQL
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Email**: [Resend](https://resend.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Deployment (Hostinger Node.js Hosting)

1. Create a MySQL database in Hostinger hPanel.
2. Import the GitHub repo via hPanel → Websites → Add Website → Node.js App.
3. Select Node **20.x** and set Startup File to **`server.js`**.
4. Set environment variables in hPanel app settings (`DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`, etc).
5. Ensure Hostinger is configured to run `npm install` (using the native `package-lock.json` in this repo).
6. After the successful first build, go to Hostinger SSH/Browser Terminal and run `npm run db:push` to construct the MySQL tables.
