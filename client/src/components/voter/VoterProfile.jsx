import React from "react";
import { Label } from "flowbite-react";
import VoterSideBar from "./VoterSidebar";
import VoterDropDown from "./VoterDropdown";
import { useSelector } from "react-redux";
import moment from 'moment';

export default function VoterProfile() {
   const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <div className="flex min-h-screen">
      <VoterSideBar />
      <div className="flex-grow flex-col">
        <VoterDropDown />
        <div className="h-screen p-3 shadow m-6 sm:m-12 border dark:border-blue-950 rounded-lg">
          <h1 className="text-3xl font-semibold text-center uppercase mb-10">
            Your Profile
          </h1>
          <div className="flex flex-row justify-between sm:justify-around">
            <div>
              <div className="p-4 ">
                <Label className="block mb-2 uppercase text-md">
                  User Name
                </Label>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentUser ? currentUser.name : "Not defined"}
                </p>
              </div>
              <div className="p-4 ">
                <Label className="block mb-2 uppercase text-md">Voter ID</Label>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentUser ? currentUser.voterID : "Not defined"}
                </p>
              </div>
              <div className="p-4 ">
                <Label className="block mb-2 uppercase text-md">DOB</Label>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentUser
                    ? moment(currentUser.dob).format("DD/MM/YYYY")
                    : "Not defined"}
                </p>
              </div>
              <div className="p-4 ">
                <Label className="block mb-2 uppercase text-md">
                  Phone Number
                </Label>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentUser ? currentUser.phoneNo : "Not defined"}
                </p>
              </div>
            </div>
            <div className="h-72 w-72 mt-4">
              <img src="/voter.webp" alt="admin"></img>
            </div>
          </div>
          <h1 className="flex justify-center p-8 text-gray-500">
            Details cannot be edited
          </h1>
        </div>
      </div>
    </div>
  );
}
