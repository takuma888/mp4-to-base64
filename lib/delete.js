var path = require('path');
var fs = require('fs');

function deleteAllSync(path) {
    //如果文件存在，则返回 true，否则返回 false。
    if (fs.existsSync(path)) {

        //返回一个不包括 '.' 和 '..' 的文件名的数组
        fs.readdirSync(path).forEach(function(file, index) {

            var curPath = path + "/" + file;
            /**
             * fs.statSync(curPath)  返回一个 fs.Stats 实例
             * 是目录 递归调用
             * 不是目录 删除文件
             */
            if (fs.statSync(curPath).isDirectory()) { // recurse  
                deleteAllSync(curPath);
            } else { // delete file  
                fs.unlinkSync(curPath);
            }
        });

        fs.rmdirSync(path);
    }
}


//递归创建目录 同步方法
function createDirSync(dirname) {
    // console.log(dirname);
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (createDirSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

module.exports = {
    deleteAllSync,
    createDirSync
}