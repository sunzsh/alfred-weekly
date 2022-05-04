module.exports = (function(){
    this.basepath = function() {
        return process.argv.length >= 2 && process.argv[2] != '' ? process.argv[2] : `${process.env.HOME || process.env.USERPROFILE}/AlfredWeeklyData`;
    };
    
    this.currentFile = function() {
        return `${this.basepath()}/weekly.txt`;
    }

    this.newFile = function(ext) {
        return `${this.basepath()}/weekly.${ext}.txt`;
    }

    this.addRes = function(result_array, title, subtitle, arg) {
        result_array.push({
            title: title,
            subtitle: subtitle,
            arg: arg ? arg : title
        });
    }

    this.addResBefore = function(result_array, title, subtitle, arg) {
        result_array.unshift({
            title: title,
            subtitle: subtitle,
            arg: arg ? arg : title
        });
    }

    this.returnMsg = function(msg) {
        var result_array = [];
        result_array.push({
            title: msg,
            subtitle: ''
        });
        console.log(JSON.stringify({
            items: result_array
        }));
    }


    return this;

})()