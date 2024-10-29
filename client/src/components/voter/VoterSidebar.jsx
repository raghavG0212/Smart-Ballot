import { Sidebar } from "flowbite-react";
import { FaArrowRight, FaPerson } from "react-icons/fa6";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { GiVote } from "react-icons/gi";

export default function VoterSideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
    navigate("/");
  };

  return (
    <div className="hidden md:block">
      <Sidebar>
        <Sidebar.Items>
          <h1 className="font-semibold ml-3">Options</h1>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              as={Link}
              to="/voter-dashboard"
              icon={GiVote}
              active={location.pathname === "/voter-dashboard"}
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
              to="/voter-profile"
              icon={FaPerson}
              label="Voter"
              active={location.pathname === "/voter-profile"}
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
    </div>
  );
}
