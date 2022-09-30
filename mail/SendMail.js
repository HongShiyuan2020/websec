const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const {makeEmails} = require('./MakeMail');

var sendNums = 0;

function sendMail(fromBox, mailOpt) {
    let transporter = nodemailer.createTransport(fromBox);
    transporter.sendMail(mailOpt, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
}


function sendMails(strategy) {
    let opt = makeEmails(strategy);
    sendNums = 0;
    for (const mail in opt.to) {
        sendMail(opt.from, opt.to[mail]);
        console.log("ok");
        sendNums += 1;
    }
}

// sendMails("test.json");

module.exports = {
    send: sendMails,
    sendNums: sendNums
}