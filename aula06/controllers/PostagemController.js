const express = require("express");
const app = express();

const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");

const Post = require("../models/Postagem");

app.engine("handlebars", engine({defaultLayout: "main"}));
app.set("views", "../views");
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function(req, res){
    Post.findAll().then(function(posts){
        res.render("home", {posts: posts});
    }).catch(function(erro){
        res.send("Houve um erro: " + erro);
    });
});

app.get("/cad", function(req, res){
    res.render("formulario");
});

app.post("/add", (req, res) => {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(() => {
        res.redirect("/");
    }).catch((erro) => {
        res.send("Houve um erro: " + erro);
    });
});

app.get("/deletar/:id", (req, res) => {
    Post.destroy({where: {"id": req.params.id}}).then(() => {
        res.redirect("/");
    }).catch((erro) => {
        res.send("Houve um erro: " + erro);
    });
});

app.listen(8081, function(){
    console.log("Servidor rodando...");
});