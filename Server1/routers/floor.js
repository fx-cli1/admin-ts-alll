const { db } = require("../dataBase");

module.exports = function floor(app) {
    //先写一个查询楼栋的接口
    app.get('/floor/getFloors', async (req, res) => {
        const { userId, permissionRole, pageIndex = 1, pageNum = 10, searchKey, floorType } = req.query;
        let num = (pageIndex - 1) * pageNum;
        if (userId && permissionRole) {
            try {
                let sql;
                let floorTypeSql;
                floorTypeSql = (floorType == 1 || floorType == 2) ? `and floorType=${parseInt(floorType)}` : ''
                sql = permissionRole === 'admin' ? `select floorId,dormitoryName,floorAdminName,cleanerName,totalFloor,totalRoom,totalPerson
                ,floorUrl,floorType from dormitory
                 WHERE (dormitoryName LIKE '%${searchKey}%' OR floorId LIKE '${searchKey}') ${floorTypeSql} LIMIT ${num},${pageNum} ` :
                 `select floorId,dormitoryName,floorAdminName,cleanerName,totalFloor,totalRoom,totalPerson,floorUrl,floorType from dormitory 
                 WHERE floorAdminId='${userId}' and (dormitoryName LIKE '%${searchKey}%' OR floorId LIKE '${searchKey}') ${floorTypeSql} 
                 LIMIT ${num},${pageNum}`

                 let floorRes = await db(sql,null);
                    res.status(200).send({
                        message: '查询成功',
                        code: 200,
                        result:floorRes
                    })
            } catch (err) {
                console.log(err)
            }
        }
    })

    //新增宿舍楼
    app.post('/floor/addFloors', async (req, res) => {
        let { } = req.body;
    })

}