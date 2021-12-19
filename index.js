const exp=require('express');
const path=require('path');
const index=exp();
const Direcciones=require("./controllers/Direcciones");

/* Configurando EJS*/
index.set('view engine','ejs');

index.use(exp.static('public'));



index.get('/',Direcciones.home);

index.get('/Carrito',Direcciones.carrito);

index.get('/Registrarse',Direcciones.registrarse);

index.get('/MiCuenta',Direcciones.micuenta);

index.get('/Ayuda',Direcciones.ayuda);

index.get('/Producto/:id',Direcciones.producto);

index.get('/historial',Direcciones.historial);

index.get('/registroproductos',Direcciones.registroproductos);


/* 
index.listen(process.env.PORT || 4000,()=>{
  console.log("Brother's Beers online...")  
}); */

index.listen(process.env.PORT || 4000, function(){
  console.log("Brother's Beers online...");
}); 