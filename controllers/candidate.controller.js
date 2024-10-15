const CandidateModel = require("../models/candidate.model");
const { errorHandler } = require("../utils/error");

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

const createCandidate = async (req, res,next) => {
  try {
    const { name, dob, nationality, partyName, partyLogo } = req.body;
    const age = calculateAge(dob);
    if (age < 35) {
      return next(errorHandler(400,'Age must be above 35'));
    }
    if (nationality != "Indian") {
      return next(errorHandler(400, "Candidate must be Indian"));
    }
    const existingCandidateName = await CandidateModel.findOne({ name });
    const existingCandidatePartyName = await CandidateModel.findOne({
      partyName,
    });
    const existingDOB = await CandidateModel.findOne({ dob });
    if (existingCandidateName && existingCandidatePartyName && existingDOB) {
      return next(errorHandler(400, "Candidate already exists"));
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
    next(err);
  }
};

const getCandidate = async (req, res,next) => {
  const { id } = req.params;
  try {
    const candidate = await CandidateModel.findById(id);
    if (!candidate) {
      return next(errorHandler(404, "Candidate not found"));
    }
    res.status(200).json(candidate);
  } catch (err) {
    next(err);
  }
};

const updateCandidate = async (req, res,next) => {
  const { id } = req.params;
  const { name, partyName, partyLogo } = req.body;

  try {
    const updatedCandidate = await CandidateModel.findByIdAndUpdate(
      id,
      { name, partyName, partyLogo },
      { new: true, runValidators: true }
    );
    if (!updatedCandidate) {
      return next(errorHandler(404, "Candidate not found"));
    }
    res.status(200).json({
      message: "Details updated successfully",
      candidate: updatedCandidate,
    });
  } catch (err) {
     next(err);
  }
};

const deleteCandidate = async (req, res,next) => {
  const { id } = req.params;

  try {
    const totalVotesResult = await CandidateModel.aggregate([
      { $group: { _id: null, totalVotes: { $sum: "$votes" } } },
    ]);
    const totalVotes = totalVotesResult[0]?.totalVotes || 0;
    const candidate = await CandidateModel.findById(id);
    if (!candidate) {
      return next(errorHandler(404, "Candidate not found"));
    }
    if (totalVotes > 0 && candidate.votes >= totalVotes / 2) {
      return next(errorHandler(400, "This candidate cannot be deleted"));
    }
    await CandidateModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const getAllCandidates = async (req, res,next) => {
  try {
    const candidates = await CandidateModel.find();
    res.status(200).json(candidates);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCandidate,
  updateCandidate,
  getCandidate,
  deleteCandidate,
  getAllCandidates,
};
