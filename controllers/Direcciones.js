const _=require("lodash");
const fs=require('fs');
const bcrypt=require("bcryptjs");
const path = require('path');
const {validationResult}=require("express-validator");

/*Configurando la Base de Datos */
const db = require('../src/database/models');

/*Se llama a cada uno de los modelos*/
const productos = db.Producto;
const usuarios = db.Usuario;

/*Productos */
let ProductosJS=fs.readFileSync(path.join(__dirname,'productos.json'),{encoding:"utf-8"});
let Productos=JSON.parse(ProductosJS);



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
        res.render("Carrito",{Productos:Productos});
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

   /* registrarUsuario:(req,res)=>{
        
        const errores=validationResult(req);

        if(errores.errors.length==0){


            let NuevoUsuario=
        {
        id:Usuarios.length+1,
        username:req.body.username,
        direccion:req.body.direccion,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,10)
       }

       Usuarios.push(NuevoUsuario)

       let NuevoUsuariojs=JSON.stringify(Usuarios);
       fs.writeFileSync(path.join(__dirname,'usuarios.json'),NuevoUsuariojs)

            res.render("/");}
        else{res.render("Registrarse",{errores: errores.mapped(),old:req.body})}
    },*/
    registrarUsuario:(req,res)=>{
        
        const errores=validationResult(req);

        if(errores.errors.length==0){
        
            usuarios.create(
            {
                username:req.body.username,
                direccion:req.body.direccion,
                email:req.body.email,
                imagen:req.file.filename,
                password:bcrypt.hashSync(req.body.password,10)
            }
        )
        .then(()=> {
            return res.redirect('/MiCuenta')})            
            .catch(error=>{
                res.redirect("/NoestaConectadaLaBaseDeDatos");
            }) }
        else{res.render("Registrarse",{errores: errores.mapped(),old:req.body})}
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

    iniciarSesion:(req,res)=>{
        const errores=validationResult(req);
        let SesionUsuario;
 
        if(errores.errors.length==0){
            usuarios.findAll().then(usuario=>{
                for(i in usuario){
                
                        if(usuario[i].username==req.body.username){
                            if(bcrypt.compareSync(req.body.password,usuario[i].password)){
                                SesionUsuario=usuario[i];
                                req.session.sesionUsuario=SesionUsuario;
                                break;
                            }
                            else{
                                res.render("MiCuenta",{errores: [{msg:"Contraseña incorrecta"}]})
                            }    
                        }
                        else{res.render("MiCuenta",{errores: [{msg:"No estas registrado"}]})} 
                }
                //no funciona
                if(req.body.recuerdame!=undefined){
                    res.cookie('usuario',SesionUsuario.username,{maxAge:360000})
                } 
                res.redirect("/");
               })
               .catch(error=>{
                   res.redirect("/NoestaConectadaLaBaseDeDatos");
               })      
        }
        else{ res.render("MiCuenta",{errores: errores.mapped(),old:req.body})}
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

    /*registro:(req,res)=> {
        if (req.body) {
            
        let NuevoProducto=
        {
        id:Productos.length+1,
        nombre:req.body.nombre,
        descripcion:req.body.description,
        precio:req.body.precio,
        imagen:req.file.filename,
        categoria:req.body.categoria,
        puntuacion:req.body.puntuacion,
       }

       Productos.push(NuevoProducto)

       let NuevoProductojs=JSON.stringify(Productos);
       fs.writeFileSync(path.join(__dirname,'productos.json'),NuevoProductojs)

        res.redirect("/")}
    },*/
    registro: function (req,res) {
        productos
        .create(
            {
            producto_name:req.body.nombre,
            price:req.body.precio,
            description:req.body.description,
            imagen:req.file.filename,
            range:req.body.puntuacion,
            type_name:req.body.categoria
            }
        )
        .then(()=> {
            return res.redirect('/home')})            
            .catch(error=>{
                res.redirect("/NoestaConectadaLaBaseDeDatos");
            })  
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

    /*borrar:(req,res)=> {
        const id = req.params.id;
        if (id) {
        const idx = Productos.findIndex(productos => productos.id == id)
        Productos.splice(idx, 1) 
            let NuevosProductosjs=JSON.stringify(Productos);
            fs.writeFileSync(path.join(__dirname,'productos.json'),NuevosProductosjs)
            res.redirect("/")
    }
        res.redirect("/Ayuda")
    },*/
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

    /*editar:(req,res)=> {
        const id = req.params.id;
        if (id) {
                const idx = Productos.findIndex(productos => productos.id == id)

                Productos[idx].nombre=req.body.nombre
                Productos[idx].precio=req.body.precio
                Productos[idx].categoria=req.body.categoria
                Productos[idx].puntuacion=req.body.puntuacion

                let ProductoEditadojs=JSON.stringify(Productos);
            fs.writeFileSync(path.join(__dirname,'productos.json'),ProductoEditadojs)
              res.redirect('/producto/'+id)
                
            }
            res.redirect("/Ayuda")
              
    }*/
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