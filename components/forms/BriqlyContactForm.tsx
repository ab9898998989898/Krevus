'use client'

import React, { useState } from 'react'
import { Button } from '../ui/Button'
import { CheckCircle2, AlertCircle } from 'lucide-react'

export function BriqlyContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/briqly-contact', {
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
      <div className="bg-white border border-[color:var(--border)] rounded-xl p-8 md:p-12 text-center h-full flex flex-col justify-center items-center shadow-lg">
        <div className="w-16 h-16 bg-[color:var(--success)]/10 text-[color:var(--success)] rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-h3 text-[color:var(--text-primary)] mb-4">You're All Set!</h3>
        <p className="text-[color:var(--text-body)] mb-8 max-w-sm">
          We've received your request. We'll be in touch within 24 hours to kick off your project.
        </p>
        <Button variant="amber" onClick={() => setStatus('idle')}>Submit Another</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[color:var(--border)] rounded-xl p-8 md:p-12 space-y-6 shadow-lg relative z-10">
      <h3 className="text-h3 text-[color:var(--text-primary)] mb-6">Get Your Website in 7 Days</h3>
      
      {status === 'error' && (
        <div className="p-4 bg-[color:var(--error)]/10 border border-[color:var(--error)]/20 rounded-md text-[color:var(--error)] flex items-start text-sm">
          <AlertCircle size={18} className="mr-3 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 text-left">
            <label htmlFor="name" className="text-sm font-medium text-[color:var(--text-primary)]">Full Name *</label>
            <input required type="text" id="name" name="name" className="w-full bg-[color:var(--bg-subtle)] border border-[color:var(--border)] rounded-md px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-colors" />
          </div>
          <div className="space-y-2 text-left">
            <label htmlFor="email" className="text-sm font-medium text-[color:var(--text-primary)]">Email Address *</label>
            <input required type="email" id="email" name="email" className="w-full bg-[color:var(--bg-subtle)] border border-[color:var(--border)] rounded-md px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-colors" />
          </div>
        </div>

        <div className="space-y-2 text-left">
          <label htmlFor="businessName" className="text-sm font-medium text-[color:var(--text-primary)]">Business Name *</label>
          <input required type="text" id="businessName" name="businessName" className="w-full bg-[color:var(--bg-subtle)] border border-[color:var(--border)] rounded-md px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-colors" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 text-left">
            <label htmlFor="package" className="text-sm font-medium text-[color:var(--text-primary)]">Package Selection *</label>
            <select required id="package" name="package" className="w-full bg-[color:var(--bg-subtle)] border border-[color:var(--border)] rounded-md px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-colors appearance-none">
              <option value="">Select a package...</option>
              <option value="landing-page">Landing Page ($400)</option>
              <option value="standard-site">Standard Site ($900)</option>
              <option value="e-commerce">E-commerce ($1,500)</option>
              <option value="not-sure">Not sure yet</option>
            </select>
          </div>
          <div className="space-y-2 text-left">
            <label htmlFor="timeline" className="text-sm font-medium text-[color:var(--text-primary)]">Timeline *</label>
            <select required id="timeline" name="timeline" className="w-full bg-[color:var(--bg-subtle)] border border-[color:var(--border)] rounded-md px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-colors appearance-none">
              <option value="">Select timeline...</option>
              <option value="7-days">Within 7 Days</option>
              <option value="2-weeks">Within 2 Weeks</option>
              <option value="no-rush">No Rush / Planning</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 text-left">
          <label htmlFor="message" className="text-sm font-medium text-[color:var(--text-primary)]">Any specifics we should know? (Optional)</label>
          <textarea id="message" name="message" rows={3} className="w-full bg-[color:var(--bg-subtle)] border border-[color:var(--border)] rounded-md px-4 py-3 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-colors resize-y"></textarea>
        </div>
      </div>

      <div className="pt-2">
        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full bg-[color:var(--accent)] text-white hover:bg-[color:var(--accent-hover)] active:scale-95 inline-flex items-center justify-center font-semibold rounded-md transition-colors duration-200 cursor-pointer text-btn px-9 py-4 shadow-md"
        >
          {status === 'submitting' ? 'Submitting...' : 'Get Started'}
        </button>
      </div>
    </form>
  )
}
