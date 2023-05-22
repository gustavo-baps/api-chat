var express = require("express");
var app = express();
const token = require("./util/token");
const salaController = require("./controller/salaController");
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const router = express.Router();
app.use('/', router.get('/', (req, res)=>{
    res.status(200).send('<h1>API-CHAT</h1>');
}));

app.use('/', router.get('/sobre', (req, res)=>{
    res.status(200).send({
        "nome":"API-CHAT",
        "versão":"0.1.0",
        "autor":"baps"
    })
}));

app.use('/', router.get('/salas', async (req, res)=>{
    console.log(req.headers);
    if(!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))return false;
    let resp = await salaController.get();
    res.status(200).send(resp);
}));

app.use('/',router.post('/entrar',async(req, res, next)=>{
    const usuarioController = require("./controller/usuarioController");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

app.use('sala/entrar',router.get('sala/entrar', async(req, res)=>{
    if(!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))return false;
    let resp = await salaController.entrar();
    res.status(200).send(resp);
}));
module.exports=app;