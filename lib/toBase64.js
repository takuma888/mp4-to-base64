var fs = require('fs');
var path = require('path');
var util = require('util');


/**
 * {
        imgPath:'./dist/',    要转base64格式的图片目录
        savePath:'./dist/'    文件保存后的路径
    }
 */

function createBase64(config, cb) {

    function base64Img(src) {
        var data = fs.readFileSync(src).toString('base64');
        return util.format('data:%s;base64,%s', 'image', data);
    }

    //存放转换格式后的数据；
    var data = [];

    var start = 1;
    //去读里面文件的个数
    var end = fs.readdirSync(config.imgPath).length;
    
    for (; start <= end; start++) {
        data[start] = base64Img(config.imgPath+ 'img_' + start + '.jpg');
    }

    data.splice(0, 1);

    var imgData = {
        key: data,
        fps:config.frame_rate,
        size:config.size
    }

    fs.writeFile(config.savePath+'base64.js', 'var imgData = ' + JSON.stringify(imgData), function(err) {
        if (err) {
            console.log('writeFile:',err);
        } else {
            console.log('成功转码base64！');
            cb && cb();
        }
    });
}

module.exports = createBase64;