const express = require('express');
const router = express.Router();
const ProfessionalController = require('../controllers/professionalController');

router.post('/register', ProfessionalController.register);
router.post('/login', ProfessionalController.login);
router.get('/', ProfessionalController.getAll);

module.exports = router;