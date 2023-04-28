const { DataTypes } = require("sequelize")
const { connection } = require("./database")
const Pet = require("./pet")
const Servico = require("./servico")

const Agendamento = connection.define("agendamento", {
    dataAgendada: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    realizada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

Pet.belongsToMany(Servico, { through: Agendamento })
Servico.belongsToMany(Pet, { through: Agendamento })

module.exports = Agendamento