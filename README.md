# Ramayana Odyssey

Pillar I of Project Self. An immersive content hub and platform bringing the ancient wisdom of the Ramayana into modern life.

## Features

- **Built with Next.js 15 App Router**
- **Headless Payload CMS (v3)** for managing Podcasts, Videos, Essays, and Chants
- **PostgreSQL Database** backing the CMS
- **TailwindCSS 4** styling according to the Project Self Brand Kit
- **Resend API Integration** for robust weekly digest newsletter signups
- **Responsive Mobile-First Design** with "Immersive" and "Educational" viewing modes

## Getting Started

1. **Install Dependencies**

```bash
pnpm install
```

2. **Environment Setup**

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

You will need to set:
- `DATABASE_URI`: Your PostgreSQL connection string.
- `PAYLOAD_SECRET`: A secure random string for JWT encryption.
- `RESEND_API_KEY`: Your Resend key.

3. **Start the Development Server**

```bash
pnpm run dev
```

The site will run on `http://localhost:3001` and Payload CMS admin on `http://localhost:3001/admin`.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **CMS**: [Payload](https://payloadcms.com/)
- **Database**: PostgreSQL
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Email**: [Resend](https://resend.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
