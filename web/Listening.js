const fs = require('fs');
const express = require('express');
const path = require('path');
const qrcode = require('qrcode');

const resDir = "../data/res";
const webpageDir = "../data/webpage";

function pageToDo01(req, res) {
    let mail = req.query['mail'];
    let id = req.query['id'];
    let page = req.path;
    //记录
    fs.appendFileSync(path.join(__dirname, resDir, id + ".log"), new Date().toLocaleString()+" "+mail+" "+"ClickURL\n");

    //发送页面
    let send = fs.readFileSync(path.join(__dirname, webpageDir, page+".html"))
    .toString()
    .replace("$PA$","mail=" + mail + "&id=" + id)
    res.setHeader("content-type", "text/html; charset=UTF-8");
    res.send(send);
}

function openMail(req, res) {
    let mail = req.query['mail'];
    let id = req.query['id'];

    fs.appendFileSync(path.join(__dirname, resDir, id + ".log"), new Date().toLocaleString()+" "+mail+" "+"OpenMail\n");
    res.send("");
}

function openAttachment(req, res) {
    let mail = req.query['mail'];
    let id = req.query['id'];

    fs.appendFileSync(path.join(__dirname, resDir, id + ".log"), new Date().toLocaleString()+" "+mail+" "+"OpenAttachment\n");
    res.send("");
}

function location(req, res) {
    let mail = req.query['mail'];
    let id = req.query['id'];

    fs.appendFileSync(path.join(__dirname, resDir, id + ".log"), new Date().toLocaleString()+" "+mail+" "+"Location\n");
    res.send("");
}

function openAudio(req, res) {
    let mail = req.query['mail'];
    let id = req.query['id'];

    fs.appendFileSync(path.join(__dirname, resDir, id + ".log"), new Date().toLocaleString()+" "+mail+" "+"OpenAudio\n");
    res.send("");
}

function cookie(req, res) {
    let mail = req.query['mail'];
    let id = req.query['id'];

    fs.appendFileSync(path.join(__dirname, resDir, id + ".log"), new Date().toLocaleString()+" "+mail+" "+"Cookie\n");
    res.send("");
}

function submitPasswd(req, res) {
    let mail = req.query['mail'];
    let id = req.query['id'];

    fs.appendFileSync(path.join(__dirname, resDir, id + ".log"), new Date().toLocaleString()+" "+mail+" "+"SubmitPasswd\n");
    res.send("");
}

function forgottenPasswd(req, res) {
    let mail = req.query['mail'];
    let id = req.query['id'];

    fs.appendFileSync(path.join(__dirname, resDir, id + ".log"), new Date().toLocaleString()+" "+mail+" "+"ForgottenPasswd\n");
    res.send("");
}

function scanQRCode(req, res) {
    let mail = req.query['mail'];
    let id = req.query['id'];

    fs.appendFileSync(path.join(__dirname, resDir, id + ".log"), new Date().toLocaleString()+" "+mail+" "+"ScanQRCode\n");
    res.send("");
}

function redirectTo(req, res) {
    let mail = req.query['mail'];
    let id = req.query['id'];
    let type = req.query['type'];
    console.log(type)
    if (type == "c") {
        res.setHeader('contet-type', 'text/html; charset=UTF-8');
        let send = fs.readFileSync(path.join(__dirname, "../data/redirct_pages/1.html"))
        .toString()
        .replace("$t$", "mail=" + mail + "&id=" + id);
        res.send(send);
    } else {
        fs.appendFileSync(path.join(__dirname, resDir, id + ".log"), new Date().toLocaleString()+" "+mail+" "+"RedirectTo\n");
        res.send("");
    }
}

module.exports = {
    pageTodo: pageToDo01,
    openMailToDo: openMail,
    openAttachmentToDo: openAttachment,
    locationToDo: location,
    openAudioToDo: openAudio,
    cookieToDo: cookie,
    submitPasswdToDo: submitPasswd,
    forgottenPasswdToDo: forgottenPasswd,
    scanQRCodeToDo: scanQRCode,
    redirectToDo: redirectTo
}
