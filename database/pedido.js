const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Cliente = require("./cliente");
const Produto = require("./produto");

const Pedido = connection.define("pedido", {
    codigo: {
        primaryKey: 'id',
        type:DataTypes.STRING,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
})

// Relacionamento

Cliente.hasMany(Pedido);
Produto.hasMany(Pedido);

module.exports = Pedido;