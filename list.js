//公共引用
var fs = require('fs');
const public = require('./public.js');


module.exports = function() {
    fs.readFile(public.currentFile(), { flag: 'r+', encoding: 'utf8' }, function (err, data) {
        if (err) {
            returnMsg('还没写周报哦');
            return;
        }
        var works = data.split(/\r?\n/g);
    
        var result_array = [];
        var full = '';
        var fullWithNum = '';
        var i = 1;
        for (let row of works[Symbol.iterator]()) {
            var rowArray = row.split(/\:\:/g);
            var time = '';
            var content = '';
            if (rowArray.length == 1) {
                content = row;
                time = '';
            } else {
                time = rowArray[0];
                content = rowArray[1];
            }
            if (content == '') {
                continue;
            }
            public.addRes(result_array, content, time);
            full += content + '\r\n';
            fullWithNum += i + ". " + content + "\r\n";
            i++;
        }
    
        public.addResBefore(result_array, '带序号复制完整周报（带序号）', '带序号', fullWithNum);
        public.addResBefore(result_array, '复制完整周报（不带序号）', '不带序号', full);
        console.log(JSON.stringify({
            items: result_array
        }));
    });
}

