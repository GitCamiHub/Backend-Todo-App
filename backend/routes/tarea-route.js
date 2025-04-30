const express = require('express');
const router = express.Router();
const TareaController = require('../controllers/tareaController'); 

// Middleware para obtener la tarea por id
router.param('id', TareaController.getTarea);

// Rutas
router.get('/', TareaController.getAllTareas); 
router.post('/', TareaController.createTarea); 
router.get('/:id', TareaController.getTareaById); 
router.put('/:id', TareaController.updateTarea); 
router.delete('/:id', TareaController.deleteTarea); 

module.exports = router;
