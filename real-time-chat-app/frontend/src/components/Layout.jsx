import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = function () {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
