const express = require('express');
const router = express.Router();
const BacklogController = require('../controllers/backlogController')


router.get('/', BacklogController.getBacklog);
router.post('/', BacklogController.createBacklog);
router.put('/add-tareas/:tareaId', BacklogController.addTareaToBacklog);

//aca uno de los dos era put segun el profe

module.exports = router;
