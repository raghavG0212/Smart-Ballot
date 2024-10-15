const express= require('express');
const {
  createCandidate,
  updateCandidate,
  getCandidate,
  deleteCandidate,
  getAllCandidates,
} = require("../controllers/candidate.controller");
const router= express.Router();
const { verifyToken } = require("../utils/verifyUser");

router.post('/create-candidate',verifyToken, createCandidate);
router.get("/get-candidate/:id",verifyToken, getCandidate);
router.put("/update-candidate/:id", verifyToken,updateCandidate);
router.delete("/delete-candidate/:id", verifyToken,deleteCandidate);
router.get('/getCandidates',verifyToken,getAllCandidates);

module.exports= router;
