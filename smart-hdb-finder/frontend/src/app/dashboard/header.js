"use client";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-4 py-2 border-b shadow-sm bg-white">
      <div className="text-black font-semibold bg-gray-300 px-3 py-1 rounded">
        Logo Here
      </div>
      <div className="flex items-center gap-4 bg-gray">
        <button className="flex items-center gap-2 border-2 border-orange-500 text-orange-500 px-3 py-1 rounded-lg font-semibold hover:bg-orange-100 transition">
          Find myHDB!
        </button>
        <div className="flex items-center text-gray-500 text-sm gap-1 cursor-pointer hover:text-gray-700">
          HDB Market Watch
        </div>
      </div>
    </header>
  );
}
