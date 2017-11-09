var ffmpeg = require('ffmpeg');
var del = require('./delete');

/**
 * video.fnExtractFrameToJPG
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


/**
 *  src_path 视频路径
 *  save_path 保存图片的路径
 * 
 */
function createImg(src_path, save_path, cb) {

    del.createDirSync(save_path);

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
                    //console.log('Frames: ' + files);
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

/**
 * src_path 视频路径
 * save_path_name 生成mp3的文件名路径
 */

function createMp3(src_path, save_path_name, cb) {

    del.createDirSync(save_path_name);

    try {
        var process = new ffmpeg(src_path);
        process.then(function(video) {
            video.fnExtractSoundToMP3(save_path_name+'music.mp3', function(error, file) {
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


module.exports = {
    createImg,
    createMp3
}