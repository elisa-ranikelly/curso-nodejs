var http = require('http');

//Abrir um servidor
//Listen -> serve para indicar a porta
//End -> envia uma mensagem 
http.createServer(function(req, res){
    res.end("Olá");
}).listen(8081);

console.log("O servidor esta rodando...");