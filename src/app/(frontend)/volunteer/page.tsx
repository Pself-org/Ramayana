import React from 'react'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Volunteer | Ramayana Odyssey',
  description: 'Apply to volunteer for the Ramayana Odyssey project.',
}

export default function VolunteerPage() {
  return (
    <div className="bg-pearl min-h-screen pt-32 pb-24 text-cosmos">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-saffron mb-6">
            Volunteer Application
          </h1>
          <p className="text-xl font-montserrat text-cosmos/80">
            We are looking for dedicated editors, artists, and admins to help us bring the 18-Volume vision to life.
          </p>
        </div>
        
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 border border-cosmos/5">
          <form className="space-y-6 form-group">
            
            {/* Question 1 */}
            <div>
              <label className="block text-sm font-bold font-poppins text-cosmos mb-2">
                1. Full Name
              </label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-cosmos/20 focus:border-cosmos focus:ring-1 focus:ring-cosmos outline-none transition-colors" placeholder="e.g. Arjuna" />
            </div>

            {/* Question 2 */}
            <div>
              <label className="block text-sm font-bold font-poppins text-cosmos mb-2">
                2. Email Address
              </label>
              <input type="email" className="w-full px-4 py-3 rounded-lg border border-cosmos/20 focus:border-cosmos focus:ring-1 focus:ring-cosmos outline-none transition-colors" placeholder="your@email.com" />
            </div>

            {/* Question 3 */}
            <div>
              <label className="block text-sm font-bold font-poppins text-cosmos mb-2">
                3. Which role are you applying for?
              </label>
              <select className="w-full px-4 py-3 rounded-lg border border-cosmos/20 focus:border-cosmos focus:ring-1 focus:ring-cosmos outline-none transition-colors bg-white">
                <option value="">Select a role...</option>
                <option value="editor">Editor / Writer</option>
                <option value="artist">Artist / Illustrator</option>
                <option value="admin">Admin / Coordinator</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Question 4 */}
            <div>
              <label className="block text-sm font-bold font-poppins text-cosmos mb-2">
                4. Why do you want to join the Odyssey?
              </label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-cosmos/20 focus:border-cosmos focus:ring-1 focus:ring-cosmos outline-none transition-colors" placeholder="Share your story..."></textarea>
            </div>

            <button type="button" className="w-full mt-8 bg-cosmos text-pearl hover:bg-cosmos/90 transition-colors py-4 rounded-lg font-bold font-poppins flex items-center justify-center gap-2">
              Submit Application
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-xs text-center text-cosmos/50 mt-4 font-montserrat">
              Note: This is a static form for demonstration. We will wire it up to your backend in the future!
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
