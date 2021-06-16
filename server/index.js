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
app.post("/api/añadirLogin", (req,res) => {

    const nombre = req.body.nombreUser
    const fecha = req.body.fechaLog

    const sqlInsert = "INSERT INTO `usuarioslogin` (`nombreUsuario`, `fechaLogin`) VALUES (?,?)";   
    db.query(sqlInsert, [nombre,fecha], (err, result) => {
        console.log(result)
    })
});

app.post("/api/guardarMensaje", (req,res) => {

    const idChat = req.body.idChat
    const nombre = req.body.nombreUser
    const mensaje = req.body.mensaje
    const fecha = req.body.fechaLog

    const sqlInsert = "INSERT INTO `mensajeschat` (`idChat`,`nombreUsuario`,`mensajeChat`,`fechaMensaje`) VALUES (?,?,?,?)";   
    db.query(sqlInsert, [idChat,nombre,mensaje,fecha], (err, result) => {
        console.log(err)
    })
});

// app.get("/", (req,res) => {
//     const sqlSelect = "Select * from pruebas"
//     const sqlInsert =  "INSERT INTO `pruebas` (`Nombre`, `apellido`) VALUES ('inception', 'good movie');"
//     db.query(sqlInsert, (err, results) => {
//         res.send(err);
//     })
// });

//Query obtener usuarios por fecha desc
 app.get("/ordernarFecha", (req,res) => {
     const sqlInsert =  "SELECT * FROM usuarioslogin ORDER BY CAST(fechaLogin AS DATE) desc"
    db.query(sqlInsert, (err, results) => {
         res.send(results);
     })
});

//Query obtener usuarios ultima seman
app.get("/ultimaSemana", (req,res) => {
    const sqlInsert =  "SELECT * FROM `usuarioslogin` where CAST(fechaLogin AS DATE)>=date_add((DATE_FORMAT(NOW(), '%Y-%m-%d')), INTERVAL -7 DAY);"
   db.query(sqlInsert, (err, results) => {
        res.send(results);
    })
});

// app.get("/obtenerMes/:id", (req,res) => {
//     var id = req.params.id;
//     const sqlInsert =  "SELECT * FROM `usuarioslogin` where month(CAST(fechaLogin AS DATE))= ?;"
//    db.query(sqlInsert,[id], (err, results) => {
//         res.send(results);
//     })
// });

//Query obtener usuarios por mes
app.get("/obtenerMes/:id", (req,res) => {
    var id = req.params.id;
    const sqlInsert =  "SELECT * FROM `usuarioslogin` where month(CAST(fechaLogin AS DATE))= ?;"
   db.query(sqlInsert,[id], (err, results) => {
        res.send(results);
    })
});

//Query obtener usuarios mes y año
app.get("/obtenerMesYear/:mes", (req,res) => {
    var mes = req.params.mes;
    var año = req.query.año;
    const sqlInsert =  "SELECT * FROM `usuarioslogin` where month(CAST(fechaLogin AS DATE))= ? and year(CAST(fechaLogin AS DATE))= ?;"
   db.query(sqlInsert,[mes,año], (err, results) => {
        res.send(results);
    })
});



//Query obtener ids de chats
app.get("/obtenerChats", (req,res) => {
    const sqlInsert =  "SELECT distinct(idChat) FROM `mensajeschat`;"
   db.query(sqlInsert, (err, results) => {
        res.send(results);
    })
});

//Query obtener todos los mensajes
app.get("/obtenerMensajes", (req,res) => {
    const sqlInsert =  "SELECT * FROM `mensajeschat`;"
   db.query(sqlInsert, (err, results) => {
        res.send(results);
    })
});

//Query obtener todos los mensajes de un chat
app.get("/obtenerMensajes/id/:idChat", (req,res) => {
    var idChat = req.params.idChat;
    const sqlInsert =  "SELECT * FROM `mensajeschat` where idChat = ?;"
   db.query(sqlInsert,[idChat], (err, results) => {
        res.send(results);
    })
});

//Query obtener todos los mensajes de un chat
app.get("/obtenerMensajes/usuario/:usuario", (req,res) => {
    var usuario = req.params.usuario;
    const sqlInsert =  "SELECT * FROM `mensajeschat` where nombreUsuario = ?;"
   db.query(sqlInsert,[usuario], (err, results) => {
       console.log(usuario);
        res.send(results);
    })
});

//Query obtener todos los mensajes de un chat
app.get("/obtenerMensajes/usuario/:usuario/fecha/:fecha", (req,res) => {
    var usuario = req.params.usuario;
    let fecha = req.params.fecha
    const sqlInsert =  "SELECT * FROM `mensajeschat` where nombreUsuario = ? and fechaMensaje = CAST(? AS DATE);"
   db.query(sqlInsert,[usuario,fecha], (err, results) => {
       console.log(usuario);
        res.send(results);
    })
});

//Query obtener todos los mensajes de un chat
app.get("/obtenerUsuarios/chat/:idChat", (req,res) => {
    var idChat = req.params.idChat;
    const sqlInsert =  "SELECT DISTINCT(nombreUsuario) FROM `mensajeschat` where idChat = ?;"
   db.query(sqlInsert,[idChat], (err, results) => {
        res.send(results);
    })
});

app.listen(3001, () => {
  console.log("Servidor corriendo en el puerto 3001")
} )

