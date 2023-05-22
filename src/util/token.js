const jwt = require('jsonwebtoken');

const checktoken = (token, id, key) => {
  try {
    if (!token) {
      return false; // Token não fornecido
    }
    const decoded = jwt.verify(token, key);
    if (decoded.id === id) {
      return true; // Usuário autorizado
    } else {
      return false; // ID do usuário não corresponde ao token
    }
  } catch (e) {
    console.log(e);
    return false; // Token inválido ou erro ao decodificar
  }
};

const setToken = (id, key) => {
  console.log(id);
  if (id) {
    return jwt.sign({ id }, key, { expiresIn: '8h' });
  }
  return false; // ID não fornecido
};

module.exports = {checktoken, setToken};





