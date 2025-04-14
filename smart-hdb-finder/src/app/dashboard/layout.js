export default function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      {/* Other content will go here in later steps */}
      <div className="flex-grow bg-gray-100">{children}</div>
    </div>
  );
}
