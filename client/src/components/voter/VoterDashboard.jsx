import { Button, Modal, Spinner, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import VoterSideBar from "./VoterSidebar";
import VoterDropDown from "./VoterDropdown";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { setVoteCasted } from "../../redux/authSlice";
import { FaPersonCircleExclamation } from "react-icons/fa6";
import { toast } from "react-toastify";
import Loader from "../Loader";

export default function VoterDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const voteCasted = useSelector((state) => state.auth.voteCasted);
  const [candidateID, setCandidateID] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "/api/v1/candidate/getCandidates"
        );
        setCandidates(response.data);
      } catch (err) {
        toast.error("Failed to load candidates");
      } finally {
        setTimeout(()=>{
          setLoading(false);
        },500);
      }
    };
    fetchCandidates();
  }, []);

  const handleVoteExecution = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/v1/voter/cast-vote",
        {
          voterID: currentUser.voterID,
          candidateID: candidateID,
        }
      );
      if (response.status === 200) {
        dispatch(setVoteCasted(true));
        setShowModal(false);
        navigate("/voting-success");
      } else {
        toast.error(response.data.message || "Voting cannot be processed.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Voting cannot be processed."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-row">
      <VoterSideBar className="h-full" />
      <div className="flex-grow border-r-2">
        <div>
          <VoterDropDown />
        </div>
        {candidates.length === 0 ? (
          <div className="min-h-screen">
            <div className="flex flex-col gap-4 justify-center items-center h-40 bg-slate-300 dark:bg-slate-800 m-8 rounded-md">
              <FaPersonCircleExclamation className="text-5xl text-red-600" />
              <h1 className="text-4xl font-semibold capitalize italic">
                No Candidates available
              </h1>
            </div>
          </div>
        ) : (
          <div>
            <Table className="w-full min-h-screen dark:text-white">
              <Table.Head>
                <Table.HeadCell className="border-r">Name</Table.HeadCell>
                <Table.HeadCell className="border-r">Party Name</Table.HeadCell>
                <Table.HeadCell className="hidden sm:block border-r">
                  Party Logo
                </Table.HeadCell>
                <Table.HeadCell>
                  <div>Actions</div>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {candidates
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((candidate) => (
                    <Table.Row key={candidate._id}>
                      <Table.Cell className="uppercase font-semibold border-r">
                        {candidate.name}
                      </Table.Cell>
                      <Table.Cell className="border-r">
                        {candidate.partyName}
                      </Table.Cell>
                      <Table.Cell className="hidden sm:table-cell border-r">
                        <div className="ml-3 md:ml-0 880px:ml-3 h-12 w-12 flex justify-center items-center bg-white dark:border-gray-700 rounded-full">
                          <img
                            src={candidate.partyLogo}
                            alt={candidate.partyName}
                            className="h-12 w-12 rounded-full"
                            loading="lazy"
                          />
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        {voteCasted ? (
                          <span className="text-lg ml-3">voted</span>
                        ) : (
                          <Button
                            color="purple"
                            size="sm"
                            onClick={() => {
                              setShowModal(true);
                              setCandidateID(candidate._id);
                            }}
                          >
                            Vote
                          </Button>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        )}
        <Modal
          show={showModal}
          size="md"
          onClose={() => setShowModal(false)}
          popup
          root="show"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are You Sure ?
              </h3>
              <div className="flex justify-center gap-8">
                <Button color="success" onClick={handleVoteExecution}>
                  {loading ? (<div className="flex items-center space-x-1"><Spinner/><span>Loading...</span></div>):("Yes, I'm sure")}
                </Button>
                <Button color="failure" onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
