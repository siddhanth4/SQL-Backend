const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
// Create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "siddhanth",
    password: "Pass@123#",
  });
let getRandomUser = () => {
    return [
     faker.internet.userName(),
     faker.internet.email(),
     faker.internet.password(),
    ];
  };
//HOME PAGE ROUTE:
app.get("/", (req,res) => {
    let q = `SELECT count(*) FROM user`;
    try{
      connection.query(q,(err, results) => {
        if(err) throw err;
        let count = results[0]["count(*)"];
        res.render("home.ejs", {count});
      });
    }catch(err){
      console.log(err);
      res.send("SOME ERROR IN DATABASE");
    }
  });
//SHOW USER ROUTE:
app.get("/user", (req,res) => {
  let q = `SELECT * FROM user`;
  try{
    connection.query(q,(err, users) => {
      if(err) throw err;
      //console.log(results);
      //res.send(results);
      res.render("showusers.ejs", {users});
    });
  }catch(err){
    console.log(err);
    res.send("SOME ERROR IN DATABASE");
  }
}); 
//EDIT USERNAME ROUTE
app.get("/user/:id/edit", (req,res)=> {
  res.render("edit.ejs");
})
  
app.listen("8080", () => {
    console.log(`Server is listinig to port 8080`);
  });

