import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin, setCurrentUser, setVoteCasted } from "../redux/authSlice";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Spinner,
  Modal,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/v1/voter/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setAdmin(false));
        dispatch(setCurrentUser(data.user));
        if (data.user.voted) {
          dispatch(setVoteCasted(true));
        }
        setShowModal(true);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center lg:justify-between justify-center">
      <div className="hidden bg-blue-100 h-screen w-1/2 left-0 lg:flex justify-center items-center">
        <img
          src="/userlog.jpg"
          alt="sign-in"
          className="w-5/6 h-5/6 rounded-3xl"
        />
      </div>
      <div className="text-center lg:mr-16 lg:ml-4">
        <div className="font-medium text-4xl mb-10 mt-6 capitalize flex flex-col">
          <span>Welcome back</span>
          <span className="text-blue-600 italic">sign in your account</span>
        </div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 mt-4 items-center sm:items-start"
        >
          <div className="sm:flex sm:space-x-8">
            <div className="mt-2 mb-4 sm:mb-0">
              <Label
                htmlFor="Identifier"
                value="Aadhar No or Voter ID"
                className="text-md"
              />
            </div>
            <TextInput
              id="identifier"
              type="text"
              placeholder="Your Aadhar No or Voter ID"
              value={formData.identifier}
              onChange={handleChange}
              required
              className="w-80 sm:w-64"
            />
          </div>
          <div className="sm:flex sm:space-x-32 sm:mt-4 ">
            <div className="mt-2 mb-4 sm:mb-0">
              <Label htmlFor="password" value="Password" className="text-md" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="Your password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-80 sm:w-64"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <Checkbox id="remember" className="mt-1" />
            <Label htmlFor="remember" className="text-md">
              Remember me
            </Label>
          </div>
          <Button
            gradientDuoTone="purpleToBlue"
            type="submit"
            disabled={loading}
            className="sm:w-full w-11/12"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Log In"
            )}
          </Button>
        </form>
        <div className="flex flex-row justify-center mt-3 mb-10">
          <h1>Not Signed In...?</h1>
          <div className="text-blue-400 hover:text-blue-700 ml-1">
            <Link to="/sign-up">Click here</Link>
          </div>
        </div>
      </div>

      {/* Modal for successful login */}
      <Modal show={showModal} size="md" popup onClose={handleModalClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center mx-auto space-y-5">
            <div className="flex justify-center">
              <FaCheckCircle color="green" size="50" />
            </div>
            <h3 className="mb-5 text-2xl font-semibold">Login successful!</h3>
            <div className="justify-center flex">
              <Button
                gradientDuoTone="tealToLime"
                onClick={handleModalClose}
                pill
              >
                OK
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
