export default function NavigationBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-lg font-bold">Image Captioning</a>
        <div>
          <a href="/" className="text-gray-300 hover:text-white px-3 py-2">Home</a>
          <a href="/video-query" className="text-gray-300 hover:text-white px-3 py-2">Video Query</a>
        </div>
      </div>
    </nav>
  );
}