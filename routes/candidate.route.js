const express= require('express');
const {
  createCandidate,
  updateCandidate,
  getCandidate,
  deleteCandidate,
  getAllCandidates,
} = require("../controllers/candidate.controller");
const router= express.Router();

router.post('/create-candidate',createCandidate);
router.get("/get-candidate/:id", getCandidate);
router.put("/update-candidate/:id", updateCandidate);
router.delete("/delete-candidate/:id", deleteCandidate);
router.get('/getCandidates',getAllCandidates);

module.exports= router;
