const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Postagem = db.define("posts", {
    titulo: {
        type: DataTypes.STRING
    },
    conteudo: {
        type: DataTypes.TEXT 
    }
});

//Postagem.sync({force: true});

module.exports = Postagem;