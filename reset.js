//公共引用
var fs = require('fs');
const public = require('./public.js');

var moment = require('moment');
moment.locale('zh-cn');

module.exports = function() {
    fs.rename(public.currentFile(), public.newFile(moment().format("YYYYMMDD")), (err) => {
        if (err) {
            console.error('');
            return;
        }
        console.log('')
    });    
}