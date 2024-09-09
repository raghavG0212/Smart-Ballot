import { Button, Card, Label, Select } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AlreadyVoted from "./AlreadyVoted";
import { useSelector } from "react-redux";
import { FaCalendarAlt, FaUserAltSlash, FaUserCheck } from "react-icons/fa";

const politiciansByState = {
  "Andhra Pradesh": [
    "Y. S. Jagan Mohan Reddy",
    "N. Chandrababu Naidu",
    "Pawan Kalyan",
  ],
  "Arunachal Pradesh": ["Pema Khandu", "Nabam Tuki", "Kiren Rijiju"],
  " Assam": ["Himanta Biswa Sarma", "Tarun Gogoi", "Sarbananda Sonowal"],
  Bihar: ["Nitish Kumar", "Lalu Prasad Yadav", "Tejashwi Yadav"],
  Chhattisgarh: ["Bhupesh Baghel", "Raman Singh", "Ajit Jogi"],
  Goa: ["Pramod Sawant", "Manohar Parrikar", "Digambar Kamat"],
  Gujarat: ["Narendra Modi", "Amit Shah", "Vijay Rupani"],
  Haryana: [
    "Manohar Lal Khattar",
    "Bhupinder Singh Hooda",
    "Dushyant Chautala",
  ],
  "Himachal Pradesh": ["Jai Ram Thakur", "Virbhadra Singh", "Shanta Kumar"],
  Jharkhand: ["Hemant Soren", "Babulal Marandi", "Shibu Soren"],
  Karnataka: ["B. S. Yediyurappa", "H. D. Kumaraswamy", "Siddaramaiah"],
  Kerala: ["Pinarayi Vijayan", "Oommen Chandy", "K. Karunakaran"],
  "Madhya Pradesh": [
    "Shivraj Singh Chouhan",
    "Jyotiraditya Scindia",
    "Kamal Nath",
  ],
  Maharashtra: ["Uddhav Thackeray", "Devendra Fadnavis", "Sharad Pawar"],
  Manipur: ["N. Biren Singh", "Okram Ibobi Singh", "Thounaojam Shyamkumar"],
  Meghalaya: ["Conrad Sangma", "Mukul Sangma", "P. A. Sangma"],
  Mizoram: ["Zoramthanga", "Lal Thanhawla", "Pu Laldenga"],
  Nagaland: ["Neiphiu Rio", "T. R. Zeliang", "S. C. Jamir"],
  Odisha: ["Naveen Patnaik", "J. B. Patnaik", "Biju Patnaik"],
  Punjab: ["Amarinder Singh", "Parkash Singh Badal", "Bhagwant Mann"],
  Rajasthan: ["Ashok Gehlot", "Vasundhara Raje", "Sachin Pilot"],
  Sikkim: ["Pawan Kumar Chamling", "Prem Singh Tamang", "N. B. Bhandari"],
  "Tamil Nadu": ["M. K. Stalin", "Jayalalithaa", "Karunanidhi"],
  Telangana: ["K. Chandrashekar Rao", "Etela Rajender", "Asaduddin Owaisi"],
  Tripura: ["Manik Sarkar", "Biplab Kumar Deb", "Pradyot Bikram Manikya"],
  "Uttar Pradesh": ["Yogi Adityanath", "Akhilesh Yadav", "Mayawati"],
  Uttarakhand: ["Pushkar Singh Dhami", "Harish Rawat", "Trivendra Singh Rawat"],
  "West Bengal": ["Mamata Banerjee", "Suvendu Adhikari", "Jyoti Basu"],
};

