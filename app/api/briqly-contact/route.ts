import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { briqlyEnquiries } from '@/lib/db/schema'
import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const briqlySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  businessName: z.string().min(2),
  package: z.string(),
  timeline: z.string(),
  message: z.string().optional()
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = briqlySchema.parse(body)

    // Save to DB
    const mappedData = {
      name: validatedData.name,
      email: validatedData.email,
      businessName: validatedData.businessName,
      businessType: 'Unknown',
      phone: 'Not provided',
      service: validatedData.package,
      message: `Timeline: ${validatedData.timeline}\n\n${validatedData.message || ''}`,
    }
    await db.insert(briqlyEnquiries).values(mappedData)

    // Send email notification via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Briqly Contact <hello@krevus.com>',
        to: process.env.NOTIFICATION_EMAIL || 'hello@krevus.com',
        subject: `New Briqly SMB Inquiry from ${validatedData.businessName}`,
        text: `
          Name: ${validatedData.name}
          Email: ${validatedData.email}
          Business Name: ${validatedData.businessName}
          Package Selected: ${validatedData.package}
          Timeline: ${validatedData.timeline}
          Message: ${validatedData.message || 'No message provided.'}
        `
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Briqly Contact API error:', error)
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 400 })
  }
}
