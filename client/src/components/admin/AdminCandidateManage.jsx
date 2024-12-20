import {
  Button,
  Label,
  Modal,
  Select,
  Table,
  TextInput,
  Spinner,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle, HiOutlinePencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import AdminSidebar from "./AdminSidebar";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import axios from "axios";
import { FaPersonCircleExclamation } from "react-icons/fa6";
import { toast } from "react-toastify";
import Loader from "../Loader";

export default function AdminDashBoard() {
  const [candidates, setCandidates] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [candidateToEdit, setCandidateToEdit] = useState(null);
  const [candidateToDelete, setCandidateToDelete] = useState(null);
  const [name, setName] = useState("");
  const [partyName, setPartyName] = useState("");
  const [partyLogo, setPartyLogo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    nationality: "",
    partyName: " ",
    partyLogo: null,
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData({
      ...formData,
      [id]: files ? files[0] : value,
    });
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get("/api/v1/candidate/getCandidates");
        setCandidates(response.data);
      } catch (err) {
        toast.error("Failed to load candidates");
      } finally {
        setTimeout(() => {
          setInitialLoading(false);
        }, 500);
      }
    };
    fetchCandidates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let partyLogoURL = "";
      if (formData.partyLogo) {
        const logoRef = ref(storage, `partyLogos/${formData.partyLogo.name}`);
        const snapshot = await uploadBytes(logoRef, formData.partyLogo);
        partyLogoURL = await getDownloadURL(snapshot.ref);
      }
      const response = await axios.post("/api/v1/candidate/create-candidate", {
        name: formData.name,
        dob: formData.dob,
        nationality: formData.nationality,
        partyName: formData.partyName,
        partyLogo: partyLogoURL,
      });
      const updatedCandidates = await axios.get(
        "/api/v1/candidate/getCandidates"
      );
      setCandidates(updatedCandidates.data);
      setOpenCreateModal(false);
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding candidate");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCandidate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let partyLogoURL = "";
      if (partyLogo) {
        const logoRef = ref(storage, `partyLogos/${partyLogo.name}`);
        const snapshot = await uploadBytes(logoRef, partyLogo);
        partyLogoURL = await getDownloadURL(snapshot.ref);
      }
      const response = await fetch(
        `/api/v1/candidate/update-candidate/${candidateToEdit}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name || candidateToEdit.name,
            partyName: partyName || candidateToEdit.partyName,
            partyLogo: partyLogoURL || candidateToEdit.partyLogo,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        const updatedCandidates = await axios.get(
          "/api/v1/candidate/getCandidates"
        );
        setCandidates(updatedCandidates.data);
        setOpenEditModal(false);
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to update candidate details");
      }
    } catch (err) {
      toast.error("Failed to update candidate.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCandidate = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `/api/v1/candidate/delete-candidate/${candidateToDelete}`
      );
      const updatedCandidates = await axios.get(
        "/api/v1/candidate/getCandidates"
      );
      setCandidates(updatedCandidates.data);
      setOpenDeleteModal(false);
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-row">
      <AdminSidebar className="h-full" />
      <div className="flex flex-col flex-grow">
        <div className="min-h-screen">
          {candidates.length === 0 ? (
            <div className="flex flex-col gap-4 justify-center items-center h-40 bg-slate-300 dark:bg-slate-800 m-8 rounded-md ">
              <FaPersonCircleExclamation className="text-5xl text-red-600" />
              <h1 className="text-4xl font-semibold capitalize italic">
                No Candidates added
              </h1>
            </div>
          ) : (
            <div>
              <Table className="border-b dark:text-white  border-black dark:border-white">
                <Table.Head>
                  <Table.HeadCell className="hidden lg:table-cell border-r  border-black dark:border-white">
                    S No.
                  </Table.HeadCell>
                  <Table.HeadCell className="border-r  border-black dark:border-white">
                    Name
                  </Table.HeadCell>
                  <Table.HeadCell className="border-r  border-black dark:border-white hidden 450px:table-cell">
                    Party Name
                  </Table.HeadCell>
                  <Table.HeadCell className="hidden sm:table-cell border-r  border-black dark:border-white">
                    Party Logo
                  </Table.HeadCell>
                  <Table.HeadCell className="border-r  border-black dark:border-white">
                    No. Of Votes
                  </Table.HeadCell>
                  <Table.HeadCell>
                    <div className="md:ml-2">Actions</div>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y divide-black dark:divide-white">
                  {candidates
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((candidate, index) => (
                      <Table.Row key={candidate._id}>
                        <Table.Cell className="text-lg font-bold hidden lg:table-cell align-middle border-r  border-black dark:border-white">
                          {index + 1}
                        </Table.Cell>
                        <Table.Cell className="border-r  border-black dark:border-white">
                          <div className="flex flex-col">
                            <span className="uppercase font-semibold ">
                              {candidate.name}
                            </span>
                            <span className="450px:hidden">
                              ({candidate.partyName})
                            </span>
                          </div>
                        </Table.Cell>
                        <Table.Cell className="border-r hidden 450px:table-cell  border-black dark:border-white">
                          {candidate.partyName}
                        </Table.Cell>
                        <Table.Cell className="hidden sm:table-cell border-r  border-black dark:border-white">
                          <div className="ml-3 md:ml-0 880px:ml-3 h-12 w-12 flex justify-center items-center bg-white dark:border-gray-700 rounded-full">
                            <img
                              src={candidate.partyLogo}
                              alt={candidate.partyName}
                              className="h-12 w-12 rounded-full"
                              loading="lazy"
                            />
                          </div>
                        </Table.Cell>
                        <Table.Cell className="border-r  border-black dark:border-white">
                          {candidate.votes}
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex flex-col md:flex-row md:space-x-2 space-y-1 md:space-y-0">
                            <Button
                              color="success"
                              size="sm"
                              onClick={() => {
                                setOpenEditModal(true);
                                setCandidateToEdit(candidate._id);
                              }}
                            >
                              <HiOutlinePencil />
                            </Button>
                            <Button
                              color="failure"
                              size="sm"
                              onClick={() => {
                                setOpenDeleteModal(true);
                                setCandidateToDelete(candidate._id);
                              }}
                            >
                              <MdDelete />
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
            </div>
          )}
          <div className="flex justify-center mt-20 mb-32">
            <Button
              gradientDuoTone="redToYellow"
              outline
              onClick={() => setOpenCreateModal(true)}
            >
              Add New Candidate
            </Button>
          </div>
        </div>
      </div>

      {/* modals */}
      
      {/* create */}
      <Modal show={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <Modal.Header>Add New Candidate</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <div className="mb-2 block">
                <Label htmlFor="name" value="Full Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Candidate Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-4">
              <div className="mb-2 block">
                <Label htmlFor="dob" value="Date of Birth" />
              </div>
              <TextInput
                id="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-4">
              <div className="mb-2 block">
                <Label htmlFor="nationality" value="Nationality" />
              </div>
              <Select
                id="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select nationality
                </option>
                <option value="Indian">Indian</option>
                <option value="American">American</option>
                <option value="British">British</option>
              </Select>
            </div>
            <div className="my-4">
              <div className="mb-2 block">
                <Label htmlFor="partyName" value="Party Name" />
              </div>
              <TextInput
                id="partyName"
                type="text"
                value={formData.partyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-4">
              <div className="mb-2 block">
                <Label htmlFor="partyLogo" value="Party Logo" />
              </div>
              <input
                id="partyLogo"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
            </div>
            <div className="mt-10 flex justify-center">
              <Button
                gradientDuoTone="purpleToPink"
                outline
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Add Candidate"
                )}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* edit */}
      <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Modal.Header>Edit Candidate Details</Modal.Header>
        <Modal.Body>
          <form>
            <div className="my-4">
              <div className="mb-2 block">
                <Label htmlFor="name" value="Full Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Candidate Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="my-4">
              <div className="mb-2 mx-auto flex">
                <Label htmlFor="dob" value="Date of Birth" />
                <span className="mt-0.5 ml-2 text-xs text-red-600">
                  cannot edit
                </span>
              </div>
              <TextInput id="dob" type="date" disabled />
            </div>
            <div className="my-4">
              <div className="mb-2 flex">
                <Label htmlFor="nationality" value="Nationality" />
                <span className="mt-[3px] ml-2 text-xs text-red-600">
                  cannot edit
                </span>
              </div>
              <Select id="nationality" disabled>
                <option value="" disabled>
                  Select your nationality
                </option>
                <option value="Indian">Indian</option>
                <option value="American">American</option>
                <option value="British">British</option>
              </Select>
            </div>
            <div className="my-4">
              <div className="mb-2 block">
                <Label htmlFor="party-name" value="Party Name" />
              </div>
              <TextInput
                id="party-name"
                type="text"
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
              />
            </div>
            <div className="my-4">
              <div className="mb-2 block">
                <Label htmlFor="party-logo" value="Party Logo" />
              </div>
              <input
                id="party-logo"
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                onChange={(e) => setPartyLogo(e.target.files[0])}
              />
            </div>
            <div className="flex mt-10 space-x-3">
              <Button
                type="submit"
                color="success"
                outline
                onClick={handleEditCandidate}
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
              <Button
                color="failure"
                outline
                onClick={() => setOpenEditModal(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* delete */}
      <Modal
        size="md"
        show={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are You Sure , You Want to Delete this Candidate?
            </h3>
            <div className="flex justify-center gap-8">
              <Button color="success" outline onClick={handleDeleteCandidate}>
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Yes I'm Sure"
                )}
              </Button>
              <Button
                color="failure"
                outline
                onClick={() => setOpenDeleteModal(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
