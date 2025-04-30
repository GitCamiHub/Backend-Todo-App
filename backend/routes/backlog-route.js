const express = require('express');
const router = express.Router();
const BacklogController = require('../controllers/backlogController')


router.get('/', BacklogController.getBacklog);
router.post('/', BacklogController.createBacklog);
router.put('/add-task/:taskId', BacklogController.addTareaToBacklog);

module.exports = router;
