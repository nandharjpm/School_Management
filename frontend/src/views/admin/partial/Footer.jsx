import '../../../css/header_style.css';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-gray-900 via-black to-gray-0 text-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
          <p className="text-sm leading-relaxed text-gray-200">
            We are committed to innovation and excellence, creating a premium experience for students and partners worldwide.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Quick Links</h3>
          <ul className="space-y-2 flex flex-row">
            <li className="mx-auto hover:text-white transition duration-300 cursor-pointer">Home</li>
            <li className="mx-auto hover:text-white transition duration-300 cursor-pointer">Programs</li>
            <li className="mx-auto hover:text-white transition duration-300 cursor-pointer">Innovations</li>
            <li className="mx-auto hover:text-white transition duration-300 cursor-pointer">Campus Life</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <p className="text-sm text-gray-400">NK International School, 123 NK Street, NK City, India</p>
          <p className="text-sm text-gray-400">+91 6374012534</p>
          <p className="text-sm text-gray-400">nk@school.com</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-100">
         {new Date().getFullYear()} PremiumSite. All Rights Reserved.
      </div>
    </footer>
  );
}
