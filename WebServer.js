const express = require('express');
const fs = require('fs');
const path = require('path');
const CreateRouter = require('./web/CreateRouter.js');

var app = express();

var routers = CreateRouter.makeRouters();

for (const router of routers) {
    app.use("/", router);
}

var server = app.listen(4000, ()=>{
    console.log(server.address().address);
    console.log(server.address().port);
});

