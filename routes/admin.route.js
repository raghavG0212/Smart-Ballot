const express = require("express");
const  {updateAdmin,createAdmin,adminLogin,getAllAdmins,deleteAdmin} = require("../controllers/admin.contoller");
const { verifyToken } = require("../utils/verifyUser");
const router = express.Router();

router.put("/update-admin/:id",verifyToken,updateAdmin);
router.post("/create-admin", createAdmin);
router.post("/admin-login",adminLogin);
router.get("/getAdmins",verifyToken,getAllAdmins);
router.delete("/delete-admin/:id",verifyToken,deleteAdmin);

module.exports = router;
