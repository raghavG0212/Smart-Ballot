const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  partyName: {
    type: String,
    required: true,
  },
  partyLogo: {
    type: String,
    required: true,
  },
  votes:{
    type:Number,
    default:0
  }
},{timestamps:true});
const CandidateModel = mongoose.model("candidate", candidateSchema);

module.exports = CandidateModel;