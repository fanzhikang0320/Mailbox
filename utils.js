


module.exports = {
    mail
}



/**
 * 发送邮件,返回Boolean
 * @param {string} to 收件方邮箱
 * @param {string} title 内容标题
 * @param {string} content 邮件内容
 * @param {Function} callback 回调函数（内置参数）
 * 
 */
function mail(to,title,content,callback) {
    const nodemailer = require('nodemailer');
    /**
     * 详细配置文件地址： node_modules/nodemailer/lib/well-known/services
     */
    let transporter = nodemailer.createTransport({
        host: 'smtp.163.com',
        port: 465,
        secure: true,
        auth: {
            user: 'fanzhikang0320@163.com', //发送方邮箱
            pass: 'YHVCZWFVCRPLQIOX' //发送方邮箱的授权码
        }
    });
    
    let info = {
        from: 'fanzhikang0320@163.com',//发送方邮箱
        to: to,
        subject: title,
        text: content
    }

    transporter.sendMail(info,(err,data) => {
        callback &&  callback(err,data);
    })
}

