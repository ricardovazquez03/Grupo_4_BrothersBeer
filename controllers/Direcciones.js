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

};

module.exports=direcciones;