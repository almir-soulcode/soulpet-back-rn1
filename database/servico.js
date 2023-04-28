const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Pet = require("./pet");

const Servico = connection.define("servico", {
  
  nome: {
    type: DataTypes.STRING(130),
    allowNull: false, 
  },
  preco: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 

  
});


//Relacionamento - um pet pode ter vários serviços e o serviço pertence a um único pet
Servico.hasMany(Pet,{onDelete:"CASCADE"});
Pet.belongsTo(Servico);



module.exports = Servico;
