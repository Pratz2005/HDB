"use client";
import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import SearchResults from "./SearchResults";

export default function SearchLayout({onClick, getSearchResults}) {
  const [searchResults, setSearchResults] = useState(null);

  // call getSearchResults when the search results change
  useEffect(() => {
    if (searchResults) {
      // passing search results to page.js
      getSearchResults(searchResults);
    }
  }, [searchResults, getSearchResults]); // ensures the function is called when searchResults change

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Filter Sidebar */}
      <Sidebar setSearchResults={setSearchResults}/>

      {/* Results Panel */}
      <div className="flex-grow overflow-hidden flex flex-col">
        {searchResults && (
          <div className="w-[350px] flex-grow px-4 pb-4 border-l shadow-md bg-white overflow-y-auto relative">
            <button
              onClick={() => setSearchResults(null)}
              className="absolute top-3 right-3 h-6 w-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-gray-600 hover:text-gray-800"
              aria-label="Close search results"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <SearchResults onClick={onClick} results={searchResults} />
          </div>
        )}
      </div>
    </div>
  );
}