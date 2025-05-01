const express = require('express');
const router = express.Router();
const SprintController = require('../controllers/sprintController'); 

// Middleware para obtener el sprint por id
router.param('id', SprintController.getSprint);

// Rutas
router.get('/', SprintController.getAllSprints); 
router.post('/', SprintController.createSprint); 
router.get('/:id', SprintController.getSprintById); 
router.put('/:id', SprintController.updateSprint); 
router.put('/:id/add-tarea/:tareaId', SprintController.addTareaToSprint); 
router.delete('/:id', SprintController.deleteSprint);

module.exports = router;
