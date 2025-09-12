const Navbar = () => {
  return (
    <nav className="bg-blue-950 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex space-x-8">
          <a
            href="/"
            className="text-white font-semibold hover:text-blue-200 transition"
          >
            Home
          </a>
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
          <a
            href="/login"
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-blue-100 transition"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
