const NoCuenta=(req,res,next)=>{

    if(req.session.sesionUsuario){
        res.redirect("MiCuenta");    
    }
    else{next();}
}

module.exports=NoCuenta;