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

## Deployment (Hostinger Shared Node.js Web App)

Because Hostinger Shared Hosting Node Web Apps rely on **Phusion Passenger**, a few vital structural overrides have already been implemented in this repository to ensure compatibility:
- **CommonJS Server:** The custom `server.js` was ported to CommonJS (`require()`), and `"type": "module"` was removed from `package.json` to prevent Passenger from crashing with a 503 error.
- **Automated Database Migration:** Because `npm` is not in the `$PATH` for standard SSH users on Hostinger, the `package.json` build script automatically executes `drizzle-kit push` before building the Next.js site.

### Hostinger hPanel Instructions

1. **Create Database:** Create a MySQL database and user in Hostinger. 
2. **Web App Settings:** Under advanced Node.js settings, choose the **Next.js** framework preset.
3. **Crucial Build Settings:** 
   - Ensure the **Package manager** is dropdown is set to `npm`. 
   - Ensure the **Build command** is set to `npm run build`.
   - **Important:** Make sure the **Output directory** is completely blank! (Do not leave it as `.next`, type `./` if you have to). This ensures Hostinger serves the `server.js` wrapper.
4. **Environment Variables:** 
   - Set your variables as normal. 
   - **Crucial:** For your `DATABASE_URL`, Hostinger Node 20 resolves `localhost` to IPv6 which throws `Access Denied` errors. You must explicitly use `127.0.0.1` as the host (e.g. `mysql://user:pass@127.0.0.1:3306/db_name`).
5. **Redeploy:** Click Save and Redeploy. The Hostinger pipeline will automatically run `npm run build`, which triggers the database tables to be built instantly!
