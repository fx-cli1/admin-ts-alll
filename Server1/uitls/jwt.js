const jsonwebtoken = require('jsonwebtoken');
const JWT_KEY = 'key';

const setJwt = (data) => {
    return new Promise((resolve, reject) => {
        const token = jsonwebtoken.sign({ ...data }, JWT_KEY, { expiresIn: '72h' });
        resolve(token)
    })
}
const verifyJwt = (token) => {
    // console.log(token)
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, JWT_KEY, function (err, data) {
            if(err){
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

module.exports = {
    setJwt,
    verifyJwt
}