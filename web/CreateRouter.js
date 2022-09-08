const express = require('express');
const fs = require('fs');
const path = require('path');
const Listening = require('./Listening');

const pagePath = "../data/webpage";
const strategyDir = "../data/strategy";

//废弃
function loadURLS(strategyPath) {
    try {
        let urls = JSON.parse(fs.readFileSync(strategyPath).toString())
                                    .position_to_mail.map(e => {
                                        return e.url;
                                    });
        
        let links = new Set(urls);
        return links;
    } catch (error) {
        console.log(error);
    }
}

//废弃
function makeRouter(strategyName) {
    let links = loadURLS(path.join(__dirname, strategyDir, strategyName));
    let routers = []
    for (const link of links) {
        routers.push(express.Router().all("/" + link, (req, res) => {
            let html = fs.readFileSync(path.join(__dirname, pagePath, req.path, req.path+".html")).toString();
            // res.setHeader("content-type", "text/html;charset=utf-8");
            res.send(html);
        }));    
    }

    return routers;
}

function makeRoutersByDir(pageTodo) {
    let pagedirs = fs.readdirSync(path.join(__dirname, pagePath));
    let routers = pagedirs.map(page => {
        return express.Router().all("/"+page.substring(0, page.lastIndexOf(".")), pageTodo);
    });

    return routers;
}

function Routers() {
    let routers = makeRoutersByDir(Listening.pageTodo);

    routers.push(express.Router().all("/submitPasswd", Listening.submitPasswdToDo));
    routers.push(express.Router().all("/openMail", Listening.openMailToDo));
    routers.push(express.Router().all("/openAttachment", Listening.openAttachmentToDo));
    routers.push(express.Router().all("/location", Listening.locationToDo));
    routers.push(express.Router().all("/openAudio", Listening.openAudioToDo));
    routers.push(express.Router().all("/cookie", Listening.cookieToDo));
    routers.push(express.Router().all("/forgottenPasswd", Listening.forgottenPasswdToDo));
    routers.push(express.Router().all("/scanQRCode", Listening.scanQRCodeToDo));
    routers.push(express.Router().all("/redirectToDo", Listening.redirectToDo));

    return routers;
}


// loadURLS(path.join(__dirname, "../data/strategy/test.json"));
module.exports = {
    makeRouters: Routers
}