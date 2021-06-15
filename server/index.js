const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "chitchatdb",
    insecureAuth : true
});


app.use(bodyParser.urlencoded({extended: true}))

app.use(cors());
app.use(express.json());
app.post("/api/insert", (req,res) => {

    const nombre = req.body.nombreUser
    const fecha = req.body.fechaLog

    const sqlInsert = "INSERT INTO `usuarioslogin` (`nombreUsuario`, `fechaLogin`) VALUES (?,?)";   
    db.query(sqlInsert, [nombre,fecha], (err, result) => {
        console.log(result)
    })
});

// app.get("/", (req,res) => {
//     const sqlSelect = "Select * from pruebas"
//     const sqlInsert =  "INSERT INTO `pruebas` (`Nombre`, `apellido`) VALUES ('inception', 'good movie');"
//     db.query(sqlInsert, (err, results) => {
//         res.send(err);
//     })
// });

 app.get("/mes/", (req,res) => {
     const sqlInsert =  "SELECT * FROM usuarioslogin ORDER BY CAST(fechaLogin AS DATE) desc"
    db.query(sqlInsert, (err, results) => {
         res.send(results);
     })
});

app.get("/ultimaSemana", (req,res) => {
    const sqlInsert =  "SELECT * FROM `usuarioslogin` where CAST(fechaLogin AS DATE)>=date_add((DATE_FORMAT(NOW(), '%Y-%m-%d')), INTERVAL -7 DAY);"
   db.query(sqlInsert, (err, results) => {
        res.send(results);
    })
});

app.get("/obtenerMes/:id", (req,res) => {
    var id = req.params.id;
    const sqlInsert =  "SELECT * FROM `usuarioslogin` where month(CAST(fechaLogin AS DATE))= ?;"
   db.query(sqlInsert,[id], (err, results) => {
        res.send(results);
    })
});


app.listen(3001, () => {
  console.log("Servidor corriendo en el puerto 3001")
} )

