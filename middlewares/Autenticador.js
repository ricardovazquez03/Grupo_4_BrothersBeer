const auntentificador=(req,res,next)=>{
    if(req.session.sesionUsuario){
        next();
    }
    else{res.redirect("/NoPuedesEntrar-a-Esto");}
}

module.exports=auntentificador;