export default function HomePage() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const voteCasted = useSelector((state) => state.auth.voteCasted);
  const [politicians, setPoliticians] = useState([]);

  const handleSelectChange = (e) => {
    const state = e.target.value;
    if (state && politiciansByState[state]) {
      const randomPoliticians = politiciansByState[state]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setPoliticians(randomPoliticians);
    } else {
      setPoliticians([]);
    }
  };
  return (
    <div className="flex-col">
      <div className="flex md:flex-row flex-col md:justify-between">
        {!currentUser ? (
          <div className="flex flex-col space-y-10 items-center text-center justify-center mt-10 md:mt-0 md:text-5xl text-3xl">
            <h1 className="font-bold uppercase">Login To Cast Vote</h1>
            <Link to="/login">
              <Button gradientDuoTone="purpleToPink" outline className="w-52">
                Login As Voter
              </Button>
            </Link>
            <Link to="/admin-login">
              <Button gradientDuoTone="purpleToPink" outline className="w-52">
                Login As Admin
              </Button>
            </Link>
          </div>
        ) : voteCasted ? (
          <div className="w-full">
            <AlreadyVoted />
          </div>
        ) : (
          <div className="flex flex-col ml-10 space-y-10 items-center text-center justify-center mt-10 md:mt-0">
            <div className="flex flex-col">
              <span className="font-bold text-orange-500 md:text-5xl text-4xl mb-3">
                Welcome
              </span>
              <span className="font-bold text-green-600 md:text-4xl text-3xl ">
                {currentUser.name}
              </span>
            </div>
            <Link
              to={isAdmin ? "/admin-candidate-management" : "voter-dashboard"}
            >
              <Button gradientDuoTone="purpleToBlue" outline className="w-52">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        )}
        {currentUser && !isAdmin && voteCasted ? (
          <></>
        ) : (
          <div className="mt-4 sm:mt-20">
            <img src="/main.webp" alt="vote" />
          </div>
        )}
      </div>

      <div className="text-center flex justify-center gap-3 uppercase text-4xl pt-4 pb-4 m-4 mt-10 border border-slate-200  dark:border-teal-600 bg-slate-100 dark:bg-gray-800 rounded-xl">
        <h1 className="font-semibold">Upcoming Elections</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 ">
        <Card className="shadow-lg bg-slate-100">
          <h2 className="text-2xl font-bold text-center mb-2 capitalize">
            assembly elections
          </h2>
          <div className="flex items-center mb-0.5 gap-1">
            <FaCalendarAlt className="mr-2" />
            <p className="font-medium">Registration Deadline: </p>
            <p>Feb 4, 2026</p>
          </div>
          <div className="flex items-center mb-0.5 gap-1">
            <FaCalendarAlt className="mr-2" />
            <p className="font-medium">Voting Period:</p>
            <p>Mar 21 - Mar 29, 2026</p>
          </div>
          <div className="text-center text-indigo-800 dark:text-white">
            <p className="text-xl font-semibold"> Result Announcement:</p>
            <div className="text-4xl font-bold">April 20, 2026</div>
          </div>
          <div className="mt-2">
            <div className="mb-2 block capitalize">
              <Label htmlFor="candidates" value="Confirmed candidates from:" />
            </div>
            <Select id="state" onChange={handleSelectChange} className="mb-2">
              <option value="">-- Select a State --</option>
              {Object.keys(politiciansByState).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
            <ul>
              {politicians.map((politician, index) => (
                <li key={index} className="flex items-center mb-1">
                  <FaUserCheck className="mr-2" />
                  {politician}
                </li>
              ))}
            </ul>
            <div className=" mt-10 flex justify-center">
              <Link to="/">
                <Button gradientMonochrome="info" className="" outline>
                  Know More...
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <Card className="shadow-lg bg-slate-100">
          <h2 className="text-2xl font-bold text-center mb-2">
            Municipal Elections
          </h2>
          <div className="flex items-center mb-0.5 gap-1">
            <FaCalendarAlt className="mr-2" />
            <p className="font-medium">Registration Deadline: </p>
            <p>May 16, 2027</p>
          </div>
          <div className="flex items-center mb-0.5 gap-1">
            <FaCalendarAlt className="mr-2" />
            <p className="font-medium">Voting Period:</p>
            <p>June 2 - July 4, 2027</p>
          </div>
          <div className="text-center text-indigo-800 dark:text-white">
            <p className="text-xl font-semibold"> Result Announcement:</p>
            <div className="text-4xl font-bold">August 11, 2027</div>
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-semibold mb-1">
              Confirmed Candidates:
            </h3>
            <h1 className="mt-2 text-blue-500">To be announced...</h1>
            <div className=" mt-16 flex justify-center items-end">
              <Link to="/">
                <Button gradientMonochrome="info" className="" outline>
                  Know More...
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <Card className="shadow-lg bg-slate-100">
          <h2 className="text-2xl font-bold text-center mb-2">
            General Elections
          </h2>
          <div className="flex items-center mb-0.5 gap-1">
            <FaCalendarAlt className="mr-2" />
            <p className="font-medium">Registration Deadline: </p>
            <p>Dec 20, 2028</p>
          </div>
          <div className="flex items-center mb-0.5 gap-1">
            <FaCalendarAlt className="mr-2" />
            <p className="font-medium">Voting Period:</p>
            <p>Jan 10 - Jan 20, 2029</p>
          </div>
          <div className="text-center text-violet-800 dark:text-white">
            <p className="text-xl font-semibold"> Result Announcement:</p>
            <div className="text-4xl font-bold">February 6, 2029</div>
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-semibold">Confirmed Candidates:</h3>
            <h1 className="mt-2 text-blue-500">To be announced...</h1>
            <div className=" mt-16 flex justify-center items-end">
              <Link to="/">
                <Button gradientMonochrome="info" className="" outline>
                  Know More...
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      <div className="text-center flex justify-center gap-3 uppercase text-4xl pt-4 pb-4 m-4 mt-10 border border-slate-200  dark:border-teal-600 bg-slate-100 dark:bg-gray-800 rounded-xl">
        <h1 className="font-semibold">FAQ'S</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 mb-10">
        <Card className="shadow-lg bg-slate-100 capitalize" horizontal>
          <h2 className="text-2xl font-bold text-center mb-10">
            Eligibility for Candidates
          </h2>
          <div className="p-3">
            <div className="flex items-center mb-4">
              <span className="font-semibold mr-2 text-green-500">
                <FaUserCheck />
              </span>
              <p> an Indian citizen.</p>
            </div>
            <div className="flex items-center mb-4">
              <span className=" font-semibold mr-2 text-green-500">
                <FaUserCheck />
              </span>
              <p> at least 35 years old.</p>
            </div>
            <div className="flex items-center mb-4">
              <span className=" font-semibold mr-2 text-green-500">
                <FaUserCheck />
              </span>
              <p> a registered voter in the constituency. </p>
            </div>
            <div className="flex items-center mb-4">
              <span className=" font-semibold mr-2 text-red-500">
                <FaUserAltSlash />
              </span>
              <p className="line-through">
                Holding any office of profit under the Government.
              </p>
            </div>
            <div className="flex items-center mb-8">
              <span className=" font-semibold mr-2 text-red-500">
                <FaUserAltSlash />
              </span>
              <p className="line-through">Have a criminal record.</p>
            </div>
          </div>
        </Card>
        <Card className="shadow-lg bg-slate-100 capitalize" horizontal>
          <h2 className="text-2xl font-bold text-center mb-10">
            Eligibility for Voters
          </h2>
          <div className="p-3 mb-4">
            <div className="flex items-center mb-4">
              <span className="font-semibold mr-2 text-green-500">
                <FaUserCheck />
              </span>
              <p> an Indian citizen.</p>
            </div>
            <div className="flex items-center mb-4">
              <span className=" font-semibold mr-2 text-green-500">
                <FaUserCheck />
              </span>
              <p> at least 18 years old.</p>
            </div>
            <div className="flex items-center mb-4">
              <span className=" font-semibold mr-2 text-green-500">
                <FaUserCheck />
              </span>
              <p> registered as a voter in the relevant constituency</p>
            </div>
            <div className="flex items-center mb-4">
              <span className=" font-semibold mr-2 text-red-500">
                <FaUserAltSlash />
              </span>
              <p className="line-through">Convicted of certain offenses.</p>
            </div>
            <div className="flex items-center mb-4">
              <span className=" font-semibold mr-2 text-red-500">
                <FaUserAltSlash />
              </span>
              <p className="line-through">Declared legally incompetent.</p>
            </div>
          </div>
        </Card>
        <Card className="shadow-lg text-sm bg-slate-100" horizontal>
          <h2 className="text-2xl font-bold text-center mb-1">
            Voting System Updates
          </h2>
          <div className="p-2">
            <div className="mb-2">
              <p className="text-lg font-semibold mb-1">
                Update 1: New Voting Procedures
              </p>
              <p>
                New voting procedures have been introduced to streamline the
                process and reduce wait times. Please check the official website
                for detailed instructions.
              </p>
            </div>
            <div className="mb-2">
              <p className="text-lg font-semibold mb-1">
                Update 2: Extended Voting Hours
              </p>
              <p>
                Voting hours have been extended to accommodate more voters.
                Online polling will now be open from 7 AM to 8 PM on election
                day.
              </p>
            </div>
            <div className="mb-2">
              <p className="text-lg font-semibold mb-1">
                Update 3: New Voter ID Req.
              </p>
              <p>
                New voter ID requirements are in place. Ensure you have the
                updated documentation before proceeding.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
