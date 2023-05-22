const db = require("./db");
async function listarSalas(){
    return await db.findAll("salas");
}
module.exports = {listarSalas};

let buscarSala= async(idsala)=>{
    return db.findOne("salas", {_id: iduser});
}