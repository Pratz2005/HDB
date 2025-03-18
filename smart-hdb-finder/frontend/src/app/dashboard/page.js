import Sidebar from "./sidebar"; 

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow p-6 bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <p className="text-black">This is the main content area. We'll build more features here.</p>
      </div>
    </div>
  );
}
