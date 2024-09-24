import { Button, Sidebar } from "flowbite-react";
import { HiChartPie } from "react-icons/hi";
import { FaArrowRight, FaPeopleRoof, FaPerson } from "react-icons/fa6";
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminSidebar() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin-login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="hidden md:block">
      <Sidebar className={`${isSidebarOpen ? "block" : "hidden"}`}>
        <Sidebar.Items>
          <div className="flex">
            <h1 className="font-semibold ml-3">Options</h1>
            <Button className="ml-28" onClick={toggleSidebar} outline pill>
              <FaRegArrowAltCircleLeft />
            </Button>
          </div>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              as={Link}
              to="/admin-dashboard"
              icon={HiChartPie}
              active={location.pathname === "/admin-dashboard"}
            >
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/admin-candidate-management"
              icon={FaPeopleRoof}
              active={location.pathname === "/admin-candidate-management"}
            >
              <div className="flex space-x-16">
                <div>Elections</div>
                <div className="relative flex items-center font-bold text-red-600">
                  <span className="mr-3 font-semibold">Live</span>
                  <span className="absolute right-0 w-2 h-2 bg-red-600 rounded-full animate-pulse mt-1"></span>
                </div>
              </div>
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/admin-profile"
              icon={FaPerson}
              label='Admin'
              active={location.pathname === "/admin-profile"}
            >
              Your Profile
            </Sidebar.Item>
            <Sidebar.Item onClick={handleLogout} icon={FaArrowRight} className="cursor-pointer">
              Logout
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      {!isSidebarOpen && (
        <Button className="m-2" size="lg" onClick={toggleSidebar} outline pill>
          <FaRegArrowAltCircleRight />
        </Button>
      )}
    </div>
  );
}
