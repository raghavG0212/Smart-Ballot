import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Select,
  Spinner,
  Modal,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phoneNo: "",
    aadharNo: "",
    password: "",
    nationality: "",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [vIDShow,setVIDShow]= useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "/api/v1/voter/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setShowModal(true);
        setVIDShow(responseData.voterID);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/login"); 
  };
  return (
    <div className="flex p-6 mt-4 mb-4 items-center justify-center">
      <div className="text-center">
        <h1 className="font-medium italic text-4xl mb-10">SIGN UP</h1>
        <form
          onSubmit={handleSignup}
          className="flex max-w-md flex-col gap-4 mt-4 w-80"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="dob" value="Date of Birth" />
            </div>
            <TextInput
              id="dob"
              type="date"
              required
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="phoneNo" value="Phone Number" />
            </div>
            <TextInput
              id="phoneNo"
              type="tel"
              placeholder="Your phone number"
              required
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="aadharNo" value="Aadhar Number" />
            </div>
            <TextInput
              id="aadharNo"
              type="text"
              placeholder="Your Aadhar number"
              required
              value={formData.aadharNo}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="Your password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="nationality" value="Nationality" />
            </div>
            <Select
              id="nationality"
              required
              value={formData.nationality}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select your nationality
              </option>
              <option value="Indian">Indian</option>
              <option value="American">American</option>
              <option value="British">British</option>
            </Select>
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
              "Sign Up"
            )}
          </Button>
        </form>
        <div className="flex flex-row justify-center mt-4">
          <h1>Have an account...?</h1>
          <div className="text-blue-400 hover:text-blue-700 ml-1">
            <Link to="/login">Click here</Link>
          </div>
        </div>

        <Modal show={showModal} size="md" popup onClose={handleModalClose}>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center mx-auto">
              <div className="flex justify-center mb-5">
                <FaCheckCircle color="green" size="50" />
              </div>
              <h3 className="mb-5 text-2xl font-semibold">
                Sign up successful !
              </h3>
              <div className="space-x-1 bg-slate-100 p-3 rounded-lg">
                <span className="text-red-600">*Please Note -</span>
                <span className="font-medium">Your Voter ID is {vIDShow}.</span>
              </div>
              <p className="mb-5 text-xs text-blue-600">Voter ID must be noted down for further usage.</p>
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
