const express = require('express');
const router = express.Router();

const classesController = require('../controllers/classes');

router.get('/', classesController.getAll);
router.get('/:id', classesController.getSingle);
router.post('/', classesController.createClass);
router.put('/:id', classesController.updateClass);
router.delete('/:id', classesController.deleteClass);

module.exports = router;