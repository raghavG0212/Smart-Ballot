const express = require("express");
const  {updateAdmin,createAdmin,adminLogin} = require("../controllers/admin.contoller");
const router = express.Router();

router.put("/update-admin/:id", updateAdmin);
router.post("/create-admin", createAdmin);
router.post("/admin-login",adminLogin);

module.exports = router;
