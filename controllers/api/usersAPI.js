const path = require('path');
const db = require('../../src/database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const Productos = db.Producto;
const Usuarios = db.Usuario;

const usersAPI ={
 'lista': (req, res) => {
       Usuarios.findAll()
        .then(usuarios => {
            let respuesta = {
                meta: {
                    status : 200,
                     },
                     data: {
                    total: usuarios.length,
                    todosLosUsuarios: usuarios,
                    url: 'api/users'
                },
                
            }
               return res.json(respuesta);
            })
    },

     'detalle': (req, res) => {
     Usuarios.findByPk(req.params.id)
      .then((usuarios) => {
        let respuesta = {
          meta: {
              status: 200,
          },
          data: usuarios
      }
      return res.json(respuesta);
      })
  }

}

module.exports = usersAPI;