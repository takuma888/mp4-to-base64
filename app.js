var fs = require('fs');
var path = require('path');
var util = require('util');
var ffmpeg = require('ffmpeg');
var createBase64 = require('./toBase64.js');



var src_path = path.join(__dirname, './mp4/video.mp4');

//删除文件 dist目录和文件
deleteAll(path.join(__dirname, './dist/'));

function deleteAll(path) {

    if (fs.existsSync(path)) {

        fs.readdirSync(path).forEach(function(file, index) {

            var curPath = path + "/" + file;

            if (fs.statSync(curPath).isDirectory()) { // recurse  
                deleteAll(curPath);
            } else { // delete file  
                fs.unlinkSync(curPath);
            }
        });

        fs.rmdirSync(path);
    }
}


/**
 * 
    {
        start_time              : null      // Start time to recording
      , duration_time           : null      // Duration of recording
      , frame_rate              : null      // Number of the frames to capture in one second
      , size                    : null      // Dimension each frame
      , number                  : null      // Total frame to capture
      , every_n_frames          : null      // Frame to capture every N frames
      , every_n_seconds         : null      // Frame to capture every N seconds
      , every_n_percentage      : null      // Frame to capture every N percentage range
      , keep_pixel_aspect_ratio : true      // Mantain the original pixel video aspect ratio
      , keep_aspect_ratio       : true      // Mantain the original aspect ratio
      , padding_color           : 'black'   // Padding color
      , file_name               : null      // File name
    }

 */


function createImg(src_path, save_path, cb) {
    try {
        var process = new ffmpeg(src_path);

        process.then(function(video) {
            // Callback mode
            video.fnExtractFrameToJPG(save_path, {
                size: '375x667',
                frame_rate: 10, //一秒内捕获的帧数
                // number: 5,
                file_name: 'img'
            }, function(error, files) {
                if (!error)
                    console.log('Frames: ' + files);
                    console.log('视频转图片成功！')
                cb && cb();
            });

        }, function(err) {
            console.log('Error: ' + err);
        });
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }
}

function createMp3(src_path, save_path_name, cb) {
    try {
        var process = new ffmpeg(src_path);
        process.then(function(video) {
            video.fnExtractSoundToMP3(save_path_name, function(error, file) {
                if (!error)
                    console.log('提取视频中的音频成功！')
                cb && cb()
            });
        }, function(err) {
            console.log('Error: ' + err);
        });
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }
}


//生成mp3文件生成图片文件；
createImg(src_path, './dist/', () => {
    //转码base64;
    createBase64({
        imgPath: './dist/',
        fileName: 'base64.js',
        savePath: './dist'
    }, () => {
        //生成mp3文件
        createMp3(src_path, './dist/music.mp3', () => {});
    });
});