const salaModel = require("../model/salaModel");

exports.get=async()=>{
    return await salaModel.listarSalas();
};

exports.entrar = async (iduser, idsala)=>{
    //buscar informações da sala
    const sala = await salaModel.buscarSala(idsala);
    console.log('1');
};