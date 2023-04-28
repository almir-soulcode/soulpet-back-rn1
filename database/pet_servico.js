const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Pet = require("./pet");
const Servico = require("./servico");

const PetServico = connection.define("PetServico", {
  dataAgendada: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  realizada: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  PetsId: {
    type: DataTypes.INTEGER,
    references: {
      model: Pet, // 'Movies' would also work
      key: "id",
    },
  },
  ServicosId: {
    type: DataTypes.INTEGER,
    references: {
      model: Servico,
      key: "id",
    },
  },
});

//Relacionamento Pet - Serviço N:N
Pet.belongsToMany(Servico, { through: PetServico });
Servico.belongsToMany(Pet, { through: PetServico });

module.exports = PetServico;
