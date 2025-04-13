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
          <div className="w-[400px] flex-grow px-4 pb-4 border-l shadow-md bg-white overflow-y-auto">
            <SearchResults onClick={onClick} results={searchResults} />
          </div>
        )}
      </div>
    </div>
  );
}
