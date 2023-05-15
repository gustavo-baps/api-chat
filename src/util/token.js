const jwt = require('jsonwebtoken');

const setToken = async(id, key)=>{
    console.log(id);
    console.log(key);
    if(id){
        return jwt.sign({id}, key, {expiresIn: 28800});
    }
    return false;
};

const checktoken = async (token, id, key)=> jwt.verify(token, key, (err, decoded)=>{
    
});

module.exports = {
    checktoken,
    setToken
}