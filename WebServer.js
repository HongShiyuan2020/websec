const express = require('express');
const fs = require('fs');
const path = require('path');
const CreateRouter = require('./web/CreateRouter.js');

var app = express();
var server = null;
var routers = CreateRouter.makeRouters();

for (const router of routers) {
    app.use("/", router);
}

module.exports = {
    lisServer: app
}

function listen() {
    server = app.listen(4000, ()=>{
        console.log(server.address().address);
        console.log(server.address().port);
    });
}

function close() {
    if (server) {
        server.close();
    }
}

module.exports = {
    listen: listen,
    close: close
}