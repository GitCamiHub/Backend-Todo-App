const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    fechaLimite: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'enProgreso', 'completado'],
        default: 'pendiente'
    },
    color: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Tarea', tareaSchema);
