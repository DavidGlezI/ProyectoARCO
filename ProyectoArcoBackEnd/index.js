

const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const PORT = 3001;




const app = express();

app.use(bodyParser.json());

// endpoints


app.get("/api", (req, res)=>{
    res.json({
        message: "Hello from the server side"
    });
});



app.post("/api/characters", (req, res)=>{
    console.log("El cuerpo de la peticion es:", req.body);
    res.sendStatus(200);

})

app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
});




// SQL

const mysql = require("mysql");

const database = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    port : "3306",
    database : "kueski"

})

database.connect((error, s)=>{
    console.log(error);
});

function db_query(query){
    try{
        return new Promise((resolve, reject) => {
          database.query(query, function (err, result) {
                if (err) throw err;
                resolve(Object.values(result));
            });
          });
    }catch(except){}
  }



getUsers = async (req, res)=>{
    const response = await db_query("SELECT user_id, email, user_fname, user_first_lname, curp FROM users; ");
    res.json(response);
    res.end();
}

getUserAccesoId= async (req, res)=>{
  const {id} = req.params;
  const response = await db_query(`
  SELECT 
  users.user_id, user_fname, user_first_lname, user_second_lname, born_date, nationality, state_of_birth, 
  economic_activity, curp , gender, phone_number, email, is_client, country,  state, city, neighborhood, zip_code, street, ext_number, int_number
  FROM users
  INNER JOIN addresses on addresses.user_id = users.user_id
  WHERE users.user_id = ${id}; `);
  console.log(id);
  res.json(response);
  res.end();
}

getUser = async (req, res)=>{
    const {id} = req.params;
    const response = await db_query(`SELECT user_id, email, user_fname, user_first_lname, curp FROM users WHERE user_id = ${id}; `);
    res.json(response);
    res.end();
}



app.get("/api/users", getUsers);
app.get("/api/userA/:id", getUserAccesoId);
app.get("/api/user/:id", getUser);




