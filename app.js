var fs = require('fs');
var path = require('path');
var util = require('util');
var ff = require('./lib/ff');
var createBase64 = require('./lib/toBase64');
var del = require('./lib/delete');

var config = {
    src_path: path.join(__dirname, './mp4/video.mp4'),
    deleteDirAndFile: path.join(__dirname, './dist/'),
    save_img_path: path.join(__dirname, './dist/img/'),
    save_mp3_path: path.join(__dirname, './dist/mp3/')
}

//删除dist目录
del.deleteAllSync(config.deleteDirAndFile);

//生成音频文件
ff.createMp3(config.src_path, config.save_mp3_path);

//生成图片
ff.createImg(config.src_path, config.save_img_path, () => {
    //图片转base64
    createBase64({
        imgPath: config.save_img_path,
        savePath: path.join(__dirname, './dist/')
    });
});