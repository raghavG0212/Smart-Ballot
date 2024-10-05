import { Button, Navbar, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import { Wave } from "react-animated-text";
import { FaMoon } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { logout } from "../redux/authSlice";
import { toast } from "react-toastify";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const { theme } = useSelector((state) => state.theme);
  const isLoginPage = location.pathname === "/login";
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  return (
    <Navbar className="border-b-8 p-4 border-teal-500 dark:border-teal-600 bg-slate-200">
      <Link to="/">
        <span className="p-2 bg-gradient-to-r from-orange-500 to-green-700 rounded-lg font-semibold text-white mr-1 md:text-lg lg:text-xl shadow-lg">
          Smart Ballot
        </span>
      </Link>
      <div className="font-semibold italic mx-auto hidden md:block text-xl uppercase">
        <Wave
          text="Cast Your Vote Make A Difference." 
          effect="stretch"
          effectChange={2.0}
        />
      </div>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `${
            isActive && "text-blue-700 text-lg" 
          } text-lg mr-5 hidden lg:block hover:text-blue-600 hover:scale-110 transition duration-200 ease-in-out`
        }
      >
        About
      </NavLink>
      <Button
        onClick={() => dispatch(toggleTheme())}
        className="mr-5 hidden md:block"
        pill
        outline
      >
        {theme === "dark" ? <GoSun /> : <FaMoon />}
      </Button>
      <div className="flex space-x-2">
        {currentUser != null ? (
          <Dropdown
            className=""
            arrowIcon={false}
            inline
            label={
              <div className="relative group">
                <Avatar
                  alt="Your Profile"
                  img="/user_icon.jpg"
                  rounded
                  className="transition-all duration-300"
                />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 group-hover:border-2 rounded-full"></div>
              </div>
            }
          >
            <Dropdown.Header>
              {" "}
              <span className="block text-sm capitalize">
                {isAdmin ? "Hey Admin!" : `Every vote counts!`}
              </span>
              <span className="block truncate text-sm font-medium">
                {currentUser.name}
              </span>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Link to={isAdmin ? "/admin-profile" : "voter-profile"}>
                Your Profile
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => dispatch(toggleTheme())}
              className="sm:hidden"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to={isLoginPage ? "/sign-up" : "/login"}>
            <Button className="w-13 sm:w-23 " gradientMonochrome="failure">
              {isLoginPage ? "Sign Up" : "Login"}
            </Button>
          </Link>
        )}
        <Button
          onClick={() => dispatch(toggleTheme())}
          className="mr-5 hidden sm:block md:hidden"
          pill
          outline
        >
          {theme === "dark" ? <GoSun /> : <FaMoon />}
        </Button>
      </div>
    </Navbar>
  );
}
