const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');

const server = "http://127.0.0.1:4000";


function loadFromBox(fileName){
    try {
        let fromBox = fs.readFileSync(path.join(__dirname, "../data/mail_box/from/" + fileName + ".json")).toString();
        return JSON.parse(fromBox);
    } catch (error) {
        console.log(error);
        return null;
    }    
}

function loadUsers(usersName) {
    try {
        let users = fs.readFileSync(path.join(__dirname, "../data/user_info/" + usersName + ".json")).toString();
        return JSON.parse(users);
    } catch (error) {
        console.log(error);
        return null;
    }   
}

function loadStrategy(StrategyPath){
    try {
        var policy =  JSON.parse(fs.readFileSync(path.join(__dirname, "../data/strategy",StrategyPath)).toString());
        return policy;
    } catch (error) {
        console.log(error);
        return null;
    }
}

function loadHtml(htmlName, url, user, strategyId, uuid) {
    try {
        var html =  fs.readFileSync(path.join(__dirname, "../data/templates", htmlName)).toString();
        html = html.replace(/<-url-><\/-url->/i,"\""+ server+ "/" + url + "?mail=" + user.Email + "_" + uuid + "&id="+ strategyId +"\"");
        html = html.replace(/<-img-><\/-img->/i,"\""+ server+ "/openMail"  + "?mail=" + user.Email + "_" + uuid + "&id="+ strategyId +"&type=html\"");
        return html;
    } catch (error) {
        console.log(error);
        return "<b>Error!</b>"
    }
}

function loadAttachment(name, url, user, strategyId, uuid) {
    try {
        var attachment =  fs.readFileSync(path.join(__dirname, "../data/attachments", name)).toString();
        attachment = attachment.replace(/<-url-><\/-url->/i,"\""+ server+ "/" + url + "?mail=" + user.Email + "_" + uuid + "&id="+ strategyId +"\"");
        attachment = attachment.replace(/<-img-><\/-img->/i,"\""+ server+ "/openAttachment"  + "?mail=" + user.Email + "_" + uuid + "&id="+ strategyId+"\"");
        return attachment;
    } catch (error) {
        console.log(error);
        return "<b>Error!</b>"
    }
}

function makeEmails(strategy) {
    let fromBox = loadFromBox(strategy.used_mail_box.from);
    let users = loadUsers(strategy.used_users);

    if (!(fromBox && users)) {
        return null;
    }

    var uuid = randomUUID();

    let mailTo = users.data.map(e => {
        let temp = {
            from: strategy.used_mail_box.name + "<" + fromBox.auth.user + ">",
            to: e.Email,
            subject: strategy.position_to_mail[e.position].subject,
            html: loadHtml(strategy.position_to_mail[e.position].template, strategy.position_to_mail[e.position].url, e, strategy.id, uuid),
            attachments: [
                {
                    filename: strategy.position_to_mail[e.position].attachment,
                    content: loadAttachment(strategy.position_to_mail[e.position].attachment, strategy.position_to_mail[e.position].url, e, strategy.id, uuid)
                }
            ]
        };
        return temp;
    });
    
    return {
        from: fromBox,
        to: mailTo
    };
}

function getEmails(fileName) {
    let s = loadStrategy(fileName);
    if (s) {
        return makeEmails(s);
    } else {
        return null;
    }
}

module.exports = {
    makeEmails: getEmails
}