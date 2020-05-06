
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const utils = require(path.resolve(__dirname,'./utils.js'));
let time = null;
let code = null;
const server = http.createServer(function (req,res) {
    // console.log(req,res);
    // console.log(req.url)

    if (req.url == '/') {
        fs.readFile('./index.html','utf8',function (err,data) {
            if (err) {
                res.writeHead(404);
                res.send('文件读取错误！')
            }
            res.writeHead(200,{'Content-type': 'text/html'});
            res.write(data)
            res.end();
        })
    }
    
    if (url.parse(req.url).pathname == '/date') {
        let query = url.parse(req.url,true).query;
        let mail = query.mail; //获取前端传递的邮箱信息
        // console.log(mail)
        code = Math.floor(Math.random() * 1000); //存入验证码
        time = new Date().getTime(); //存入发送验证码的时间戳
        utils.mail(mail,'验证码',code + '',function (err,data) {
            res.writeHead(200);
            if (err) {
                res.write('验证码发送失败')
            } else {
                res.write('验证码发送成功')
            }
            res.end();
        });
        // console.log(time,code);
    }  
    if (url.parse(req.url).pathname == '/code') {
        let query = url.parse(req.url,true).query;
        let cd = query.code;
        let ct = query.time;

        res.writeHead(200);
        console.log('code:' + code,'cd:' + cd, 'time:' + time, 'ct:' + ct)
        //判断是否超过规定时间
        if (ct - time >= 1 * 60 * 1000) {
            res.write('验证码已过期')
        } else {
            if (cd == code) {
                res.write('验证通过')
            } else {
                res.write('验证码错误')
            }
        }
        res.end();
    }

});




server.listen('80','localhost',() => {
    console.log('start server!');
})


// let utils = require('./utils.js');
// utils.mail('746535554@qq.com','测试内容','hello world');

