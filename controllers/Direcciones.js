const fs=require('fs');
const path = require('path');
let ProductosJS=fs.readFileSync(path.join(__dirname,'productos.json'),{encoding:"utf-8"});
let Productos=JSON.parse(ProductosJS);


const direcciones ={

    home: (req,res)=>{
        res.render("home",{Productos:Productos});
    },

    carrito:(req,res)=>{
        res.render("Carrito",{Productos:Productos});
    },

    producto:(req,res)=>{
        let id=req.params.id;
        res.render("Producto",{id:id,Productos:Productos})
    },
    
    registrarse:(req,res)=>{
        res.render("Registrarse");
    },

    micuenta:(req,res)=>{
        res.render("MiCuenta");
    },

    ayuda:(req,res)=>{
        res.render("Ayuda")
    },

    historial:(req,res)=> {
        res.render("historial")
    },

    registroproductos:(req,res)=> {
        res.render("registroproductos")
    },

    registro:(req,res)=> {
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
    },

    borrarproductos:(req,res)=> {
        res.render("borrarproducto",{Productos:Productos})
    },

    borrar:(req,res)=> {
        if (req.body) {
        for(idx in Productos){
            if(Productos[idx].nombre==req.body.borrado){
               let Nuevos=Productos.slice(idx, Productos.length);
              NuevaLista= Nuevos.shift(Nuevos[0])
              Productos.push(Nuevos)
            }
        }

       let NuevoListajs=JSON.stringify(Productos);
       fs.writeFileSync(path.join(__dirname,'productos.json'),NuevoListajs)
       res.redirect("/")
    }
        res.redirect("/Ayuda")
    },

    editarproductos:(req,res)=> {
        let id=req.params.id;
        res.render("editarproducto",{id:id,Productos:Productos})
    },

    editar:(req,res)=> {
        let id=req.params.id;
        if (req.body) {
        Productos.slice(id, Productos.length);
        let Producto=
           {
            nombre:req.body.nombre,
            descripcion:req.body.description,
            precio:req.body.precio,
            imagen:req.file.filename,
            categoria:req.body.categoria,
            puntuacion:req.body.puntuacion,
           }
           res.redirect("/")
        }

        res.redirect("/Ayuda")
    }

};

module.exports=direcciones;