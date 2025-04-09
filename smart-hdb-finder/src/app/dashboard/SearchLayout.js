"use client";
import { useState } from "react";
import Sidebar from "./sidebar";
import SearchResults from "./SearchResults";


export default function SearchLayout() {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Filter Sidebar */}
      <Sidebar setSearchResults={setSearchResults} />

      {/* Results Panel */}
      {searchResults && (
        <div className="w-[400px] border-l shadow-md bg-white overflow-y-auto">
          <SearchResults results={searchResults} />
        </div>
      )}
    </div>
  );
}
