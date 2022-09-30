const express = require('express');
const path = require('path');
const fs = require('fs');

var router = express.Router();

router.all('/getdata', (req, res) => {
    let type = req.query['type'];
    switch (type) {
        case 'a':
            let files_a = fs.readdirSync(path.join(__dirname, 'data/attachments'));
            res.setHeader('content-type', 'test/json');
            res.send(JSON.stringify(files_a));
            break;
        case 'm':
            let files_m = fs.readdirSync(path.join(__dirname, 'data/templates'));
            res.setHeader('content-type', 'test/json');
            res.send(JSON.stringify(files_m));   
            break;
        case 's':
            let files_s = fs.readdirSync(path.join(__dirname, 'data/strategy'));
            res.setHeader('content-type', 'test/json');
            res.send(JSON.stringify(files_s));
            break;
        case 'u':
            let files_u = fs.readdirSync(path.join(__dirname, 'data/user_info'));
            res.setHeader('content-type', 'test/json');
            files_u = files_u.map((e) => {
                return {
                    name: e,
                    num: JSON.parse(fs.readFileSync(path.join(__dirname, 'data/user_info', e).toString())).user_num
                };
            });
            res.send(JSON.stringify(files_u));
            break;
        case 'w':
            let files_w = fs.readdirSync(path.join(__dirname, 'data/webpage'));
            res.setHeader('content-type', 'test/json');
            res.send(JSON.stringify(files_w));
        break;
        case 'q':
            let files_q = fs.readdirSync(path.join(__dirname, 'data/user_info'));
            res.setHeader('content-type', 'test/json');
            res.send(JSON.stringify(files_q));
            break;
        default:
            break;
    }
});

module.exports = {
    getDataRouter: router
}