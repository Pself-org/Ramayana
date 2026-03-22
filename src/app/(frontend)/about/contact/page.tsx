import React from 'react'
import { Mail, Clock } from 'lucide-react'

export const metadata = {
  title: 'Contact | Ramayana Odyssey',
  description: 'Get in touch with the Ramayana Odyssey team.',
}

export default function ContactPage() {
  return (
    <div className="bg-pearl min-h-screen pt-32 pb-24 text-cosmos flex flex-col items-center">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold text-saffron mb-6">
          Contact Us
        </h1>
        <p className="text-xl font-montserrat text-cosmos/80 max-w-2xl mx-auto mb-16">
          Whether you have an inquiry, a media request, or just want to share your thoughts on the journey, we'd love to hear from you.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 border border-cosmos/5">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold font-poppins text-cosmos mb-2">
                  First Name
                </label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-cosmos/20 focus:border-cosmos focus:ring-1 focus:ring-cosmos outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold font-poppins text-cosmos mb-2">
                  Last Name
                </label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-cosmos/20 focus:border-cosmos focus:ring-1 focus:ring-cosmos outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold font-poppins text-cosmos mb-2">
                Email Address
              </label>
              <input type="email" className="w-full px-4 py-3 rounded-lg border border-cosmos/20 focus:border-cosmos focus:ring-1 focus:ring-cosmos outline-none transition-colors" />
            </div>

            <div>
              <label className="block text-sm font-bold font-poppins text-cosmos mb-2">
                Message
              </label>
              <textarea rows={6} className="w-full px-4 py-3 rounded-lg border border-cosmos/20 focus:border-cosmos focus:ring-1 focus:ring-cosmos outline-none transition-colors"></textarea>
            </div>

            <button type="button" className="w-full bg-cosmos text-pearl hover:bg-cosmos/90 transition-colors py-4 rounded-lg font-bold font-poppins flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-12 text-center flex items-center justify-center gap-2 text-cosmos/60 font-montserrat text-sm">
          <Clock className="w-4 h-4" />
          <p>Please allow 48-72 hours for a response from our team.</p>
        </div>
      </div>
    </div>
  )
}
