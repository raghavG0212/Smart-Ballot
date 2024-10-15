const express = require("express");
const  {signup,login,voteExecutor,getVoter}  = require("../controllers/voter.controller");
const { verifyToken } = require("../utils/verifyUser");
const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/cast-vote',verifyToken,voteExecutor);
router.get('/get-voter',verifyToken,getVoter);

module.exports=router;