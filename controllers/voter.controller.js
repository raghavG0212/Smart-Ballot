const VoterModel = require("../models/voter.model");
const CandidateModel = require("../models/candidate.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const generateVoterID = () => {
  return (
    "IND" +
    Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")
  );
};

const signup = async (req, res) => {
  try {
    const { name, dob, phoneNo, aadharNo, password, nationality } = req.body;
    const age = calculateAge(dob);
    if (age < 18) {
      return res.status(400).json({ message: "Voter should be at least 18 years old" });
    }
    if (nationality !== "Indian") {
      return res.status(400).json({ message: "Nationality must be Indian" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should have 8 or more letters" });
    }
    if (aadharNo.length != 12) {
      return res.status(400).json({ message: "Invalid Aadhar No" });
    }
    if (!/^\d{10}$/.test(phoneNo)) {
      return res.status(400).json({ message: "Invalid Phone No" });
    }
    const existingVoter = await VoterModel.findOne({ aadharNo });
    if (existingVoter) {
      return res.status(400).json({ message: "Voter already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const voterID = generateVoterID();
    const newVoter = new VoterModel({
      name,
      dob,
      phoneNo,
      aadharNo,
      voterID,
      password: hashedPassword,
      nationality,
    });
    await newVoter.save();
    res.status(201).json({ message: "Voter ID created successfully", voterID });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const voter = await VoterModel.findOne({
      $or: [{ aadharNo: identifier }, { voterID: identifier }],
    });

    if (!voter) {
      return res.status(400).json({ message: "Voter not registered." });
    }

    const isPasswordValid = await bcrypt.compare(password, voter.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Wrong password." });
    }

    const token = jwt.sign(
      { aadharNo: voter.aadharNo },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: voter.name,
        aadharNo: voter.aadharNo,
        voterID: voter.voterID,
        voted: voter.voted,
        dob: voter.dob,
        phoneNo: voter.phoneNo,
        votedTo: voter.votedTo,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const voteExecutor = async (req, res) => {
  const { voterID, candidateID } = req.body;
  try {
    const voter = await VoterModel.findOne({ voterID });
    if (!voter) {
      return res.status(400).json({ message: "Voter ID not found" });
    }
    if (voter.voted) {
      return res.status(400).json({ message: "You have already voted." });
    }
    const candidate = await CandidateModel.findById({ _id: candidateID });
    if (!candidate) {
      return res.status(400).json({ message: "Candidate does not exist" });
    }

    candidate.votes += 1;
    await candidate.save();

    voter.voted = true;
    voter.votedTo = {
      name: candidate.name,
      partyName: candidate.partyName,
      partyLogo: candidate.partyLogo,
    };
    await voter.save();

    return res.status(200).json({
      message: `You successfully voted ${voter.votedTo.name}`,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const getVoter = async (req, res) => {
  const { voterID } = req.query;
  try {
    const voter = await VoterModel.findOne({ voterID });
    if (!voter) {
      return res.status(400).json({ message: "Voter not found" });
    }
    const { password, ...voterWithoutPassword } = voter.toObject();
    res.status(200).json(voterWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { signup, login, voteExecutor, getVoter };
