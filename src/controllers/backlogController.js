const Backlog = require('../models/Backlog');
const Tarea = require('../models/Tarea');

const getBacklog = async (req, res) => {
    try {
        const backlog = await Backlog.find().populate('tareas');
        res.json(backlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBacklog = async (req, res) => {
    const backlog = new Backlog({ tareas: [] });

    try {
        const newBacklog = await backlog.save();
        res.status(201).json(newBacklog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addTareaToBacklog = async (req, res) => {
    const { tareaId } = req.params;

    try {
        const backlog = await Backlog.findOne();
        const tarea = await Tarea.findById(tareaId);

        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        backlog.tareas.push(tarea._id); //tarea o tare._id??
        await backlog.save();

        res.json(backlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getBacklog,
    createBacklog,
    addTareaToBacklog
};
