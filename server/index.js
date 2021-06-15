const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const { AudioOutlined } = require('@ant-design/icons');

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
     const sqlInsert =  "SELECT * FROM `usuarioslogin` ORDER BY CAST('fechaLogin' AS DATE);"
    db.query(sqlInsert, (err, results) => {
         res.send(err);
     })
});

app.get("/get/lastSevenDays", (req,res) => {
    const sqlInsert =  "SELECT * FROM `usuarioslogin` where fechaLogin>=date_add((DATE_FORMAT(NOW(), '%Y-%m-%d')), INTERVAL -7 DAY);"
   db.query(sqlInsert, (err, results) => {
        res.send(err);
    })
});

app.get("/get/monthMay", (req,res) => {
    const sqlInsert =  "SELECT * FROM `usuarioslogin` where where month(fechaLogin)=05;"
   db.query(sqlInsert, (err, results) => {
        res.send(err);
    })
});


app.listen(3001, () => {
  console.log("Servidor corriendo en el puerto 3001")
} )

