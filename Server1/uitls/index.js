const cnchar = require('cnchar');
const jwt = require('jsonwebtoken');
function saveCode(phone, smsCode) {
    phone = phone + '';
    smsCode = smsCode + '';
    return new Promise((resolve, reject) => {
        var Qcloudsms = require('qcloudsms_js')
        var appId = 1400753696;
        var appkey = "f79db300ba870b88b97dcf18170d13a1";
        var phoneNumbers = [phone];
        var templateId = 1585960;
        var smsSign = "周盼个人网";
        var qcloudsms = Qcloudsms(appId, appkey)
        var ssender = qcloudsms.SmsSingleSender();
        var params = [smsCode];
        ssender.sendWithParam(86, phoneNumbers[0], templateId, params, smsSign, "", "", (err, result) => {
            if (err) {
                reject(err);
                return
            }
            if (result) {
                console.log(result)
                resolve(result)
            }
        })
    })
}

function randomName() { //随机生成名字
    const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let nameStr = '';
    for (let i = 0; i < 10; i++) {
        let index = Math.round(Math.random() * 25);
        nameStr += arr[index].toLocaleUpperCase();
    }
    // console.log(nameStr)
    return nameStr;
}
function S() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function randomUserId() { //这个生产guid
    return (S() + S() + '-' + S() + '-' + S() + "-" + S() + '-' + S() + S() + S());
}

function getFirstLetter(str) { //这个是取汉字英文的第一个字母大写符号转成#
    //   console.log(cnchar.spell('sb'));
    let reg = /[a-zA-Z]/;
    if (str) {
        let letter = cnchar.spell(str);
        letter = letter[0];
        if(reg.test(letter)){
            letter = letter[0].toLocaleUpperCase();
        }else{
            letter = '#'
        }
        return letter
    }
    return '';
}


module.exports = {
    saveCode,
    randomName,
    randomUserId,
    getFirstLetter,
}