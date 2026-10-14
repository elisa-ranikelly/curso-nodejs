/*const Sequelize = require('sequelize');
const sequelize = new Sequelize('teste', 'postgres', 'Eelisa2020#',{
    host: 'localhost',
    dialect: 'postgres'
});

// THEN -> FUNCIONA COMO UMA FUNÇÃO DE CALLBACK

sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!");
}).catch(function(erro){
    console.log("Falha ao se conectar: " + erro);
});

// CRIAÇÃO DE UMA TABELA
const Postagem = sequelize.define('postagens', {
    titulo:{
        type: Sequelize.STRING
    },

    conteudo: {
        type: Sequelize.TEXT
    }
});

// INSERINDO DADOS NA TABELA
Postagem.create({
    titulo: "Um título qualquer",
    conteudo: "Um conteúdo qualquer"
});

// CRIAÇÃO DE UMA TABELA
const Usuario = sequelize.define('usuarios', {
    nome : {
        type: Sequelize.STRING
    },

    sobrenome: {
        type: Sequelize.STRING
    },

    idade: {
        type: Sequelize.INTEGER
    },

    email:{
        type: Sequelize.STRING
    }
});

// INSERIR DADOS NA TABELA
Usuario.create({
    nome: "Usuário",
    sobrenome: "Teste",
    idade: 20,
    email: "usuarioteste@gmail.com"
});

// SINCRONIZA COM O BANCO E FORÇA A CRIAÇÃO DA TABELA
// SEMPRE QUE CRIAR PRECISA APAGAR
//Usuario.sync({force: true})*/