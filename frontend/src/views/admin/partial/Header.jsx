import '../../../css/header_style.css';
export default function Header() {
  return (
    <header className="w-full fixed top-0 z-50 bg-gradient-to-r from-grey-900  via-black to-grey-900 backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-auto">
        <ul className="flex flex-row justify-center items-center space-x-12 py-6">
          <li className="text-xl font-semibold tracking-wide text-gray-200 hover:text-white hover:scale-110 transition duration-300 ease-in-out cursor-pointer">
            Home
          </li>
          <li className="text-xl font-semibold tracking-wide text-gray-200 hover:text-white hover:scale-110 transition duration-300 ease-in-out cursor-pointer">
            Program
          </li>
          <li className="text-xl font-semibold tracking-wide text-gray-200 hover:text-white hover:scale-110 transition duration-300 ease-in-out cursor-pointer">
            Innovations
          </li>
          <li className="text-xl font-semibold tracking-wide text-gray-200 hover:text-white hover:scale-110 transition duration-300 ease-in-out cursor-pointer">
            Campus Life
          </li>
        </ul>
      </div>
    </header>
  );
}
