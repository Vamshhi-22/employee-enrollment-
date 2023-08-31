console.log("hello");
const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
const connection = mysql.createConnection({
  port: 3306,
  user: "root",
  host: "localhost",
  password: "123456",
  database: "databasedb2",
});
connection.connect((err) => {
  if (!err) {
    console.log("database connected");
  } else {
    console.log("database not connected");
  }
});
app.listen(8080, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log("port number is 8080");
  }
});

app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  if (req) {
    query =
      "SELECT id,name,mobileNumber,emailId,salary,departmentId,city FROM employee_details WHERE id=? ";
  }
  connection.query(query, [id], (err, result) => {
    if (!err) {
      if (result.length === 0) {
        return res.status(404).json({ message: "Employee data not found" });
      }
      return res.status(200).json(result[0]); // Assuming ID is unique
    } else {
      return res.status(500).json(err);
    }
  });
});

app.use("/get", (req, res) => {
  if (req) {
    query = "SELECT * FROM employee_details ";
    connection.query(query, (err, result) => {
      if (!err) {
        if (result.length <= 0) {
          return res.status(404).json({ message: "employee data not found" });
        }
        return res.status(200).json(result);
      } else {
        return res.status(500).json(err);
      }
    });
  }
});
app.use("/edit", (req, res) => {
  const editEmployeeDetails = req.body;
  const query =
    "UPDATE employee_details SET name=?,mobileNumber=?,emailId=?,departmentId=?,city=?,salary=? WHERE id= ? ";
  const values = [
    editEmployeeDetails.name,
    editEmployeeDetails.emailId,
    editEmployeeDetails.salary,
    editEmployeeDetails.id,
    editEmployeeDetails.departmentId,
    editEmployeeDetails.city,
  ];
  connection.query(query, values, (err, res) => {
    if (!err) {
      // console.error(err);
      if (result.affectedRows <= 0) {
        return res.status(404).json({ message: "something went wrong" });
      }
      return res
        .status(200)
        .json({ message: "Employee data edited successfully" });
    } else {
      return res.status(500).json({ message: "Failed to edit employee data" });
    }
  });
});
