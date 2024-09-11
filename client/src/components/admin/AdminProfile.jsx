import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import AdminSidebar from "./AdminSidebar";
import AdminDropdown from "./AdminDropdown";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { setCurrentUser } from "../../redux/authSlice";

export default function AdminProfile() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [loading,setLoading] =useState(false);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(currentUser?.name || "");
  const [password, setPassword] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `/api/v1/admin/update-admin/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: username, password: password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(setCurrentUser(data.admin));
        setLoading(false);
        setOpenEditModal(false);
        setTimeout(()=>{
          alert(data.message);
        },300);  
      } else {
        setLoading(false);
        setTimeout(() => {
          alert(data.message);
        }, 300);
      }
    } catch (error) {
      alert("An error occurred while updating admin details");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen">
      <AdminSidebar className="h-full" />
      <div className="flex-grow">
        <div className="">
          <AdminDropdown />
        </div>
        <div className=" p-3 shadow m-3 sm:m-20 border dark:border-blue-950 rounded-xl ">
          <h1 className="text-4xl font-semibold text-center uppercase mb-16 mt-2">
            Your Profile
          </h1>
          <div className="flex flex-row justify-between md:justify-around">
            <div>
              <div className="p-4">
                <Label className="block mb-2 uppercase text-lg">
                  User Name
                </Label>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentUser ? currentUser.name : "Not defined"}
                </p>
              </div>
              <div className="p-4 ">
                <Label className="block mb-2 uppercase text-lg">Password</Label>
                <p className="text-gray-600 dark:text-gray-400">********</p>
              </div>
            </div>
            <div className="sm:h-72 sm:w-72 h-40 w-40">
              <img src="/admin.webp" alt="admin"></img>
            </div>
          </div>
          <div className="mt-14 flex mb-10 justify-center">
            <Button
              gradientDuoTone="redToYellow"
              onClick={() => setOpenEditModal(true)}
              outline
            >
              Edit Details
            </Button>
          </div>
          <Modal
            show={openEditModal}
            onClose={() => setOpenEditModal(false)}
            size="lg"
          >
            <Modal.Header>Edit Your Details</Modal.Header>
            <Modal.Body>
              <form onSubmit={handleUpdate}>
                <div className="mb-5">
                  <div className="mb-3 block">
                    <Label htmlFor="username" value="Username" />
                  </div>
                  <TextInput
                    id="username"
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <div className="mb-3 block">
                    <Label htmlFor="password" value="Password" />
                  </div>
                  <TextInput
                    id="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-7 flex justify-center">
                  <Button
                    type="submit"
                    gradientDuoTone="purpleToPink"
                    outline
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" />
                        <span className="pl-3">Loading...</span>
                      </>
                    ) : (
                      "Update"
                    )}
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}
