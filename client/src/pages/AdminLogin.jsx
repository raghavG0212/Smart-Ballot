import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAdmin, setCurrentUser } from "../redux/authSlice";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Spinner,
  Modal,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function AdminLogin({ setIsAdmin }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "/api/v1/admin/admin-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(setAdmin(true));
        dispatch(setCurrentUser(data.user));
        setShowModal(true);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
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
          className="flex max-w-md flex-col gap-4 mt-4 w-80"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button
            type="submit"
            gradientDuoTone="purpleToPink"
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

        {error && <p className="text-red-500 mt-4">{error}</p>}

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
