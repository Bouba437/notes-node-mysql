const express = require("express");
const app = express();

//Définition du moteur de templating
app.set("view engine", "ejs");
// app.set('views', 'views');

app.get("/", (req, res) => {
    const heureConnectee = Date().toString();
    const notes = [
        {
            titre: "Création de contenu",
            desc: "Créer le 8e épisode du cours"
        },
        {
            titre: "Education physique",
            desc: "Course à pieds"
        },
    ];
    res.status(200).render('index', {heureConnectee, notes});
})
app.get("/apropos", (req, res) => {
    res.status(200).render('apropos');
})

app.use((req, res) => {
    res.status(404).render('erreur');
})

app.listen(3002);
console.log("Attente des requetes au port 3002");