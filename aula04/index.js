const express = require("express");
const app = express();

// Send -> envia a mensagem
// SendFile -> envia o arquivo
// Dirname -> retorna o diretório raiz da aplicação
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/sobre", function(req, res){
    res.send("Página sobre mim");
});

// Criação de parâmetro
// Req -> recebe dados de uma requisição
app.get("/ola/:nome/:cargo", function(req, res){
    res.send("<h1>Olá, "+ req.params.nome + "</h1>");
});


// Sempre precisa ser a última linha
// Funçao de callback
app.listen(8081, function(){
    console.log("Servidor rodando...");
});

