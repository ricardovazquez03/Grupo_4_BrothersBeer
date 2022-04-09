const fs=require('fs');
const _=require("lodash");
const path = require('path');

const loRecordamos=(req,res,next)=>{
    if(req.cookies ==undefined){next();}  
    else if(req.cookies.usuario !=undefined && req.session.sesionUsuario==undefined){
        for(i in Usuarios){
            if(Usuarios[i].username==req.cookies.username){
                    SesionUsuario=Usuarios[i];
                    req.session.sesionUsuario=SesionUsuario;
                    break;
                }   
            }
            next();
        } 
    }

module.exports=loRecordamos;