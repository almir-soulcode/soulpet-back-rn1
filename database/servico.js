const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Pet = require("./pet");

const Servico = connection.define("servico", {
    nome: {
        type: DataTypes.STRING(131),
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

module.exports = Servico;