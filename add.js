const fs = require('fs');
const moment = require('moment');
//公共引用
const public = require('./public.js');
moment.locale('zh-cn');

module.exports = function() {
    fs.mkdir(public.basepath(), { recursive: true }, (err, path) => {
        const content = process.argv[4]
        const text = moment().format("dddd（HH:mm）") + "::" + content + "\r\n";
        fs.appendFile(public.currentFile(), text, (e) => {
            if (e) {
                console.log(e);
                return;
            }
            console.log(public.currentFile());
        });
    });
    
}