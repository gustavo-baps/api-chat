var express = require("express");
var app = express();
const usuarioController = require('./controller/usuarioController');
const salaController = require('./controller/salaController');
const token = require("./util/token");
app.use(express.urlencoded({extended : true}));
app.use(express.json());
var nickUser, idUser, tokenUser;

const router = express.Router();
app.use('/', router.get('/', (req, res, next) => {
    res.status(200).send("<h1>API - CHAT<h1>");
}));

app.use("/",router.get("/sobre", (req, res, next) => {
    res.status(200).send({
        "nome":"API CHAT",
        "versão":"0.1.0",
        "autor":"baps"
    });
}));

app.use('/entrar',router.post('/entrar',async(req, res, next)=>{
    let resp = await usuarioController.entrar(req.body.nick);
    nickUser = resp.nick;
    idUser = resp.iduser;
    tokenUser = resp.token;
    res.status(200).send(resp);
    console.log('entrar deu certo');
}));

app.use("/salas",router.get("/salas/listar", async (req, res, next) => {
    req.headers.nick = nickUser;
    req.headers.iduser = idUser;
    req.headers.token = tokenUser;
    if(await token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
    {
        let resp = await salaController.get();
        res.status(200).send(resp);
        console.log('salas deu certo');
    }else{
        res.status(400).send({msg:"Usuário não autorizado"});
    }
}))

app.use('/salas/entrar',router.get('/salas/entrar', async(req, res)=>{
    req.headers.nick = nickUser;
    req.headers.iduser = idUser;
    req.headers.token = tokenUser;
    if(await token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    let resp = await salaController.entrar(req.header.iduser, req.query.idsala);
    req.status(200).send(resp);
    console.log('entrar deu certo');
}));

app.use("/salas/mensagem", router.post("/salas/mensagem", async (req, res) => {
    if(!token.checktoken(req.headers.token,req.headers.iduser,req.headers.nick))
    return false;
    let resp = await salaController.enviarMensagem(req.headers.nick,req.body.msg,req.body.idSala);
    res.status(200).send(resp);
}))

module.exports=app;