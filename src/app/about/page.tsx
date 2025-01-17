import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Store.ai</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-gray-300">
              Store.ai is dedicated to bringing you the best AI tools and resources in one convenient marketplace. 
              We curate and showcase the most innovative AI solutions to help individuals and businesses harness 
              the power of artificial intelligence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Curated selection of AI tools and applications</li>
              <li>User reviews and ratings</li>
              <li>Regular updates on new AI technologies</li>
              <li>Platform for AI developers to showcase their work</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
            <p className="text-gray-300">
              Have questions or suggestions? We&apos;d love to hear from you. 
              Reach out to us at <a href="mailto:contact@store.ai" className="text-yellow-400 hover:underline">contact@store.ai</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
