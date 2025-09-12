import { Link } from "react-router-dom";

const Navbar = function () {
  return (
    <nav className="bg-blue-950 p-4 shadow-md fixed top-0 right-0 left-0">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex space-x-8">
          <Link
            to="/"
            className="text-white font-semibold hover:text-blue-200 transition"
          >
            Home
          </Link>
          <a
            href="/groups"
            className="text-white font-semibold hover:text-blue-200 transition"
          >
            Groups
          </a>
          <a
            href="/friends"
            className="text-white font-semibold hover:text-blue-200 transition"
          >
            Friends
          </a>
        </div>
        <div>
          <Link
            to="/login"
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-blue-100 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
