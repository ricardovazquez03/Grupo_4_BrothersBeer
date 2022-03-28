const tienesCuenta=(req,res,next)=>{

    if(req.session.sesionUsuario){
        next();
    }
    else{res.render("MiCuenta");}
}

module.exports=tienesCuenta;