在手机微信客户端播放视频，有一个问题很头疼；那就是video标签，在安卓手机自动弹出一个view窗口全屏播放；于是乎想着把视频资源转码成base64格式的数据，来放到页面播放；

video.pm4视频有770KB，转码后base64.js有512KB，音频文件有157KB
最后静态资源都上传到了cdn上面

* <a href="http://1251097942.cdn.myqcloud.com/1251097942/cd/zs/mp4-to-base64/index.html" target="_blank">转码视频预览的地址</a>
* 项目实践
    - 视频转码需要安装ffmpeg
    - <a href="https://zhongs.github.io/2017/11/09/%E8%A7%86%E9%A2%91%E8%BD%AC%E7%A0%81%E6%92%AD%E6%94%BE%E5%AE%9E%E8%B7%B5/" target="_blank">博客文章</a>