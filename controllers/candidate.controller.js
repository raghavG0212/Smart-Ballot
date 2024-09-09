const CandidateModel = require("../models/candidate.model");

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

const createCandidate = async (req, res) => {
  try {
    const { name, dob, nationality, partyName, partyLogo } = req.body;
    const age = calculateAge(dob);
    if (age < 35) {
      return res.status(400).json({ message: "Age  atleast 35." });
    }
    if (nationality != "Indian") {
      return res.status(400).json({ message: "Candidate  Indian." });
    }
    const existingCandidateName = await CandidateModel.findOne({ name });
    const existingCandidatePartyName = await CandidateModel.findOne({
      partyName,
    });
    const existingDOB = await CandidateModel.findOne({ dob });
    if (existingCandidateName && existingCandidatePartyName && existingDOB) {
      return res.status(400).json({ message: "Candidate already exists" });
    }
    const newCandidate = new CandidateModel({
      name,
      dob,
      nationality,
      partyName,
      partyLogo,
    });
    await newCandidate.save();
    res.status(200).json({ message: "Candidate added to the list" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await CandidateModel.findById(id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.status(200).json(candidate);
  } catch (err) {
    res.status(500).json({ message: "Server eror", error: err.message });
  }
};

const updateCandidate = async (req, res) => {
  const { id } = req.params;
  const { name, partyName, partyLogo } = req.body;

  try {
    const updatedCandidate = await CandidateModel.findByIdAndUpdate(
      id,
      { name, partyName, partyLogo },
      { new: true, runValidators: true }
    );
    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.status(200).json({
      message: "Details updated successfully",
      candidate: updatedCandidate,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating details", error: err.message });
  }
};

const deleteCandidate = async (req, res) => {
  const { id } = req.params;

  try {
    const totalVotesResult = await CandidateModel.aggregate([
      { $group: { _id: null, totalVotes: { $sum: "$votes" } } },
    ]);
    const totalVotes = totalVotesResult[0]?.totalVotes || 0;
    const candidate = await CandidateModel.findById(id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    if (totalVotes > 0 && candidate.votes >= totalVotes / 2) {
      return res
        .status(400)
        .json({
          message: "Cannot delete candidate with 50% or more of total votes",
        });
    }
    await CandidateModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting candidate", error: err.message });
  }
};

const getAllCandidates = async (req, res) => {
  try {
    const candidates = await CandidateModel.find();
    res.status(200).json(candidates);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createCandidate,
  updateCandidate,
  getCandidate,
  deleteCandidate,
  getAllCandidates,
};
