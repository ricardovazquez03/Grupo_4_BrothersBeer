const express = require('express');
const router = express.Router();
const usersAPI = require('../../controllers/api/usersAPI');

//Rutas
router.get('/', usersAPI.lista);
router.get('/:id', usersAPI.detalle);

module.exports = router;