const Sprint = require('../models/Sprint');
const Tarea = require('../models/Tarea');

// Middleware para obtener el sprint por id
const getSprint = async (req, res, next) => {
    let sprint;
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({
            message: 'El ID del sprint no es válido'
        });
    }

    try {
        sprint = await Sprint.findById(id);
        if (!sprint) {
            return res.status(404).json({
                message: 'El sprint no fue encontrado'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

    res.sprint = sprint;
    next();
};

// Obtener todos los sprints
const getAllSprints = async (req, res) => {
    try {
        const sprints = await Sprint.find();
        if (sprints.length === 0) {
            return res.status(204).json([]);
        }
        res.json(sprints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un sprint
const createSprint = async (req, res) => {
    const { nombre, fechaInicio, fechaFin, color } = req.body;

    if (!nombre || !fechaInicio || !fechaFin) {
        return res.status(400).json({
            message: "Todos los campos son obligatorios"
        });
    }

    const sprint = new Sprint({
        nombre,
        fechaInicio,
        fechaFin,
        tareas: [],
        color
    });

    try {
        const nuevoSprint = await sprint.save();
        res.status(201).json(nuevoSprint);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Obtener un sprint por ID
const getSprintById = (req, res) => {
    res.json(res.sprint);
};

// Editar un sprint
const updateSprint = async (req, res) => {
    try {
        const sprint = res.sprint;
        sprint.nombre = req.body.nombre || sprint.nombre;
        sprint.fechaInicio = req.body.fechaInicio || sprint.fechaInicio;
        sprint.fechaFin = req.body.fechaFin || sprint.fechaFin;
        sprint.color = req.body.color || sprint.color;

        // Aca hay que poner algo sobre el array tareas?

        const updatedSprint = await sprint.save();
        res.json(updatedSprint);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Agregar una tarea a un sprint
const addTareaToSprint = async (req, res) => {
    const { tareaId } = req.params;

    try {
        // Buscar la tarea por su ID
        const tarea = await Tarea.findById(tareaId);

        if (!tarea) {
            return res.status(404).json({
                message: 'La tarea no fue encontrada'
            });
        }

        // Verificar si la tarea ya está asociada al sprint
        if (res.sprint.tareas.includes(tareaId)) {
            return res.status(400).json({
                message: 'La tarea ya está agregada a este sprint'
            });
        }

        // Agregar el ID de la tarea al array de tareas del sprint
        res.sprint.tareas.push(tareaId);

        // Guardar el sprint actualizado
        const updatedSprint = await res.sprint.save();

        // Devolver el sprint actualizado
        res.json(updatedSprint);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Eliminar un sprint
const deleteSprint = async (req, res) => {
    try {
        const sprint = res.sprint;
        await sprint.deleteOne({
            _id: sprint._id
        });
        res.json({
            message: `El sprint ${sprint.nombre} fue eliminado correctamente`
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getSprint,
    getAllSprints,
    createSprint,
    getSprintById,
    updateSprint,
    addTareaToSprint,
    deleteSprint
};
