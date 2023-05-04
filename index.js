
const path = require("path");
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// endpoints


// app.get("/api", (req, res)=>{
//     res.json({
//         message: "Hello from the server side"
//     });
// });



// app.post("/api/characters", (req, res)=>{
//     console.log("El cuerpo de la peticion es:", req.body);
//     res.sendStatus(200);

// })




// Tenemos que ver qué usar para esta línea porque no jala
// así con lo que tenía el profe
// Sin esta línea jala en local, pero no se ha
// encontrado la manera de que jale en Heroku
app.use(express.static(path.resolve(__dirname, '/ProyectoArco/build')));







// SQL



if (process.env.DATABASE_URL) {// o puede ser CLEARDB_DATABASE_URL
    var database = mysql.createPool({
        host : "us-cdbr-east-06.cleardb.net",
        user : "b553cca6095053",
        password : "3b8ea0c6",
        database : "heroku_09dd07483fcb6fb"
    });
} else { 
    var database = mysql.createConnection({
        host : "localhost",
        user : "root",
        password : "",
        port : "3306",
        database : "kueski"
    }); 
}

// module.exports = database;

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
    const {search, busqueda} = req.query
    const response = await db_query(`
        SELECT user_id, email, user_fname, user_first_lname, curp FROM users 

        WHERE (
            TRUE
            ${search == undefined ? "" : ` AND INSTR(users.curp, ${JSON.stringify(search)})`}
        )
        ORDER BY user_fname ${busqueda == "1" ? "asc" : "desc"}
        `
        );
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
  res.json(response[0]);
  res.end();
}


putUserAccesoId= async (req, res)=>{
    const {id} = req.params;
    let {user_fname,
        user_first_lname,
        user_second_lname,
        born_date,
        nationality,
        state_of_birth,
        economic_activity,
        curp,
        gender,
        phone_number,
        email,
        is_client,
        country,
        state,
        city,
        neighborhood,
        zip_code,
        street,
        ext_number,
        int_number} = req.body;

        //born_date = Date(born_date).toString();
        born_date= String(born_date).substring(0,10);
        
    const response = await db_query(`
    UPDATE users
        SET
        user_fname = "${user_fname}",
        user_first_lname = "${user_first_lname}",
        user_second_lname = "${user_second_lname}",
        born_date = "${born_date}",
        nationality  = "${nationality}",
        state_of_birth = "${state_of_birth}",
        economic_activity = "${economic_activity}",
        curp = "${curp}",
        gender = "${gender}",
        phone_number = "${phone_number}",
        email = "${email}",
        is_client = "${is_client}"
        WHERE users.user_id = ${id}; 
        
         `
    );
    const response2 = await db_query(`
    UPDATE addresses
        SET
        country = "${country}",
        state = "${state}",
        city = "${city}",
        neighborhood= "${neighborhood}",
        zip_code = "${zip_code}",
        street = "${street}",
        ext_number = "${ext_number}",
        int_number  = ${JSON.stringify(int_number || null)}
        WHERE addresses.user_id = ${id};
        `);

    res.json(response[0]);
    res.end();
  }

getUser = async (req, res)=>{
    const {id} = req.params;
    const response = await db_query(`SELECT user_id, email, user_fname, user_first_lname, curp FROM users WHERE user_id = ${id}; `);
    res.json(response);
    res.end();
}

postPeticiones = async(req, res)=>{
    const {userid, derecho} = req.params;
    await db_query(`INSERT INTO solved_petitions(user_id, user_right) VALUES(${userid}, "${derecho}")`)
}

// Hacer el front de esto
getPeticiones = async (req, res)=>{
    
    const response = await db_query(`SELECT petition_id, solved_petitions.user_id, user_right, user_fname, user_first_lname, curp, solved_petitions.created_at
    FROM solved_petitions
    INNER JOIN
    users on users.user_id = solved_petitions.user_id;`);
    res.json(response);
    res.end();
}



app.get("/api/users", getUsers);
app.get("/api/userA/:id", getUserAccesoId);
app.get("/api/user/:id", getUser);
app.get("/api/peticiones", getPeticiones);
app.post("/api/peticiones/:userid/:derecho", postPeticiones);
app.put("/api/userA/:id", putUserAccesoId);


//  ***** Peticiones get que no manejamos ******

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
});