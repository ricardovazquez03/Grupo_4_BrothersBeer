const path = require('path');
const db = require('../../src/database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const Productos = db.Producto;
const Usuarios = db.Usuario;

const productsAPI ={
  'lista': (req, res) => {
    Productos.findAll()
    .then(productos => {

        let respuesta = {
          meta: {
              status: 200,
          },
          data: {
            totalProductos: productos.length,
            todosProductos: productos,
            url: 'api/products'
          },
        }
        return res.json(respuesta);  
    })  
  },

  'detalle': (req, res) => {
    Productos.findByPk(req.params.id)
      .then((productos) => {
        let respuesta = {
          meta: {
              status: 200,
          },
          data: productos
      }
      return res.json(respuesta);
      })
  }

}

module.exports = productsAPI;