const mysql = require('mysql'); //引入mysql模块

const config = {
    host: '121.5.125.142',//数据库ip  这里连接的还是远程的数据库ip
    port: 3306,//端口，默认3306
    user: 'root',//账号
    password: 'root',//密码
    database: 'test-admin'//数据库名称
}
exports.db = (sql, sqlParams) => {
    return new Promise((resolve, reject) => {
        const pool = mysql.createPool(config);
        pool.getConnection((err, coon) => {
            if (!err) {
                coon.query(sql, sqlParams, (e,resluts) => {
                    if(!e){
                        resolve(resluts);
                        coon.destroy();
                    }else{
                        reject(e)
                    }
                    coon.release()
                })
            } else {
                reject(err)
            }
        })
    })

}


