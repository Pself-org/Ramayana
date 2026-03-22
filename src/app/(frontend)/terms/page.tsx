import React from 'react'

export const metadata = {
  title: 'Terms of Service | Ramayana Odyssey',
  description: 'Terms of Service for the Ramayana Odyssey platform.',
}

export default function TermsPage() {
  return (
    <div className="bg-pearl min-h-screen pt-32 pb-24 text-cosmos">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold text-saffron mb-8">
          Terms of Service
        </h1>
        
        <div className="prose prose-lg prose-headings:font-poppins prose-headings:text-cosmos prose-p:font-montserrat">
          <p className="mb-6">
            <strong>Last Updated:</strong> March 2026
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Agreement to Terms</h2>
          <p className="mb-6">
            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Ramayana Odyssey ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Intellectual Property Rights</h2>
          <p className="mb-6">
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. User Representations</h2>
          <p className="mb-6">
            By using the Site, you represent and warrant that: all registration information you submit will be true, accurate, current, and complete; you will maintain the accuracy of such information and promptly update such registration information as necessary.
          </p>
        </div>
      </div>
    </div>
  )
}
