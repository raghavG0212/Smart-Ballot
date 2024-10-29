import { Drawer, Sidebar } from "flowbite-react";
import { HiChartPie } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { FaArrowRight, FaPerson } from "react-icons/fa6";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GiVote } from "react-icons/gi";
import { useEffect } from "react";

export default function AdminDrawer({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsOpen]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
    navigate("/");
  };

  return (
    <Drawer
      className="overflow-hidden w-screen"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Drawer.Items>
        <Sidebar className="w-full h-screen">
          <Sidebar.Items>
            <div className="flex justify-between items-center">
              <h1 className="font-semibold ml-3">Options</h1>
              <AiOutlineClose
                className="hover:text-blue-600 hover:scale-110 transition-all duration-200 ease-in-out"
                onClick={() => setIsOpen(false)} // Close on icon click
              />
            </div>
            <Sidebar.ItemGroup onClick={() => setIsOpen(false)}>
              <Sidebar.Item
                as={Link}
                to="/admin-dashboard"
                icon={HiChartPie}
                active={location.pathname === "/admin-dashboard"}
              >
                Dashboard
              </Sidebar.Item>
              <div className="h-[3px] w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-500 dark:from-slate-400 dark:via-slate-500 dark:to-slate-700 mt-2" />
              <Sidebar.Item
                as={Link}
                to="/admin-candidate-management"
                icon={GiVote}
                active={location.pathname === "/admin-candidate-management"}
              >
                <div className="flex justify-between">
                  <div>Elections</div>
                  <div className="relative flex items-center font-bold text-red-600">
                    <span className="mr-3 font-semibold">Live</span>
                    <span className="absolute right-0 w-2 h-2 bg-red-600 rounded-full animate-pulse mt-1"></span>
                  </div>
                </div>
              </Sidebar.Item>
              <div className="h-[3px] w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-500 dark:from-slate-400 dark:via-slate-500 dark:to-slate-700 mt-2" />
              <Sidebar.Item
                as={Link}
                to="/admin-profile"
                icon={FaPerson}
                label="Admin"
                active={location.pathname === "/admin-profile"}
              >
                Your Profile
              </Sidebar.Item>
              <div className="h-[3px] w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-500 dark:from-slate-400 dark:via-slate-500 dark:to-slate-700 mt-2" />
              <Sidebar.Item
                onClick={handleLogout}
                icon={FaArrowRight}
                className="cursor-pointer"
              >
                Logout
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </Drawer.Items>
    </Drawer>
  );
}
