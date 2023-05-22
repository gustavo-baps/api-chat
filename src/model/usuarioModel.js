const db = require('./db');
async function registrarUsuario(nick){
    return await db.findOne('usuario',{"nick":nick});
}

let buscarUsuario = async (iduser) =>{
    let user = await db.findOne("usuarios", iduser);
    return user;
}
let alterarUsuario = async (user) =>{
    return await db.updateOne('usuarios', user,{_id:user._id});
}

module.exports = {registrarUsuario, buscarUsuario, alterarUsuario};