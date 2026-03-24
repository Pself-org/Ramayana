import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { eq } from 'drizzle-orm'
import { getDb } from '@/db'
import { subscribers } from '@/db/schema'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy')

// In-memory rate limiter (resets on server restart — good enough for edge)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const maxRequests = parseInt(process.env.SUBSCRIBE_RATE_LIMIT_MAX || '5')
  const windowMs = parseInt(process.env.SUBSCRIBE_RATE_LIMIT_WINDOW_MS || '60000')
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (record && now < record.resetAt) {
    if (record.count >= maxRequests) return true
    record.count++
    return false
  }

  rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
  return false
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment before trying again.' },
      { status: 429 },
    )
  }

  let body: { email?: string; firstName?: string; lastName?: string; source?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { email, firstName = '', lastName = '', source = 'homepage' } = body

  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
  }

  try {
    const db = await getDb()

    // Check for existing subscriber
    const existing = await db.select().from(subscribers).where(eq(subscribers.email, email)).limit(1)

    if (existing.length > 0) {
      // Already subscribed — return success silently (don't expose user data)
      return NextResponse.json({ success: true, message: 'You are already subscribed!' })
    }

    // Save to database
    await db.insert(subscribers).values({
      email,
      firstName,
      lastName,
      source,
      subscribedAt: new Date(),
      active: true,
    })

    // Send welcome email via Resend
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'digest@ramayanaodyssey.com'
    const fromName = process.env.RESEND_FROM_NAME || 'Ramayana Odyssey'

    await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: email,
      subject: '🙏 Welcome to the Ramayana Odyssey Digest!',
      html: buildWelcomeEmail(firstName || 'Friend'),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[subscribe] Error:', error)
    return NextResponse.json(
      { error: 'Something went wrong on our end. Please try again.' },
      { status: 500 },
    )
  }
}

function buildWelcomeEmail(firstName: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to the Ramayana Odyssey</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#1c1c1c;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.3);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1A237E 0%,#0d1557 100%);padding:40px 40px 32px;text-align:center;">
              <p style="font-family:Georgia,serif;font-style:italic;font-size:13px;color:rgba(238,170,0,0.8);letter-spacing:0.1em;text-transform:uppercase;margin:0 0 12px;">
                Ramayana Odyssey — Ancient Wisdom for Modern Life
              </p>
              <h1 style="font-size:28px;font-weight:700;color:#EEAA00;margin:0;line-height:1.2;">
                Welcome to the Odyssey!
              </h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="font-size:16px;color:#f5f5f5;margin:0 0 16px;line-height:1.7;">
                Namaste <strong style="color:#EEAA00;">${firstName}</strong> 🙏
              </p>
              <p style="font-size:15px;color:rgba(245,245,245,0.8);margin:0 0 16px;line-height:1.7;">
                You've just joined a growing community of seekers exploring the greatest epic ever written — through podcasts, explainer videos, sacred chants, and timeless essays.
              </p>
              <p style="font-size:14px;font-style:italic;color:rgba(238,170,0,0.8);font-family:Georgia,serif;margin:0 0 28px;padding:16px 20px;border-left:3px solid #EEAA00;">
                "Rama's Path. Timeless Wisdom."
              </p>
              <p style="font-size:15px;color:rgba(245,245,245,0.8);margin:0 0 24px;line-height:1.7;">
                Every week you'll receive:
              </p>
              <ul style="font-size:14px;color:rgba(245,245,245,0.75);line-height:1.9;padding-left:20px;margin:0 0 32px;">
                <li>🎙️ The latest podcast episode summary</li>
                <li>📺 New explainer video highlights</li>
                <li>🙏 A Shloka or chant with meaning</li>
                <li>📖 An essay or reflection from our team</li>
              </ul>
              <div style="text-align:center;margin:32px 0;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://ramayanaodyssey.com'}"
                   style="display:inline-block;padding:14px 36px;background:#1A237E;color:#F5F5F5;
                          font-size:15px;font-weight:600;letter-spacing:0.04em;text-decoration:none;
                          border-radius:8px;transition:background 0.2s;">
                  Begin the Journey →
                </a>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#0d1557;padding:24px 40px;text-align:center;">
              <p style="font-size:12px;color:rgba(245,245,245,0.4);margin:0 0 8px;">
                © ${new Date().getFullYear()} Ramayana Odyssey · Pillar I of Project Self
              </p>
              <p style="font-size:11px;color:rgba(245,245,245,0.3);margin:0;">
                You're receiving this because you subscribed at ramayanaodyssey.com.
                <br/>If this is a mistake, simply ignore this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}
