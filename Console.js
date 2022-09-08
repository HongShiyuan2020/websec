const fs = require('fs');
const express = require('express');
const path = require('path');
const multer = require('multer');

const {getDataRouter} = require('./GetData');
const {uploadRouters} = require('./UploadFiles');

var app = express();

app.use(express.static("./data/public"));
app.use('/', getDataRouter);

for (const router of uploadRouters) {
    app.use('/', router);
}

var server = app.listen(3000, () => { 
    console.log("Console Server Listenning On http://127.0.0.1:%s/WebConsole.html", server.address().port);
});
