import express from "express";
import bodyParser from "body-parser";
import { name } from "ejs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const title = [];
const note = [];

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/new_note", (req, res) => {
    res.render("new_note.ejs");
})

app.post("/submit", (req, res) => {
    const new_title = req.body["title"];
    const new_note = req.body["note"];
    title.push(new_title);
    note.push(new_note);
    
    // console.log(title);
    // console.log(note);

    res.render("index.ejs",{title, note});
})

app.post("/delete", (req, res) => {
    console.log(req.body["update"]);
    const id = parseInt(req.body["delete"]);
    // console.log(typeof(id));
    title.splice(id,1);
    note.splice(id,1);

    console.log(title);

    res.render("index.ejs",{title, note});
})

app.post("/update", (req,res) => {
    const id = parseInt(req.body["update"]);
    const newTitle = title[id];
    const newNote = note[id];

    title.splice(id,1);
    note.splice(id,1);

    res.render("new_note.ejs", {newTitle, newNote});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})