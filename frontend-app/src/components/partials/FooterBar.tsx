export default function FooterBar() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Image Captioning. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</a> | 
          <a href="/terms-of-service" className="text-gray-400 hover:text-white"> Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}