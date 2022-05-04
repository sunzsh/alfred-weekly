const public = require('./public.js');
const request = require('request');
const moment = require('moment');
moment.locale('zh-cn');

let content = process.argv.length > 4 ? process.argv[4] : '';

let gitlab_token = process.argv.length > 5 ? process.argv[5] : '';
let gitlab_url = process.argv.length > 6 ? process.argv[6] : '';

function getCommits() {
    if (gitlab_token == '' || gitlab_url == '') {
        return Promise.resolve([]);
    }
    const options = {
        url: `${gitlab_url}/api/v4/events?action=pushed&per_page=100`,
        headers: {
            'PRIVATE-TOKEN': gitlab_token
        }
    };

    return new Promise((resolve, reject) => {
        request(options, function(error, response, body) {
            if (error) {
                reject(error);
            } else {
                let commits = JSON.parse(body)
                    .map(item => {return {msg: item.push_data.commit_title, created_at: item.created_at}})
                    .filter(item => !/^Merge branch.*$/g.test(item.msg));
                // commits 按照msg去重
                commits = commits.filter((item, index, self) => {
                    return self.findIndex(item2 => item2.msg === item.msg) === index;
                });
                resolve(commits);
            }
        });
    });
}


module.exports = function() {
    var result_array = [];

    if (content === '%') {
        getCommits().then((commits) => {
            // console.log(body);
            for (const cmt of commits) {
                public.addRes(result_array, cmt.msg, `${moment(cmt.created_at).format("MM/DD HH:mm")}（${moment(cmt.created_at).fromNow()}）- Enter 写入周报`, cmt.msg);
            }
            console.log(JSON.stringify({
                items: result_array
            }));
        })
    } else {
        public.addRes(result_array, content, `Enter 写入周报 - ${public.currentFile()}`, content);
        console.log(JSON.stringify({
            items: result_array
        }));
    }


    
    

}