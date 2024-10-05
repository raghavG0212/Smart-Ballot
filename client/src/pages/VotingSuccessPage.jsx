import { Button, Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function VotingSuccessPage() {
  const [voter, setVoter] = useState({
    votedTo: {
      name: "",
      partyName: "",
      partyLogo: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleFetchVoter = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "/api/v1/voter/get-voter",
          {
            params: { voterID: currentUser.voterID },
          }
        );
        setVoter(response.data);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to fetch voter details"
        );
      } finally {
        setLoading(false);
      }
    };
    handleFetchVoter();
  }, [currentUser.voterID]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-evenly items-center min-h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl mb-5 mt-16 sm:mt-0">You Successfully Voted</h1>
        {!loading && voter && (
          <Table className="mb-16 border-2 divide-y">
            <Table.Head>
              <Table.HeadCell className="border-r">Name</Table.HeadCell>
              <Table.HeadCell className="border-r">Party Name</Table.HeadCell>
              <Table.HeadCell>Party Logo</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Cell className="border-r">
                  {voter.votedTo.name || "not defined"}
                </Table.Cell>
                <Table.Cell className="border-r">
                  {voter.votedTo.partyName || "not defined"}
                </Table.Cell>
                <Table.Cell>
                  <div className="border-2 border-black">
                    <img
                      src={voter.votedTo.partyLogo || "not defined"}
                      height="80px"
                      width="80px"
                      alt="party-image"
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        )}
        <Button color="success" outline size="xl" onClick={handleLogout} className="mb-6 sm:mb-0">
          Logout
        </Button>
      </div>
      <img src="/tick.webp" alt="Tick" height="250px" width="250px" />
    </div>
  );
}
