const Tarea = require('../models/Tarea');
const Sprint = require('../models/Sprint')

// MIDDLEWARE
const getTarea = async (req, res, next) => {
    let tarea;
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({
            message: 'El ID de la tarea no es válido'
        });
    }

    try {
        tarea = await Tarea.findById(id);
        if (!tarea) {
            return res.status(404).json({
                message: 'La tarea no fue encontrada'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

    res.tarea = tarea;
    next();
};

// Devolver todas las tareas almacenadas en la bd
const getAllTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find();
        console.log(`GET ALL: ${tareas}`);
        if (tareas.length === 0) {
            return res.status(204).json([]);
        }
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una tarea
const createTarea = async (req, res) => {
    const { titulo, descripcion, fechaLimite, color } = req?.body;

    if (!titulo || !fechaLimite) {
        return res.status(400).json({
            message: "Los campos título y fecha límite son obligatorios"
        });
    }

    const tarea = new Tarea({
        titulo,
        descripcion,  // No es obligatorio
        fechaLimite,
        estado: null, 
        color  // No es obligatorio
    });

    try {
        const nuevaTarea = await tarea.save();
        console.log(nuevaTarea);
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Obtener tarea por ID
const getTareaById = (req, res) => {
    res.json(res.tarea);
};

// Editar una tarea
const updateTarea = async (req, res) => {
    try {
        const tarea = res.tarea;
        tarea.titulo = req.body.titulo || tarea.titulo;
        tarea.descripcion = req.body.descripcion || tarea.descripcion;
        tarea.fechaLimite = req.body.fechaLimite || tarea.fechaLimite;
        tarea.color = req.body.color || tarea.color;  

       // Aca cambiaria el estado???
        if (req.body.estado && ['pendiente', 'enProgreso', 'completado'].includes(req.body.estado)) {
            tarea.estado = req.body.estado;
        }
       
        const updatedTarea = await tarea.save();
        res.json(updatedTarea);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Eliminar una tarea
const deleteTarea = async (req, res) => {
    try {
        const tarea = res.tarea;

        // Validamos si la tarea esta asignada a un sprint
        const tareaInSprint = await Sprint.findOne({ tareas: tarea._id });

        if (tareaInSprint) {
            return res.status(400).json({
                message: `No se puede eliminar la tarea "${tarea.titulo}" porque pertenece al sprint "${tareaInSprint.nombre}".`
            });
        }

        // Si no está asociada, se puede eliminar
        await tarea.deleteOne({ _id: tarea._id });

        res.json({
            message: `La tarea "${tarea.titulo}" fue eliminada correctamente.`
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getTarea,
    getAllTareas,
    createTarea,
    getTareaById,
    updateTarea,
    deleteTarea
};
