"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";

// Define a TypeScript interface for the API response
interface Trademark {
  wordmark?: string;
  ownerName?: string;
  serialNumber?: string;
  filingDate?: string;
  imageUrl?: string;
}

// Sample data for fallback
const products = [
  { name: "Meta Logo", owner: "FACEBOOK INC.", regNo: "88713620", date: "26th Jan 2020", image: "/placeholder.png" },
  { name: "Nike Logo", owner: "NIKE INC.", regNo: "67584930", date: "12th Sep 2019", image: "/placeholder.png" },
  { name: "Adidas Logo", owner: "ADIDAS GROUP", regNo: "98745612", date: "5th Mar 2018", image: "/placeholder.png" },
  { name: "Puma Logo", owner: "PUMA SE", regNo: "32564789", date: "20th Feb 2021", image: "/placeholder.png" },
  { name: "Apple Logo", owner: "APPLE INC.", regNo: "12345678", date: "14th Jun 2015", image: "/placeholder.png" },
  { name: "Google Logo", owner: "GOOGLE LLC", regNo: "87654321", date: "1st Jan 2016", image: "/placeholder.png" },
  { name: "Amazon Logo", owner: "AMAZON INC.", regNo: "11223344", date: "9th Oct 2017", image: "/placeholder.png" },
  { name: "Tesla Logo", owner: "TESLA INC.", regNo: "55667788", date: "3rd Nov 2019", image: "/placeholder.png" },
  { name: "Samsung Logo", owner: "SAMSUNG", regNo: "77889900", date: "23rd Dec 2020", image: "/placeholder.png" },
  { name: "Microsoft Logo", owner: "MICROSOFT", regNo: "99887766", date: "5th May 2013", image: "/placeholder.png" },
  { name: "Coca Cola", owner: "COCA COLA CO.", regNo: "44556677", date: "8th Aug 2012", image: "/placeholder.png" },
  { name: "McDonald's", owner: "MCDONALD'S", regNo: "22334455", date: "15th Jul 2011", image: "/placeholder.png" },
];

// API service function with type annotations
const searchTrademarks = async (keyword: string): Promise<Trademark[]> => {
  try {
    const response = await axios.post('https://vit-tm-task.api.trademarkia.app/api/v3/us', {
      keyword: keyword,
      exact: false,
      status: ["live", "dead"],
      searchType: "basic"
    });
    return response.data.data as Trademark[];
  } catch (error) {
    console.error('Error searching trademarks:', error);
    throw error;
  }
};

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState<string>(searchParams.get("query") || "");
  const [searchResults, setSearchResults] = useState<Trademark[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (query.trim() !== "") {
      router.push(`/database?query=${encodeURIComponent(query)}`);
      fetchResults(query);
    }
  };

  const fetchResults = async (searchTerm: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await searchTrademarks(searchTerm);
      setSearchResults(results);
    } catch (err) {
      console.error('Error fetching results:', err);
      setError('Failed to fetch trademark results. Showing sample data instead.');
      setSearchResults([]); // Empty results instead of sample data
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch results when query param changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (query) {
      fetchResults(query);
    }
  }, [searchParams]);

  // Use API results if available, otherwise fall back to filtered sample data
  const displayResults = searchResults.length > 0
    ? searchResults.map(item => ({
        name: item.wordmark || 'Unnamed Trademark',
        owner: item.ownerName || 'Unknown Owner',
        regNo: item.serialNumber || 'No Reg Number',
        date: item.filingDate ? new Date(item.filingDate).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }) : 'No Date',
        image: item.imageUrl || '/placeholder.png'
      }))
    : products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Search Bar */}
      <header className="bg-[#F8FAFE] w-full h-[118px] flex items-center justify-center shadow-md relative">
        <div className="absolute left-10">
          <img src="/logo.png" alt="Logo" className="w-60 h-30" />
        </div>
        <div className="w-[650px] flex items-center bg-white border border-gray-300 rounded-xl px-4 py-1 shadow-sm">
          <span className="text-gray-500 pr-2 text-3xl leading-none">⌕</span>
          <input
            type="text"
            placeholder="Search Trademark Here eg. 'Nike'"
            className="flex-1 p-2 outline-none text-gray-700"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          onClick={handleSearch}
          className="ml-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          Search
        </button>
        <div className="absolute right-8">
          <img src="/trade-markia-image.png" alt="Trademarkia Logo" className="h-6" />
        </div>
      </header>

      {/* Search Results */}
      <main className="max-w-7xl mx-auto p-6">
        {isLoading ? (
          <div className="text-center py-10">
            <p>Loading trademark results...</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">
              {searchResults.length > 0 ? 'Search Results' : 'Trending Now'}
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {displayResults.length > 0 ? (
                displayResults.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded" />
                    <h3 className="mt-2 font-bold">{item.name}</h3>
                    <p className="text-gray-600">{item.owner}</p>
                    <p className="text-gray-500 text-sm">{item.regNo}</p>
                    <p className="text-gray-400 text-xs">{item.date}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No results found for "{query}".</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={<div>Loading search params...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
