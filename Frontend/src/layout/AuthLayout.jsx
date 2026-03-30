import { Outlet } from "react-router-dom";
import Navbar from "../components/MainComponents/Navbar";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Navbar/>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
