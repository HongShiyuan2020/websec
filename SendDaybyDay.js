const WebServer = require('./WebServer');
const SendMail = require('./mail/SendMail');
const schedule = require('node-schedule');

let rule = new schedule.RecurrenceRule();
rule.hour = [0, 1, 2];
rule.minute = [10, 20, 30, 40, 50];

WebServer.listen();

let job = schedule.scheduleJob(rule, ()=>{
    SendMail.send("test.json");
    console.log("OK");
});