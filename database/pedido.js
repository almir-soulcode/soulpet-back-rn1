const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Produto = require("./produto");

// codigo (chave primária, deve ser um UID);
// quantidade (obrigatório);

const Pedido = connection.define("pedido", {
    codigo: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// O relacionamento entre Cliente-Pedido é 1:N. 
//O relacionamento entre Produto-Pedido é 1:N.

Pedido.belongsTo(Produto, { foreignKey: 'produtoId' });
Produto.hasMany(Pedido, { foreignKey: 'produtoId' });

module.exports = Pedido;