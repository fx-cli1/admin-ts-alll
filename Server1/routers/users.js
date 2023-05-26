const { randomName, randomUserId, getFirstLetter } = require('../uitls/index');
const { db } = require('../dataBase/index');
const { setJwt } = require('../uitls/jwt');
module.exports = function users(app) {
    // app.get('/user/saveCode', async (req, res) => {
    //     const { phone } = req.query;
    //     let smsCode = Math.round(Math.random() * 8999 + 1000);
    //     let resCode = await saveCode(phone, smsCode);
    //     // console.log(resCode.statusCode)
    //     if (resCode.statusCode) {
    //         let phoneRes = await db('select * from vercode where ?', { phone });
    //         if (phoneRes.length) {
    //             await db(`update vercode set code=${smsCode} where phone=${phone}`, null)
    //         } else {
    //             await db(`insert into vercode(phone,code) values('${phone}','${smsCode}')`, null)
    //         }
    //         res.status(200).send({
    //             message: '短信验证码发送成功',
    //             code: 200,
    //             reslut: true
    //         })
    //     }
    // })
    // app.post('/user/register', async (req, res) => {

    //     const { phone, password, smsCode } = req.body;
    //     let userRes = await db('select phone from user where ?', { phone });
    //     if (userRes.length) {
    //         res.status(200).send({
    //             message: '该账号已被注册',
    //             code: 400,
    //             reslut: false
    //         })
    //         return
    //     }
    //     let codeRes = await db(`select * from vercode where phone='${phone}' and code='${smsCode}'`, null);
    //     console.log(codeRes)
    //     if (!codeRes.length) {
    //         res.status(200).send({
    //             message: '验证码错误',
    //             code: 400,
    //             reslut: false
    //         })
    //         return
    //     }
    //     let name = randomName();
    //     async function findUserIdFn() {
    //         let userId = randomUserId();
    //         // console.log(userId,'userId')
    //         // return '11'
    //         let userIdRes = await db('select username from user where ?', { userId });
    //         if (userIdRes.length) {
    //             return await findUserIdFn()
    //         }
    //         return userId;
    //     }
    //     let userId = await findUserIdFn();
    //     console.log(userId)
    //     let createUserRes = await db(`insert into user(phone,username,password,userId) values('${phone}','${name}','${password}','${userId}')`, null);
    //     if (createUserRes) {
    //         res.status(200).send({
    //             message: '注册成功',
    //             code: 200,
    //             reslut: true
    //         })
    //         return
    //     }
    //     // console.log(createUserRes)
    // })

    // app.post('/user/login', async (req, res) => {
    //     const { phone, password } = req.body;
    //     // console.log(req.body)
    //     if (!phone || !password) {
    //         res.status(200).send({
    //             message: '参数错误',
    //             code: 400,
    //             reslut: false
    //         })
    //         return
    //     }
    //     let findPhoneUserRes = await db('select phone from user where ?', { phone });
    //     if (!findPhoneUserRes.length) {
    //         res.status(200).send({
    //             message: '该手机号暂未注册',
    //             code: 400,
    //             reslut: false
    //         })
    //         return;
    //     }
    //     let userRes = await db(`select * from user where phone='${phone}' and password='${password}'`, null);
    //     if (userRes.length) {
    //         // console.log(userRes)
    //         const token = jwt.sign({
    //             username: userRes[0].username,
    //             phone: userRes[0].phone,
    //             id: userRes[0].id
    //         }, 'key', { expiresIn: 30 })//生成token  expiresIn控制有效时间
    //         res.status(200).send({
    //             message: '登录成功',
    //             code: 200,
    //             token,
    //             reslut: true,
    //             userInfo: {
    //                 userId: userRes[0].userId,
    //                 username: userRes[0].username,
    //                 userImg: userRes[0].userImg
    //             }
    //         })
    //         return
    //     } else {
    //         res.status(200).send({
    //             message: '账号与密码不匹配',
    //             code: 400,
    //             reslut: false
    //         })
    //     }
    // })
    // app.get('/user/getUserInfo', async (req, res) => {
    //     const { phone, curUserId } = req.query;
    //     let findPhoneUserRes = await db(`select * from user where phone='${phone}'`);
    //     let userInfo = findPhoneUserRes[0] ? findPhoneUserRes[0] : null;
    //     console.log(userInfo)
    //     if (userInfo) {
    //         if (userInfo.friends) {
    //             let friendsObj = JSON.parse(userInfo.friends);
    //             let isFriend = false;
    //             let keyNameArr = Object.keys(friendsObj);
    //             for (let i = 0; i < keyNameArr.length; i++) {
    //                 let keyName = keyNameArr[i];
    //                 let u = friendsObj[keyName].find(userId => userId === curUserId)
    //                 if (u) {
    //                     isFriend = true;
    //                     break;
    //                 }
    //             }
    //             userInfo.isFriend = isFriend;
    //         } else {
    //             userInfo.isFriend = false;
    //         }
    //         userInfo = {
    //             username: userInfo.username,
    //             phone: userInfo.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"),
    //             userImg: userInfo.userImg,
    //             userId: userInfo.userId,
    //             isFriend: userInfo.isFriend
    //         }
    //     }
    //     // console.log(findPhoneUserRes)
    //     res.status(200).send({
    //         message: '查询成功',
    //         code: 200,
    //         reslut: true,
    //         userInfo
    //     })
    //     return;
    // })
    // app.post('/user/addFriends', async (req, res) => {
    //     const { curUserId, tarUserId } = req.body;
    //     try {
    //         await db(`INSERT INTO friendapplication(senderId,recipient,type,createTime) values('${curUserId}','${tarUserId}',${2}),${new Date().getTime()}`);
    //         res.status(200).send({
    //             message:'添加成功',
    //             reslut:true,
    //             code:200
    //         })
    //     } catch (e) {
    //         console.log(e)
    //         res.status(400).send({
    //             message:'添加失败',
    //             reslut:false,
    //             code:400
    //         })
    //     }

    //     // let curUserInfo = await db(`select * from user where userId='${curUserId}'`, null);
    //     // let friendsObj = null;
    //     // let tarUserInfo = await db(`select * from user where userId='${tarUserId}'`, null);
    //     // let tarUserName = tarUserInfo[0].username;
    //     // let keyName = getFirstLetter(tarUserName);
    //     // if (curUserInfo[0].friends) {
    //     //     friendsObj = JSON.parse(curUserInfo[0].friends);
    //     // } else {
    //     //     friendsObj = {};
    //     // }
    //     // if (keyName) {
    //     //     // console.log(keyName);
    //     //     if (Array.isArray(friendsObj[keyName])) {
    //     //         friendsObj[keyName].push(tarUserId)
    //     //         friendsObj[keyName] = [...new Set(friendsObj[keyName])]
    //     //     } else {
    //     //         friendsObj[keyName] = [tarUserId]
    //     //     }
    //     // }
    //     // let friendsStr = JSON.stringify(friendsObj);
    //     // let reslut = await db(`update user set friends='${friendsStr}' where userId='${curUserId}'`, null)
    //     // res.status(200).send({
    //     //     message: '添加成功',
    //     //     code: 200,
    //     //     reslut: true,
    //     // })
    // })
    // app.get('/friendRequestList' ,async(erq,res)=>{

    // })

    app.post('/user/login', async (req, res) => {//post请求参数在req.body里面拿，get在req.body
        let { userName, passWord } = req.body;
        if (userName && passWord) {
            try {
                let userRes = await db(`select userId,permissionRole,userImg from users where userName='${userName}' and passWord='${passWord}'`, null);
                if (userRes && userRes.length) {
                    const token = await setJwt({ userName, userId: userRes[0].userId })
                    res.status(200).send({
                        message: '登录成功',
                        code: 200,
                        result: {
                            token,
                            userName,
                            userId: userRes[0].userId,
                            permissionRole: userRes[0].permissionRole,
                            userImg:userRes[0].userImg
                        }
                    })
                } else {
                    res.status(200).send({
                        message: '账号或密码不正确',
                        code: 400,
                        result: false
                    })
                }
            } catch (err) {
                res.status(500).send({
                    message: err,
                    code: 500,
                    result: false
                })
            }
        }
    })
    //根据userId查询路由表
    app.get('/user/getRoutes', async (req, res) => {
        const { userId } = req.query;
        try {
            let userInfo = await db(`select * from users where userId=${userId}`, null);
            // let reslut = routesArr.filter(item=>(u & item.role) == item.role) 
            if (userInfo && userInfo.length > 0) {
                let result = []
                let auth = userInfo[0].auth.split(',')
                // console.log(auth);
                if (auth && auth.length > 0) {
                    let routes = await db(`select * from routers`, null);
                    result = authToRoute(auth, routes)
                }
                res.status(200).send({
                    message: 'ok',
                    code: 200,
                    result
                })
            }
            function authToRoute(auth, routes) {
                return auth.map(authId => {
                    return route = routes.find(route => route.id == authId);
                })
            }


        } catch (err) {
            res.status(500).send({
                message: err,
                code: 500,
                reslut: false
            })
        }
    })

    app.get('/user/getUserList', async (req, res) => {
        let { userId, pageIndex = 1, pageCount = 10 } = req.query;
        console.log(userId,pageIndex,pageCount)
    })
}


