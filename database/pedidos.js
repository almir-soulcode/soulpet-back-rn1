const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Cliente = require("./cliente");
const Produto = require("./produto");

const Pedidos = connection.define("pedido", {
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantidade: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
})

// Relacionamento

Cliente.hasMany(Pedidos);
Pedidos.belongsTo(Cliente);

Produto.hasMany(Pedidos);
Pedidos.belongsTo(Produto);

module.exports = Pedidos;