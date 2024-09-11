import { Button, Card, Modal, Table,Spinner } from "flowbite-react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import AdminDropdown from "./AdminDropdown";
import { useEffect, useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminMainDash() {
 const [candidates, setCandidates] = useState([]);
 const [totalParties, setTotalParties] = useState(0);
 const [totalVotes, setTotalVotes] = useState(0);
 const currentUser = useSelector((state) => state.auth.currentUser);
 const [admins, setAdmins] = useState([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const [openDeleteModal, setOpenDeleteModal] = useState(false);
 const [adminToDelete, setAdminToDelete] = useState(null);
 const candidateNames = candidates.map((candidate) => candidate.name);
 const candidateVotes = candidates.map((candidate) => candidate.votes);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/api/v1/admin/getAdmins"
        );
        setAdmins(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load admins");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/api/v1/candidate/getCandidates"
        );
        const candidatesData = response.data;
        setCandidates(candidatesData);
        const Parties = new Set(
          candidatesData.map((candidate) => candidate.partyName.trim().toLowerCase())
        );
        setTotalParties(Parties.size);
        const totalVotesCount = candidatesData.reduce(
          (acc, candidate) => acc + candidate.votes,
          0
        );
        setTotalVotes(totalVotesCount);

        setLoading(false);
      } catch (err) {
        setError("Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const data = {
    labels: candidateNames,
    datasets: [
      {
        label: "Votes Distribution",
        data: candidateVotes,
        backgroundColor: [
          "#00008B",
          "#8B0000",
          "#008000",
          "#FF4500",
          "#352b63",
          "#9b27a4",
        ],
        hoverBackgroundColor: [
          "#00008B",
          "#8B0000",
          "#008000",
          "#FF4500",
          "#352b63",
          "#9b27a4",
        ],
        BorderColor: "#000000",
        hoverBorderWidth: 3,
        hoverOffset: 40, 
      },
    ],
  };
  const handleAdminDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/admin/delete-admin/${adminToDelete}`
      );
      setOpenDeleteModal(false);
      const updatedAdmins = await axios.get(
        "http://localhost:4000/api/v1/admin/getAdmins"
      );
      setAdmins(updatedAdmins.data);
      setTimeout(() => {
        alert(response.data.message);
      }, 300);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 400) {
        alert("Cannot delete Admin");
      } else if (err.response?.status === 404) {
        alert("Admin not found.");
      } else {
        setError(err.response?.data?.message || "Error deleting admin");
      }
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen">
      <AdminSidebar className="h-full" />
      <div className="flex flex-col flex-grow h-full">
        <div>
          <AdminDropdown />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 p-4 md:p-6 italic">
          <Card className="text-center bg-slate-200 shadow-lg">
            <h5 className="text-xl font-bold">Total Candidates</h5>
            <p className="text-2xl text-blue-700">{candidates.length}</p>
          </Card>
          <Card className="text-center bg-slate-200 shadow-lg">
            <h5 className="text-xl font-bold ">Total Parties</h5>
            <p className="text-2xl text-blue-700">{totalParties}</p>
          </Card>
          <Card className="text-center bg-slate-200 shadow-lg">
            <h5 className="text-xl font-bold ">
              Total Votes
              <span className="text-xs ml-1 text-red-500">(Till date)</span>
            </h5>
            <p className="text-2xl text-blue-700">{totalVotes}</p>
          </Card>
          <Card className="text-center bg-slate-200 shadow-lg">
            <h5 className="text-xl font-bold">Total Admins</h5>
            <p className="text-2xl text-blue-700">{admins.length}</p>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 m-3 p-6">
          <Card className="bg-slate-200 shadow-lg">
            <h1 className="text-3xl font-semibold text-center mb-8 capitalize italic">
              Manage Admins
            </h1>
            {loading ? "loading..." : ""}
            {error}
            <Table className="border border-black bg-slate-100 ">
              <Table.Head>
                <Table.HeadCell className="border-r">Name</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {admins.map((admin) => (
                  <Table.Row key={admin._id}>
                    <Table.Cell className="border-r font-semibold text-black">
                      {admin.name}
                    </Table.Cell>
                    <Table.Cell>
                      {currentUser._id === admin._id ? (
                        <RiDeleteBin2Line className="text-2xl text-gray-300" />
                      ) : (
                        <button
                          className="text-gray-800"
                          onClick={() => {
                            setAdminToDelete(admin._id);
                            setOpenDeleteModal(true);
                          }}
                        >
                          <RiDeleteBin2Line className="text-2xl hover:text-red-500" />
                        </button>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card>
          <Card className="bg-slate-200 shadow-lg">
            <h5 className="text-3xl font-semibold mb-4 text-center capitalize italic">
              Votes Wagon Wheel
            </h5>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && <Pie data={data} />}
          </Card>
        </div>
      </div>

      {/* Modal */}
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
              Are You Sure ?
            </h3>
            <div className="flex justify-center gap-8">
              <Button color="success" outline onClick={handleAdminDelete}>
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