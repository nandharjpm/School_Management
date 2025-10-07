import Header from "../admin/partial/Header";
import Footer from "../admin/partial/Footer";
import {Link} from "react-router-dom";
import Register from "./Register";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 via-black to-gray-900">
      <Header />

      <div className="flex flex-1 items-center justify-center px-4 mt-40">
        <div className="w-full max-w-md bg-white/10  border border-white/20 rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Welcome Back
          </h2>
          <p className="bg-gradient-to-r from-gray-800 via-gray-100 to-gray-800 text-transparent text-center mb-8">
            <span className="font-bold text-black">Please login to continue</span>
          </p>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                User Name
              </label>
              <input
                type="text"
                name="user_name"
                id="username"
                placeholder="Enter your username"
                className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 text-gray-200 focus:outline-none focus:ring-3 focus:ring-indigo-200 transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 text-gray-200 focus:outline-none focus:ring-3 focus:ring-indigo-200 transition"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full py-3 px-6 rounded-xl bg-gradient-to-r from-gray-800 via-gray-400 to-gray-800 text-white font-bold shadow-lg hover:opacity-90 hover:scale-[1.02]"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 flex justify-between text-sm text-gray-400">
            <a href="#" className="hover:text-indigo-400 transition">
              Forgot password?
            </a>

            <Link to="/register" className="hover:text-indigo-400 transition">Create Acount</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
