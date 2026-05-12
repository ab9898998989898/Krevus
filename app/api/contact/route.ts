import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { krevusEnquiries } from '@/lib/db/schema'
import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  industry: z.string(),
  service: z.string(),
  budget: z.string(),
  timeline: z.string(),
  message: z.string().optional()
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = contactSchema.parse(body)

    // Save to DB
    const mappedData = {
      name: validatedData.name,
      company: validatedData.company,
      email: validatedData.email,
      industry: validatedData.industry,
      serviceInterest: validatedData.service,
      message: `Budget: ${validatedData.budget}\nTimeline: ${validatedData.timeline}\n\n${validatedData.message || ''}`,
    }
    await db.insert(krevusEnquiries).values(mappedData)

    // Send email notification via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Krevus Contact <hello@krevus.com>', // Requires verified domain in Resend
        to: process.env.NOTIFICATION_EMAIL || 'hello@krevus.com',
        subject: `New Enterprise Inquiry from ${validatedData.company}`,
        text: `
          Name: ${validatedData.name}
          Email: ${validatedData.email}
          Company: ${validatedData.company}
          Industry: ${validatedData.industry}
          Service Interest: ${validatedData.service}
          Budget: ${validatedData.budget}
          Timeline: ${validatedData.timeline}
          Message: ${validatedData.message || 'No message provided.'}
        `
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 400 })
  }
}
