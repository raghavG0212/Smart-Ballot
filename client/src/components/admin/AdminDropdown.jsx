import { Accordion } from "flowbite-react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiChartPie } from "react-icons/hi";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { FaPeopleRoof, FaPerson, FaArrowRight } from "react-icons/fa6";

export default function AdminDropdown() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="md:hidden mb-5">
      <Accordion className="">
        <Accordion.Panel>
          <Accordion.Title>Options</Accordion.Title>
          <Accordion.Content className="bg-slate-200">
            <Link
              to="/admin-dashboard"
              className={`flex items-center space-x-2 ${
                location.pathname === "/admin-dashboard" ? "text-blue-600" : ""
              }`}
            >
              <HiChartPie />
              <span>Dashboard</span>
            </Link>
          </Accordion.Content>
          <Accordion.Content className="bg-slate-300">
            <Link
              to="/admin-candidate-management"
              className={`flex items-center space-x-2 ${
                location.pathname === "/admin-candidate-management"
                  ? "text-blue-600"
                  : ""
              }`}
            >
              <FaPeopleRoof />
              <div className="flex justify-between w-full">
                <div>Elections</div>
                <div className="relative flex items-center font-bold text-red-600">
                  <span className="mr-2 font-semibold">Live</span>
                  <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse mt-1"></span>
                </div>
              </div>
            </Link>
          </Accordion.Content>
          <Accordion.Content className="bg-slate-400">
            <Link
              to="/admin-profile"
              className={`flex items-center space-x-2 ${
                location.pathname === "/admin-profile" ? "text-blue-600" : ""
              }`}
            >
              <FaPerson />
              <span>Your Profile</span>
            </Link>
          </Accordion.Content>
          <Accordion.Content className="bg-slate-500">
            <div className="flex space-x-2">
              <FaArrowRight className="mt-1.5" />
              <button onClick={handleLogout}>Logout</button>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}
