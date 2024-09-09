//can use later
const mysql= require('mysql2');
const dotenv= require('dotenv');
const colors= require('colors');
dotenv.config();

const connection = mysql.createConnection({
  host: "localhost",
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err)=>{
	if(err){
		console.log("error connecting in database".red);
		return;
	}
	console.log("Database Connected Successfully".green);
})

module.exports= connection;