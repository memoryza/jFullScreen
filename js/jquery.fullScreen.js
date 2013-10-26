/**
 * jquery 全屏滚动插件
 * 源：http://www.17sucai.com/pins/525.html
 */
;(function($){
    $.fullScreen = function(setting) {
        var setting = $.extend({
                id: 'index_ex_slide',/* 全屏播放的容器 */
                controlId: 'flash_control',/* 控制按钮的容器 */
                needControl: true,/* 是否需要控制按钮 */
                interval: 3000, /* 停留时间 */
                autoPlay: true, /* 是否自动播放 */
                imgLength: 4 ,/* 默认播放图片个数 */
                animateTime: 1500, /* 动画时间 */
                direction: 'up' /* 滚动方向up|down */
            }, setting),
            $win = $(window),
            $box = $('#' + setting.id),
            $control = $('#' + setting.controlId),
            i = 0,
            _interval,
            /* 获取下一个滚动位置 */
            getIndex = function(direction) {
                return (direction + i + setting.imgLength) % setting.imgLength;
            },
            /* 窗口大小变化重绘 */
            resize = function() {
                $box.find('li').css({width: $win.width(), height: $win.height()});
                $control.css({top: ($win.height() - $control.height()) / 2});
            },
            /* 滑动 */
            slide = function(direction) {
                $box.find('li:eq(' + i + ')').stop().animate({top: direction ? $win.height() : -$win.height()}, setting.animateTime)
                .end().find('li:eq(' + getIndex(direction ? -1 : 1) + ')').stop().
                animate({top: 0}, setting.animateTime,
                    function () {
                        $box.find('li:eq(' + getIndex(direction ? -2 : 2) + ')').css({
                            top: direction ? -$win.height() : $win.height()
                        }).end().find('li:eq(' + getIndex(direction ? -3 : 3) + ')').css({
                            top: direction ? -$win.height() * 2 : $win.height() * 2
                        });
                        i = getIndex(direction ? -1 : 1);
                    }
                );
            },
            play = function() {
                _interval = setInterval(function () {
                    slide(setting.direction === 'down');
                }, setting.interval);
            },
            pause = function() {
                clearInterval(_interval);
            },
            init = function() {
                if (setting.direction === 'up') {
                    $box.find('li').each(function (x) {
                        $(this).css({'top': x * $win.height()});
                    });
                } else {
                    $box.find('li').each(function (x) {
                        $(this).css({'top': (x === 0 ? 0 : x - setting.imgLength) * $win.height()});
                    });
                }
                resize();
                if (setting.autoPlay) {
                    play();
                }
                $win.resize(resize);
            }
        init();
        return {
            play: play,
            pause: pause
        }
    }
})(jQuery);
