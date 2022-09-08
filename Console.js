const fs = require('fs');
const express = require('express');
const path = require('path');
const multer = require('multer');

var app = express();

var paths = ['./data/strategy', ]

var s1 = multer.diskStorage({
    destination(req, res, cb){
        cb(null, './data/strategy');
    },

    filename(req, file, cb){
        cb(null, file.originalname);
    }
});

var s2 = multer.diskStorage({
    destination(req, res, cb){
        cb(null, path.join(__dirname, './data/attachments'));
    },

    filename(req, file, cb){
        cb(null, file.originalname);
    }
});

var s3 = multer.diskStorage({
    destination(req, res, cb){
        cb(null, path.join(__dirname, './data/templates'));
    },

    filename(req, file, cb){
        cb(null, file.originalname);
    }
});

var s4 = multer.diskStorage({
    destination(req, res, cb){
        cb(null, path.join(__dirname, './data/user_info'));
    },

    filename(req, file, cb){
        cb(null, file.originalname);
    }
});

var s5 = multer.diskStorage({
    destination(req, res, cb){
        cb(null, path.join(__dirname, './data/webpage'));
    },

    filename(req, file, cb){
        cb(null, file.originalname);
    }
});

var upload_s = multer({storage: s1})
var upload_a = multer({storage: s2});
var upload_t = multer({storage: s3});
var upload_u = multer({storage: s4});
var upload_w = multer({storage: s5});

app.use(express.static("./data/public"));

app.all('/getdata', (req, res) => {
    console.log("rep");
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
            files_s = files_s.map((e) => {
                let temp = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/strategy', e).toString()));
                return {
                    name: temp.id,
                    us: temp.used_users
                };
            });
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

app.post('/addStrategy' , upload_s.single('file') ,(req, res, next) => {
    console.log(req.body);
    fs.readFile(req.file.path, (err, data) => {
        let pos = data.toString();
        let res = {
            id: req.body.name,
            used_mail_box: {
                from:"test",
                name: "test"
            },
            used_users: req.body.MailTemplate.replace('.json', ""),
            position_to_mail: pos
        };

        fs.writeFileSync(req.file.path, JSON.stringify(res));
    });
    res.send("OK");
});

app.post('/addAttachment' , upload_a.single('file') ,(req, res, next) => {
    res.send("OK");
});

app.post('/addTemplate' , upload_t.single('file') ,(req, res, next) => {
    res.send("OK");
});

app.post('/addUsers' , upload_u.single('file') ,(req, res, next) => {
    res.send("OK");
});

app.post('/addWebpage' , upload_w.single('file') ,(req, res, next) => {
    res.send("OK");
});

var server = app.listen(3000, () => { 
    console.log("Console Server Listenning On http://127.0.0.1:%s/WebConsole.html", server.address().port);
});
