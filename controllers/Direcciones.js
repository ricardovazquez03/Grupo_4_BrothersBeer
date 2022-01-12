const Productos=require("../views/productos")
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
        let NuevoProducto=
        {
        id:Productos.length+1,
        nombre:req.body.nombre,
        descripcion:req.body.description,
        precio:req.body.precio,
        /* req.body.imagen */
        categoria:req.body.categoria,
        puntuacion:req.body.puntuacion,
       }

       Productos.push(NuevoProducto)

        res.redirect("/")
    },

};

module.exports=direcciones;