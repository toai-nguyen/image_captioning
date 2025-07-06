import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/" className="hover:text-gray-300">Image Captioning</Link>
        </div>
        <div>

          <Link to ="/" className="text-gray-300 hover:text-white px-3 py-2">Home</Link>
          <Link to="/video-query" className="text-gray-300 hover:text-white px-3 py-2">Video Query</Link>
        </div>
      </div>
    </nav>
  );
}