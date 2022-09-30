const express = require('express');

var router = express.Router();
const path = require('path');
const fs = require('fs');

const {send, sendNums} = require('./mail/SendMail');
const WebServer = require('./WebServer');

const strgyPath = path.join(__dirname, '/data/strategy');
const usersPath = path.join(__dirname, '/data/user_info');

function sendTodo(req, res) {
    let strategyPath = path.join(strgyPath , req.query['strgy']);
    let out = {}
    fs.readFile(strategyPath, (err, data) => {
        
        let dataJson = JSON.parse(data);
        out['p2'] = dataJson['position_to_mail'];
        let usrPath = path.join(usersPath ,dataJson['used_users'] + ".json");
        

        fs.readFile(usrPath, (err, data) => {
            let dataJson = JSON.parse(data);
            out['usr'] = dataJson;
            res.send(JSON.stringify(out));
        });
    });

    send(req.query['strgy']);

    WebServer.close();
    WebServer.listen();
}

function freshTodo(req, res) {
    res.send(JSON.stringify({num: sendNums}));
}

router.all("/sendmail", (req, res) => {
    let ac = req.query["ac"];
    if (ac == 'send') {
        sendTodo(req, res);
    } else if (ac == 'fresh') {
        freshTodo(req, res);
    }
    console.log(req.query);
});

module.exports = {
    sendEmailRouter: router
}