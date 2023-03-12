const express = require("express");
const mysql = require("mysql");
const myConnection = require("express-myconnection");

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

app.get("/", (req, res) => {

    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log(erreur);
        } else {
            connection.query("SELECT * FROM notes", [], (erreur, resultat) => {
                if(erreur) {
                    console.log(erreur);
                } else {
                    res.status(200).render('index', {resultat});
                }
            })
        }
    })

})

//Création de notes
app.post("/notes", (req, res) => {
    let titre = req.body.titre;
    let description = req.body.description;

    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log(erreur);
        } else {
            connection.query("INSERT INTO notes(id, titre, description) VALUES(?,?,?)", [null, titre, description], (erreur, resultat) => {
                if(erreur) {
                    console.log(erreur);
                } else {
                    res.status(300).redirect("/");
                }
            })
        }
    })
})


app.get("/apropos", (req, res) => {
    res.status(200).render('apropos');
})

app.use((req, res) => {
    res.status(404).render('erreur');
})

app.listen(3002);
console.log("Attente des requetes au port 3002");