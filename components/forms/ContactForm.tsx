'use client'

import React, { useState } from 'react'
import { Button } from '../ui/Button'
import { CheckCircle2, AlertCircle } from 'lucide-react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!res.ok) throw new Error('Failed to submit form')
      
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMessage('There was a problem submitting your inquiry. Please try again or email us directly.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[color:var(--bg-card)] border border-[color:var(--border)] rounded-xl p-8 md:p-12 text-center h-full flex flex-col justify-center items-center">
        <div className="w-16 h-16 bg-[color:var(--success)]/10 text-[color:var(--success)] rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-h3 mb-4">Inquiry Received</h3>
        <p className="text-[color:var(--text-body)] mb-8 max-w-sm">
          Thank you for reaching out. A partner will review your requirements and get back to you within 24 hours to schedule a discovery call.
        </p>
        <Button variant="outline" onClick={() => setStatus('idle')}>Submit Another</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[color:var(--bg-card)] border border-[color:var(--border)] rounded-xl p-8 md:p-12 space-y-6">
      <h3 className="text-h3 mb-6">Request a Proposal</h3>
      
      {status === 'error' && (
        <div className="p-4 bg-[color:var(--error)]/10 border border-[color:var(--error)]/20 rounded-md text-[color:var(--error)] flex items-start text-sm">
          <AlertCircle size={18} className="mr-3 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 text-left">
          <label htmlFor="name" className="text-sm font-medium text-[color:var(--text-primary)]">Full Name *</label>
          <input required type="text" id="name" name="name" className="w-full bg-[color:var(--bg-subtle)] border border-[color:var(--border)] rounded-md px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-colors" />
        </div>
        <div className="space-y-2 text-left">
          <label htmlFor="email" className="text-sm font-medium text-[color:var(--text-primary)]">Work Email *</label>
          <input required type="email" id="email" name="email" className="w-full bg-[color:var(--bg-subtle)] border border-[color:var(--border)] rounded-md px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-colors" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 text-left">
          <label htmlFor="company" className="text-sm font-medium text-[color:var(--text-primary)]">Company Name *</label>
          <input required type="text" id="company" name="company" className="w-full bg-[color:var(--bg-subtle)] border border-[color:var(--border)] rounded-md px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-colors" />
        </div>
        <div className="space-y-2 text-left">
          <label htmlFor="industry" className="text-sm font-medium text-[color:var(--text-primary)]">Industry *</label>
          <select required id="industry" name="industry" className="w-full bg-[color:var(--bg-subtle)] border border-[color:var(--border)] rounded-md px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-colors appearance-none">
            <option value="">Select industry...</option>
            <option value="tax-cpa">Tax / CPA Firm</option>
            <option value="fintech">Fintech</option>
            <option value="real-estate">Real Estate</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 text-left">
          <label htmlFor="service" className="text-sm font-medium text-[color:var(--text-primary)]">Service of Interest *</label>
          <select required id="service" name="service" className="w-full bg-[color:var(--bg-subtle)] border border-[color:var(--border)] rounded-md px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-colors appearance-none">
            <option value="">Select service...</option>
            <option value="portals">Secure Portals</option>
            <option value="automation">AI Automation</option>
            <option value="software">Custom Software / Dashboard</option>
            <option value="other">Other / Not Sure</option>
          </select>
        </div>
        <div className="space-y-2 text-left">
          <label htmlFor="budget" className="text-sm font-medium text-[color:var(--text-primary)]">Estimated Budget *</label>
          <select required id="budget" name="budget" className="w-full bg-[color:var(--bg-subtle)] border border-[color:var(--border)] rounded-md px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-colors appearance-none">
            <option value="">Select budget...</option>
            <option value="10k-25k">$10k - $25k</option>
            <option value="25k-50k">$25k - $50k</option>
            <option value="50k-100k">$50k - $100k</option>
            <option value="100k+">$100k+</option>
          </select>
        </div>
      </div>

      <div className="space-y-2 text-left">
        <label htmlFor="timeline" className="text-sm font-medium text-[color:var(--text-primary)]">Target Timeline *</label>
        <select required id="timeline" name="timeline" className="w-full bg-[color:var(--bg-subtle)] border border-[color:var(--border)] rounded-md px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-colors appearance-none">
          <option value="">Select timeline...</option>
          <option value="asap">ASAP</option>
          <option value="1-3-months">1-3 Months</option>
          <option value="3-6-months">3-6 Months</option>
          <option value="exploring">Just Exploring</option>
        </select>
      </div>

      <div className="space-y-2 text-left">
        <label htmlFor="message" className="text-sm font-medium text-[color:var(--text-primary)]">Additional Details (Optional)</label>
        <textarea id="message" name="message" rows={4} className="w-full bg-[color:var(--bg-subtle)] border border-[color:var(--border)] rounded-md px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-colors resize-y"></textarea>
      </div>

      <div className="pt-4">
        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full bg-[color:var(--accent)] text-white hover:bg-[color:var(--accent-hover)] active:scale-95 inline-flex items-center justify-center font-semibold rounded-md transition-colors duration-200 cursor-pointer text-btn px-9 py-4"
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </div>
    </form>
  )
}
