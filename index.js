const express=require('express');
const methodOverride = require('method-override');
const multer= require('multer');
const path=require('path');
const index=express();
const mostrar=multer();
const cookieParser=require("cookie-parser");
const session=require("express-session");
const { request } = require('http');
index.use(express.urlencoded({ extended: true }));

/*Configurando Controladores y Middlewares*/
const Direcciones=require("./controllers/Direcciones");
const Autorizado=require("./middlewares/Autenticador");
const TienesCuenta=require("./middlewares/TienesCuenta");
const Recordado=require("./middlewares/LoRecordamos");
const Nocuenta=require("./middlewares/NoCuenta");

/* Configurando formularios*/
index.use(methodOverride('_method'))

/* Configurando EJS*/
index.set('view engine','ejs');
index.use(express.static('public'));

/* Configurando Multer*/
const imagenproducto=multer.diskStorage({

  destination:(req,file,cb)=>{
    console.log("Entramos a destination");
    cb(null,"./public/img")
    console.log("salimos de destination");
  },

  filename:(req,file,cb)=>{
    console.log("Entramos a filename");
    cb(null,Date.now()+ path.extname(file.originalname))
    console.log("Salimos de filename");
  }

})
/*Error subir imagen */
index.use(mostrar.array()); 

/* Configurando Session*/
index.use(session({secret:"Monito123"}));

/*Configurando express-validator*/
const {body}=require('express-validator');

/*Configurando las Cookies */
//index.use(cookieParser);
index.use(Recordado);


const guardarimagen= multer({storage:imagenproducto});

/*Validaciones */

const validacionesRegistro=[
        body('username').isLength({min:5}).withMessage('Tu usuario debe tener al menos 5 letras'),
        body('direccion').notEmpty().withMessage('Dirección invalida'),
        body('email').isEmail().withMessage('Correo electronico no valido'),
        body('password').isLength({min:8}).withMessage('Tu contraseña debe tener al menos 8 caracteres'),
        body('terminos').notEmpty().withMessage('Debes aceptar los terminos y condiciones'),
        ];

const validacionesUsuario=[
        body('username').isLength({min:5}).withMessage('Tu usuario debe tener al menos 5 letras'),
        body('password').isLength({min:8}).withMessage('Tu contraseña debe tener al menos 8 caracteres'),
            ];
index.get('/',Direcciones.home);
index.get('/Carrito',TienesCuenta,Direcciones.carrito);

index.get('/Registrarse',Nocuenta,Direcciones.registrarse);
index.post('/RegistroUsuario',validacionesRegistro,guardarimagen.single("imagen"),Direcciones.registrarUsuario);

index.get('/MiCuenta',TienesCuenta,Direcciones.micuenta);
index.post('/MiCuenta/IniciarSesion',validacionesUsuario,Direcciones.iniciarSesion);

index.get('/Ayuda',Direcciones.ayuda);

index.get('/Producto/:id',Direcciones.producto);

index.get('/historial',TienesCuenta,Direcciones.historial);

index.get('/registroproductos',Autorizado,Direcciones.registroproductos);
index.post('/nuevo',guardarimagen.single("imagen"),Autorizado,Direcciones.registro);

index.get('/borrarproducto/:id',Autorizado,Direcciones.borrarproductos);
index.delete('/borrar/:id',Autorizado,Direcciones.borrar);

index.get('/editarproducto/:id',Autorizado,Direcciones.editarproductos);
index.put('/editar/:id',Direcciones.editar);

index.use((req,res,next)=>{
  res.status(404).render("Ayuda")
})

 /*   index.listen(4000,()=>{
  console.log("Brother's Beers online...");
})  */  
 
  index.listen(process.env.PORT || 4000, function(){
  console.log("Brother's Beers online...");
});     
   