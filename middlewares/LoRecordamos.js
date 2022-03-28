const fs=require('fs');
const _=require("lodash");
const path = require('path');
let UsuariosJS=fs.readFileSync(path.join(__dirname,"../controllers/usuarios.json"),{encoding:"utf-8"});
let Usuarios=JSON.parse(UsuariosJS);


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