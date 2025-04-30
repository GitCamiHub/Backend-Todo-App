const mongoose = require('mongoose');
const Tarea = require('./Tarea')


const sprintSchema = new mongoose.Schema(
    {
        nombre:{
            type: String,
            required: true
        },
        fechaInicio: {
            type: String,
            required: true
        },
        fechaFin: {
            type: String,
            required: true
        },
        tareas: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tarea'
        }],
        color: {
            type: String,
            required: false
        }
       
    }
)

module.exports = mongoose.model('Sprint', sprintSchema);