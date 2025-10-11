const express = require('express');
const router = express.Router();

const classesController = require('../controllers/classes');
const validation = require('../middleware/classesValidate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', classesController.getAll);
router.get('/:id', classesController.getSingle);
router.post('/', validation.saveClass, isAuthenticated, classesController.createClass);
router.put('/:id', validation.saveClass, isAuthenticated, classesController.updateClass);
router.delete('/:id', isAuthenticated,classesController.deleteClass);

module.exports = router;