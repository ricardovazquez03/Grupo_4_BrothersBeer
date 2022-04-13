const express=require('express');
const methodOverride = require('method-override');
const multer= require('multer');
const mostrar=multer();
const path=require('path');
const index=express();
const session=require("express-session");
const { request } = require('http');


//index.use(bodyParser.urlencoded({ extended: true }))
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
    cb(null,"./public/img")
  },

  filename:(req,file,cb)=>{
    cb(null,Date.now()+ path.extname(file.originalname))
  }

})

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
        body('password').isLength({min:8}).withMessage('Tu contraseña debe tener al menos 8 caracteres')
        ];

index.get('/',Direcciones.home);
index.get('/Carrito',TienesCuenta,Direcciones.carrito);

index.get('/Registrarse',Nocuenta,Direcciones.registrarse);
index.post('/RegistroUsuario',mostrar.array(),validacionesRegistro,Direcciones.registrarUsuario);

index.get('/MiCuenta',TienesCuenta,Direcciones.micuenta);
index.post('/MiCuenta/IniciarSesion',mostrar.array(),validacionesUsuario,Direcciones.iniciarSesion);
index.post('/SubirImagen',guardarimagen.single("imagen"),Direcciones.imagenUsuarios);
index.get('/MiCuenta/CerrarSesion',Direcciones.CerrarSesion);

index.get('/Ayuda',Direcciones.ayuda);

index.get('/Producto/:id',Direcciones.producto);

index.get('/historial',TienesCuenta,Direcciones.historial);

index.get('/registroproductos',Autorizado,Direcciones.registroproductos);
index.post('/registroproductos/nuevo',Autorizado,mostrar.array(),Direcciones.registroProducto);
index.post('/registroproductos/nuevo/imagen',Autorizado,guardarimagen.single("imagen"),Direcciones.imagenProductos)

index.get('/borrarproducto/:id',Autorizado,Direcciones.borrarproductos);
index.delete('/borrar/:id',Autorizado,Direcciones.borrar);

index.get('/editarproducto/:id',Autorizado,Direcciones.editarproductos);
index.put('/editar/:id',Autorizado,mostrar.array(),Direcciones.editar);

index.use((req,res,next)=>{
  res.status(404).render("Ayuda")
})

  index.listen(process.env.PORT || 4000, function(){
  console.log("Brother's Beers online...");
});     
   