const mongoose = require("mongoose");

// CONEXÃO/CONFIGURAÇÃO DO MONGOOSE COM O MONGODB
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/aprendendo", {
}).then(() => {
    console.log("Conectado ao MongoDB com sucesso!");
}).catch((erro) => {
    console.log("Erro ao se conectar ao MongoDB: " + erro);
});

// MODEL - USUÁRIOS - ENTIDADE DO BANCO DE DADOS

const UsuarioSchema = mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    sobrenome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    idade:{
        type: Number,
        required: true
    },
    pais:{
        type: String,
        required: false
    }
});

mongoose.model("usuarios", UsuarioSchema);

// CRIANDO UM NOVO USUÁRIO NO BANCO DE DADOS
const Usuario = mongoose.model("usuarios", UsuarioSchema);

new Usuario({
    nome: "João",
    sobrenome: "Silva",
    email: "joao@gmail.com",
    idade: 30,
    pais: "Brasil"
}).save().then(() => {
    console.log("Usuário criado com sucesso!");
}).catch((erro) => {
    console.log("Erro ao criar usuário: " + erro);
});