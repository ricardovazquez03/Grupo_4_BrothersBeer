const exp=require('express');
const multer= require('multer');
const path=require('path');
const index=exp();
const Direcciones=require("./controllers/Direcciones");

/* Configurando formularios*/
index.use(exp.urlencoded({extended:false}));
index.use(exp.json());

/* Configurando EJS*/
index.set('view engine','ejs');
index.use(exp.static('public'));

/* Configurando Multer*/
const imagenproducto=multer.diskStorage({

  destination:(req,file,cb)=>{
    cb(null,path.join(__dirname,"./public/img"))
  },

  filename:(req,file,cb)=>{
    cb(null,Date.now()+ path.extname(file.originalname))
  }

})

const guardarimagen= multer({imagenproducto});

index.get('/',Direcciones.home);

index.get('/Carrito',Direcciones.carrito);

index.get('/Registrarse',Direcciones.registrarse);

index.get('/MiCuenta',Direcciones.micuenta);

index.get('/Ayuda',Direcciones.ayuda);

index.get('/Producto/:id',Direcciones.producto);

index.get('/historial',Direcciones.historial);

index.get('/registroproductos',Direcciones.registroproductos);
index.post('/nuevo',guardarimagen.single("imagen"),Direcciones.registro);


 /*  index.listen(4000,()=>{
  console.log("Brother's Beers online...");
})  
 */
  index.listen(process.env.PORT || 4000, function(){
  console.log("Brother's Beers online...");
});   
 