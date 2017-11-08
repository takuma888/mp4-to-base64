var fs = require('fs');
var path = require('path');
var util = require('util');


/**
 * {
        imgPath:'./dist/',    要转base64格式的图片目录
        fileName:'toBase64',  转码后的name
        savePath:'./dist/'    文件保存后的路径
    }
 */

function createBase64(config, cb) {

    Object.assign(config, {
        imgPath: './dist/',
        fileName: 'base64.js',
        savePath: './dist'
    });

    function base64Img(src) {
        var data = fs.readFileSync(src).toString('base64');
        return util.format('data:%s;base64,%s', 'image', data);
    }

    //删除文件
    var outputFile = path.join(__dirname, config.savePath, config.fileName);
    if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile);
    }

    var filePath = path.join(__dirname, config.imgPath);
    var data = [];

    var start = 1;
    //去读里面文件的个数
    var end = fs.readdirSync(config.imgPath).length;
    for (; start <= end; start++) {
        data[start] = base64Img(filePath+ 'img_' + start + '.jpg');
    }

    data.splice(0, 1);

    var imgData = {
        key: data
    }

    fs.writeFile(outputFile, 'var imgData = ' + JSON.stringify(imgData), function(err) {
        if (err) {
            console.log('writeFile:',err);
        } else {
            console.log('成功转码base64！');
            cb && cb();
        }
    });
}

module.exports = createBase64;