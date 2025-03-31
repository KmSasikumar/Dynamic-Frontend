"use client"; // Ensures useRouter works in a client component
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */


import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter(); // Initialize Next.js router

  const handleStart = () => {
    router.push('/search'); // Navigate to the Search Page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center relative">
      {/* Logo (Moved to Top-Right) */}
      <div className="absolute top-4 right-4">
        <img src="/trade-markia-image.png" alt="Logo" className="w-40 h-6" />
      </div>

      {/* Illustration */}
      <div className="mb-6">
        <img src="/illustration.png" alt="AI Test Generation" className="w-64 h-auto" />
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl font-bold text-gray-800">What are we exploring today?</h1>

      {/* Subtext */}
      <p className="text-gray-600 mt-2 max-w-md">
        Fuel your curiosity
      </p>

      {/* Input Field */}
      <div>
        {/* Submit Button (Now Navigates to Search Page) */}
        <button
          onClick={handleStart} // Call function on click
          className="mt-4 w-full p-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Let's get started☺️ →
        </button>
      </div>
    </div>
  );
}