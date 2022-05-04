const public = require('./public.js');
const fs = require('fs');
module.exports = function() {
    fs.mkdir(public.basepath(), { recursive: true }, (err, path) => {
        try {
            fs.statSync(public.currentFile())
            console.log(public.currentFile());
        } catch (err) {
            fs.appendFile(public.currentFile(), '', (e) => { 
                if (e) {
                    console.log(e);
                    return;
                }
                console.log(public.currentFile());
            });
        }
    });
}