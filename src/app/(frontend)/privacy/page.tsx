import React from 'react'

export const metadata = {
  title: 'Privacy Policy | Ramayana Odyssey',
  description: 'Privacy Policy for the Ramayana Odyssey platform.',
}

export default function PrivacyPage() {
  return (
    <div className="bg-pearl min-h-screen pt-32 pb-24 text-cosmos">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold text-saffron mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg prose-headings:font-poppins prose-headings:text-cosmos prose-p:font-montserrat">
          <p className="mb-6">
            <strong>Last Updated:</strong> March 2026
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
          <p className="mb-6">
            Welcome to the Ramayana Odyssey. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
          <p className="mb-6">
            We collect personal information that you voluntarily provide to us when registering expressing an interest in obtaining information about us or our products and services. That includes the name and email address provided in our newsletter subscription forms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
          <p className="mb-6">
            We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>
          
          <ul className="list-disc pl-6 mb-6 space-y-2 font-montserrat">
            <li>To send you our weekly digest and newsletter updates.</li>
            <li>To manage your podcast or live class subscriptions.</li>
            <li>To respond to user inquiries and offer support to users.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
