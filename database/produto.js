const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Produto = connection.define("produto", {
    nome: {
      type: DataTypes.STRING(130),
      allowNull: false,
    },
    preco: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desconto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataDesconto: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  module.exports = Produto;