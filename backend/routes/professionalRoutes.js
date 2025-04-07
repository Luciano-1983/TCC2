const express = require('express');
const router = express.Router();
const ProfessionalController = require('../controllers/professionalController');

router.post('/register', ProfessionalController.register);
router.post('/login', ProfessionalController.login);
router.get('/', ProfessionalController.getAll);

// Rota para editar um profissional
router.put('/:id', ProfessionalController.update);

// Rota para excluir um profissional
router.delete('/:id', ProfessionalController.delete);

module.exports = router;