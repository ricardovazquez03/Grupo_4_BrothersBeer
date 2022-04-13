const express = require('express');
const router = express.Router();
const productsAPI = require('../../controllers/api/productsAPI');

//Rutas
router.get('/', productsAPI.lista);
router.get('/:id', productsAPI.detalle);

module.exports = router;