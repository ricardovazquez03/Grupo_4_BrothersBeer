const _=require("lodash");
const fs=require('fs');
const bcrypt=require("bcryptjs");
const path = require('path');
const {validationResult, body}=require("express-validator");

/*Configurando la Base de Datos */
const db = require('../src/database/models');
const { Console } = require("console");

/*Se llama a cada uno de los modelos*/
const productos = db.Producto;
const usuarios = db.Usuario;

let user;
let producto;



const direcciones ={

    home: (req,res)=>{
        productos.findAll().then(productos=>{
            
         res.render("home",{Productos:productos}); 
        })
        .catch(error=>{
            res.redirect("/NoestaConectadaLaBaseDeDatos");
        })       
    },

    carrito:(req,res)=>{

        productos.findAll().then(productos=>{
            
            res.render("Carrito",{Productos:productos}); 
           })
           .catch(error=>{
               res.redirect("/NoestaConectadaLaBaseDeDatos");
           })
    },

    producto:(req,res)=>{
        let id=req.params.id;
            if(req.session.sesionUsuario){
                productos.findAll().then(producto=>{
                res.render("Producto",{id:id,Productos:producto,Usuario:req.session.sesionUsuario});        
            })
            .catch(error=>{
                res.redirect("/NoestaConectadaLaBaseDeDatos");
            })  }
        else{
            productos.findAll().then(productos=>{
                res.render("Producto",{id:id,Productos:productos,Usuario:undefined});        
            })
            .catch(error=>{
                res.redirect("/NoestaConectadaLaBaseDeDatos");
            })  }
         
    },
    
    registrarse:(req,res)=>{
        res.render("Registrarse");
    },
    registrarUsuario:(req,res)=>{
        user=req.body.username;
        const errores=validationResult(req);

        if(errores.errors.length==0){
             usuarios.create(
            {
                username:req.body.username,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password,10),
                direccion:req.body.direccion,
                imagen:req.body.username,
                desarrollador:null
            } 
       )
        .then(()=> {
            return res.render('Imagen')})            
            .catch(error=>{
                res.redirect("/NoestaConectadaLaBaseDeDatos");
            }) }
        else{res.render("Registrarse",{errores: errores.mapped(),old:req.body})}  
    },

    imagenUsuarios:(req,res)=>{
        usuarios
        .update(
            {
                imagen: req.file.filename,
            },
            {
                where:{
                    username: user
                }
            })
        .then(()=> {
            return res.redirect('/MiCuenta')})            
        .catch(error => res.redirect("/NosePudoActualizar"))
    },

    micuenta:(req,res)=>{

        let Usuario;

        usuarios.findAll().then(usuario=>{
            for(i in usuario){
                if(usuario[i].username==req.session.sesionUsuario.username){
                    Usuario=usuario[i];
                    break; 
                }
            }
            res.render("TuCuenta",{Usuario:Usuario}); 
           })
           .catch(error=>{
               res.redirect("/NoestaConectadaLaBaseDeDatos");
           })  
    },

    iniciarSesion: (req, res) => {
            const errores = validationResult(req);
            let SesionUsuario;
            let NotFound;
            if (errores.errors.length == 0) {
            usuarios
                .findAll()
                .then((usuario) => {
                for (let i = 0; i < usuario.length; i++) {      
                    if (usuario[i].username == req.body.username) {
                    if (bcrypt.compareSync(req.body.password, usuario[i].password)) {
                        SesionUsuario = usuario[i];
                        req.session.sesionUsuario = SesionUsuario;
                        break;
                    } else {
                        res.render("MiCuenta", { errores: [{ msg: "Contraseña incorrecta" }] });
                        break;
                    }
                    }
                    if (i == usuario.length - 1) {
                    NotFound = true;
                    }
                }
                if (NotFound == true) {
                    res.render("MiCuenta", { errores: [{ msg: "No estas registrado" }] });
                }
                //no funciona
                if (req.body.recuerdame != undefined) {
                    res.cookie("usuario", SesionUsuario.username, { maxAge: 360000 });
            }
            res.redirect("/");
            })
            .catch((error) => {
            res.redirect("/NoestaConectadaLaBaseDeDatos");
            });
        } else {
        res.render("MiCuenta", { errores: errores.mapped(), old: req.body });
        }
    },

    CerrarSesion: (req, res) => {
        
        req.session.sesionUsuario = undefined;
        res.redirect('/MiCuenta')
    
    },

    ayuda:(req,res)=>{
        res.render("Ayuda")
    },

    historial:(req,res)=> {
        res.render("historial")
    },

    registroproductos:(req,res)=> {

        usuarios.findAll().then(usuario=>{

            for(i in usuario){
                if(usuario[i].username==req.session.sesionUsuario.username){
                    if(usuario[i].desarrollador!=null){
                        res.render("registroproductos")
                    }
                    else{res.redirect("/");}
                }
                else{res.redirect("/");}
            }
           })
           .catch(error=>{
               res.redirect("/NoestaConectadaLaBaseDeDatos");
           })  
        
    },

    registroProducto:(req,res)=>{
        producto=req.body.nombre;
        productos.create(
            {
            producto_name:req.body.nombre,
            price:req.body.precio,
            description:req.body.description,
            imagen:req.body.nombre,
            rango:req.body.puntuacion,
            type_name:req.body.categoria
            }
        )
        .then(()=> {
            return res.render('imagenProducto')})            
            .catch(error=>{
                res.redirect("/NoestaConectadaLaBaseDeDatos");
            })  
    },

    imagenProductos:(req,res)=>{
        productos
        .update(
            {
                imagen: req.file.filename,
            },
            {
                where:{
                    producto_name:producto
                }
            })
        .then(()=> {
            return res.redirect('/')})            
        .catch(error => res.redirect("/NosePudoActualizar"))
    },
    borrarproductos:(req,res)=> {
        let id=req.params.id;

        id++;
        productos.findByPk(id).then(producto=>{

            usuarios.findOne({
                where:{
                    username:req.session.sesionUsuario.username
                }
                }).then(usuario=>{
                    if(usuario.desarrollador!=null){
                        res.render("borrarproducto",{producto})
                    }
                    else{res.redirect("/")}
            })
        })             
       .catch(error=>{
           res.redirect("/NoestaConectadaLaBaseDeDatos");
       }) 
    },

    borrar:(req,res)=>{

       
        let id = req.params.id;
            productos
            .destroy({where: {producto_id: id}, force: true}) // force: true es para asegurar que se ejecute la acción
            .then(()=>{
                return res.redirect('/')})
        .catch(error => res.redirect("/NoSePudoBorrar")) 
        

    },

    editarproductos:(req,res)=> {
        let id=req.params.id;

        id++;
        productos.findByPk(id).then(producto=>{

            usuarios.findOne({
                where:{
                    username:req.session.sesionUsuario.username
                }
                }).then(usuario=>{
                    if(usuario.desarrollador!=null){
                        res.render("editarproducto",{producto})
                    }
                    else{res.redirect("/")}
            })
        })             
       .catch(error=>{
           res.redirect("/NoestaConectadaLaBaseDeDatos");
       })
    },

    editar:(req,res)=>{
        let id = req.params.id;
        productos
        .update(
            {
                producto_name: req.body.nombre,
                price: req.body.precio,
                type_name: req.body.categoria,
                description:req.body.description,
                rango:req.body.puntuacion
            },
            {
                where: {producto_id: id}
            })
        .then(()=> {
            return res.redirect('/Producto/:producto.producto_id-1')})            
        .catch(error => res.redirect("/NosePudoActualizar"))
    }

};

module.exports=direcciones;