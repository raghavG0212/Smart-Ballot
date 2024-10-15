const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors= require('cors');
const mongoDB= require('./database/connectDB');
const PORT = process.env.PORT || 4000;
const path = require('path');
// const connection= require('./database/mySqlDb');

//middlewares
dotenv.config();
app.use(express.json());
app.use(cors());

//database
mongoDB();

//routes
app.use("/api/v1/admin", require("./routes/admin.route"));
app.use('/api/v1/voter',require('./routes/voter.route'));
app.use('/api/v1/candidate',require('./routes/candidate.route'));

//deploying
app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client','dist','index.html'));
});

//next(error) implement
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan);
});
