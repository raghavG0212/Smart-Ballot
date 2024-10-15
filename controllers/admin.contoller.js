const AdminModel= require('../models/admin.model');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const { errorHandler } = require("../utils/error");

const createAdmin = async (req, res,next) => {
  try {
    const { name, password } = req.body;
    const existingAdmin = await AdminModel.findOne({ name });

    if (existingAdmin) {
      return next(errorHandler(400, "Admin already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new AdminModel({
      name,
      password: hashedPassword,
    });

    await newAdmin.save();
	  console.log("Admin created successfully");
    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    next(err);
  }
};

const adminLogin = async (req, res,next) => {
  try {
    const { name, password } = req.body;
    const isAdmin = await AdminModel.findOne({ name });

    if (!isAdmin) {
      return next(errorHandler(400, "Wrong credentials"));
    }

    const correctPassword = await bcrypt.compare(password, isAdmin.password);
    if (!correctPassword) {
      return next(errorHandler(400, "Wrong password"));
    }
     const token = jwt.sign({ id: isAdmin._id }, process.env.JWT_SECRET_KEY);
     const expiryDate = new Date(Date.now() + 7200000);

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .json({
        message: "Login successful",
        user: {
          name: isAdmin.name,
          _id: isAdmin._id,
        },
      });
  } catch (err) {
    next(err);
  }
};

const updateAdmin= async(req,res,next)=>{
	const {id}= req.params;
	const {name,password}= req.body;
	try{
		const hashedPassword= await bcrypt.hash(password,10);
		const updatedAdmin= await AdminModel.findByIdAndUpdate(id,
			{name,password:hashedPassword},
			{new:true,runValidators:true}
		);
		if(!updatedAdmin){
			return next(errorHandler(404, "Admin not found"));
		}
		res.status(200).json({message:'Details updated successfully',admin:updatedAdmin})
	}
	catch(err){
    next(err);
	}

}

const getAllAdmins = async (req, res,next) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).json(admins);
  } catch (err) {
    next(err);
  }
};

const deleteAdmin = async (req, res,next) => {
  const { id } = req.params;

  try {
    const admin = await AdminModel.findById(id);
    if (!admin) {
      return next(errorHandler(404, "Admin not found"));
    }
    await AdminModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports= {createAdmin,updateAdmin,adminLogin,getAllAdmins,deleteAdmin};
