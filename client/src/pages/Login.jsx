import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin, setCurrentUser,setVoteCasted } from "../redux/authSlice";
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
  const dispatch= useDispatch();
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
        const data= await response.json();
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
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-medium italic text-4xl mb-10">LOGIN</h1>
        <form
          onSubmit={handleLogin}
          className="flex max-w-md flex-col gap-4 mt-4 w-80"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="Identifier" value="Aadhar No or Voter ID" />
            </div>
            <TextInput
              id="identifier"
              type="text"
              placeholder="Enter your Aadhar No or Voter ID"
              value={formData.identifier}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button
            gradientDuoTone="purpleToPink"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
        <div className="flex flex-row justify-center mt-4">
          <h1>Not Signed In...?</h1>
          <div className="text-blue-400 hover:text-blue-700 ml-1">
            <Link to="/sign-up">Click here</Link>
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
    </div>
  );
}
