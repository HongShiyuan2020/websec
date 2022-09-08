const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

function addStrategy(req, res, next) {
    console.log(req.body);
    fs.readFile(req.file.path, (err, data) => {
        let pos = JSON.parse(data.toString());
        let save = {
            id: req.body.name,
            used_mail_box: {
                from:"test",
                name: "test"
            },
            used_users: req.body.user_g.replace('.json', ""),
            position_to_mail: pos
        };

        fs.writeFileSync(req.file.path, JSON.stringify(save));
    });
    res.send("OK");
}

function sendOK(req, res, next) {
    res.send("OK");
}

const connfig = {
    paths: [
        path.join(__dirname, "./data/attachments"), 
        path.join(__dirname, "./data/templates"),
        path.join(__dirname, "./data/user_info"),
        path.join(__dirname, "./data/webpage"),
        path.join(__dirname, "./data/strategy")
    ],
    ps: [
    ["addAttachment", sendOK],
    ["addTemplate", sendOK],
    ["addUsers", sendOK],
    ["addWebpage", sendOK],
    ["addStrategy", addStrategy]
]};

function getUploader(uploadPath) {
    return multer.diskStorage({
        destination(req, res, cb){
            cb(null, uploadPath);
        },
    
        filename(req, file, cb){
            cb(null, file.originalname);
        }
    });
}

function getMulters(paths) {
    let multers = [];
    for(const path of paths){
        multers.push(multer({storage:getUploader(path)}).single('file'));
    }

    return multers;
}

function getUploadRouters(configs) {
    let multers = getMulters(configs.paths);
    let routers = [];
    for (const key in configs.ps) {
        routers.push(express.Router().post("/" + configs.ps[key][0], multers[key], configs.ps[key][1]));
    }

    return routers;
}

var uploadRouters = getUploadRouters(connfig);

module.exports = {
    uploadRouters: uploadRouters
}