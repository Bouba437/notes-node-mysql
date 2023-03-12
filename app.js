const express = require("express");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const connection = require("express-myconnection");
const notesRoutes = require("./routes/notesRoutes");

const optionBd = {
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "notes_bd"
};

const app = express();

//Extraction des données du formulaire
app.use(express.urlencoded({extended: false}));

// Définition du middleware pour connexion avec la bd
app.use(myConnection(mysql, optionBd, "pool"));

//Définition du moteur de templating
app.set("view engine", "ejs");
// app.set('views', 'views');

//Définition des routes pour notes
app.use(notesRoutes);

app.get("/apropos", (req, res) => {
    res.status(200).render('apropos');
})

app.use((req, res) => {
    res.status(404).render('erreur');
})

app.listen(3002);
console.log("Attente des requetes au port 3002");