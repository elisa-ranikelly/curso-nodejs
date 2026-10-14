const { Sequelize } = require("sequelize");

require("dotenv").config({ path: "../../.env"});

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres",
    port: DB_PORT
});

sequelize.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados realizada com sucesso!");
    })
    .catch((error) => {
        console.error("Erro ao conectar com o banco de dados:", error);
    });

module.exports = sequelize;
