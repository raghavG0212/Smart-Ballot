const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    aadharNo: {
      type: String,
      required: true,
    },
    voterID: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    voted: {
      type: Boolean,
      default: false,
    },
    votedTo: {
      name: {
        type: String,
        default: "",
      },
      partyName: {
        type: String,
        default: "",
      },
      partyLogo:{
        type:String,
        default:"",
      }
    },
  },
  { timestamps: true }
);
const VoterModel = mongoose.model("voter", voterSchema);

module.exports = VoterModel;
