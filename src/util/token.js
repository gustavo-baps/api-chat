const jwt = require('jsonwebtoken');

const checktoken = async (token, id, key)=>{
try{
    const dec = jwt.verify(token, key, err, decoded =>{
        if (err){
            return false;
        }
        if (decoded){
            if(decoded.id ==id) return false;
        }
    });
   
        return false;
}catch(e){
    console.log(e);
}
};

const setToken = async(id, key)=>{
    console.log(id);
    if(id){
        return jwt.sign({id}, key, {expiresIn: 28800});
    }
    return false;
};

module.exports = {
    checktoken,
    setToken
}