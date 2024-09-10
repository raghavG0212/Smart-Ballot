import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import VoterSideBar from "./VoterSidebar";
import VoterDropDown from "./VoterDropdown";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { setVoteCasted } from "../../redux/authSlice";

export default function VoterDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const voteCasted = useSelector((state) => state.auth.voteCasted);
  const [candidateID, setCandidateID] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/api/v1/candidate/getCandidates"
        );
        setCandidates(response.data);
      } catch (err) {
        setError("Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const handleVoteExecution = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/v1/voter/cast-vote",
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
        alert(response.data.message || "An error occured");
      }
    } catch (err) {
      alert(error.response?.data?.message || "An error occurred");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row">
      <VoterSideBar className="h-full" />
      <div className="flex-grow border-r-2">
        <div>
          <VoterDropDown />
        </div>
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
              {candidates.sort((a, b) => a.name.localeCompare(b.name)).map((candidate) => (
                <Table.Row key={candidate._id}>
                  <Table.Cell className="uppercase font-semibold border-r">
                    {candidate.name}
                  </Table.Cell>
                  <Table.Cell className="border-r">
                    {candidate.partyName}
                  </Table.Cell>
                  <Table.Cell className="hidden sm:table-cell border-r">
                    <div className="ml-3 md:ml-0 880px:ml-3 border-2 h-11 w-16 border-black flex justify-center bg-white dark:border-gray-700">
                      <img
                        src={candidate.partyLogo}
                        alt={candidate.partyName}
                        className="h-10 w-15"
                      />
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {voteCasted ? (
                      <span className="text-lg ml-3">voted</span>
                    ) : (
                      <Button
                        color='purple'
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
                  Yes, I'm sure
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
