const express = require('express');
const app = express();


app.use('/public', express.static('public'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.all("*", (req, res, next) => {
    // console.log('qq')
    // console.log(req.headers)
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", '*');
    // res.header("Access-Control-Allow-Origin", 'http://localhost:5000');
    // //允许的header类型
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With,token");
    // // //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // // 可以带cookies
    res.header("Access-Control-Allow-Credentials", true);
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        let url = req.url;
        if (url === '/user/login') {
            next();
        } else {
            let token = req.headers.token;
            if (token) {
                verifyJwt(token).then(res => {
                    next()
                }).catch(err => {
                    res.status(200).send({
                        message: 'token解析失败',
                        code:401,
                    })
                })
            } else {
                res.status(200).send({
                    message: '缺失token',
                    code:401
                })
            }
        }
    }
})

const users = require('./routers/users');
const floor = require('./routers/floor');
const { verifyJwt } = require('./uitls/jwt');
users(app);
floor(app)

app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`)
})