'use client'

import React, { useState } from 'react'
import { Mail, ArrowRight } from 'lucide-react'

export default function SubscribePage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'subscribe-page' }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error — please check your connection.')
    }
  }

  return (
    <div className="bg-charcoal min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-black/20 backdrop-blur-md border border-white/10 p-8 rounded-xl text-center shadow-2xl">
        <h1 className="text-3xl font-poppins font-bold text-saffron mb-4">
          The Weekly Digest
        </h1>
        <p className="font-montserrat text-pearl/90 mb-8 leading-relaxed">
          Join our community. Get weekly breakdowns of chapters, philosophical insights, and project updates straight to your inbox.
        </p>
        
        {status === 'success' ? (
          <div className="py-6">
            <div className="text-5xl mb-4">🙏</div>
            <h2 className="font-poppins font-bold text-xl text-saffron mb-2">Welcome to the Odyssey!</h2>
            <p className="font-montserrat text-pearl/80">Check your inbox for a welcome message.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-montserrat text-sm font-semibold text-pearl/80 mb-1">First Name</label>
                <input required type="text" className="input-field" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} />
              </div>
              <div>
                <label className="block font-montserrat text-sm font-semibold text-pearl/80 mb-1">Last Name</label>
                <input required type="text" className="input-field" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block font-montserrat text-sm font-semibold text-pearl/80 mb-1">Email Address</label>
              <input required type="email" className="input-field" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>

            {errorMsg && <p className="text-sm text-red-300 bg-red-900/40 p-3 rounded-md">{errorMsg}</p>}

            <button type="submit" disabled={status === 'loading'} className="btn-primary w-full mt-2 py-3 rounded-lg text-base">
              {status === 'loading' ? 'Subscribing...' : <><Mail size={18}/> Subscribe Now <ArrowRight size={18}/></>}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
