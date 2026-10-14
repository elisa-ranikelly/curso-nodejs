// CRIA O SERVIDOR E AS ROTAS (IMPORTA O MÓDULO EXPRESS)
const express = require("express");

// EXECUTANDO O EXPRESS
const app = express();

// PERMITE O EXPRESS UTILIZAR O HANDLEBARS COMO TEMPLATE ENGINE
// TEMPLATE ENGINE: PERMITE CRIAR PÁGINAS HTML DINÂMICAS, OU SEJA, PÁGINAS QUE PODEM MUDAR DE ACORDO COM O QUE O USUÁRIO FAZ
const { engine } = require("express-handlebars");

// BODY PARSER: PERMITE O EXPRESS ENTENDER DADOS ENVIADOS PELO USUÁRIO
const bodyParser = require("body-parser");

// CONEXÃO COM O BANCO
const Sequelize = require("sequelize");
const sequelize = new Sequelize("teste", "postgres", "Eelisa2020#", {
    host: "localhost",
    dialect: "postgres"
});

// Config
    // Template Engine
    app.engine("handlebars", engine({defaultLayout: "main"}));
    app.set("view engine", "handlebars");

    // Body Parser
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

// ROTAS
app.get("/", function(req, res){
    res.render("formulario");
});

app.post("/add", (req, res) => {
    const { titulo, conteudo } = req.body;
    res.send(`FORMULÁRIO RECEBIDO - Título: ${titulo}, Conteúdo: ${conteudo}`);
});

app.listen(8081, function(){
    console.log("Servidor rodando...");
});