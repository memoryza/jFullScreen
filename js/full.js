require.config({
    paths: {
        'jquery': 'jquery.min',
        'jfullscreen': 'jquery.fullScreen'
    },
    shim: {
        'jfullscreen': {
            deps: ['jquery']
        }
    }
});

require(['jfullscreen'], function() {
    var control = $.fullScreen({
        direction: 'up'
    });
    $(document)
        .on('click', '.icon-play', function() {
            control.play();
            $(this).closest('.flash-control-wrp').removeClass('on');
        })
        .on('click', '.icon-pause', function() {
            control.pause();
            $(this).closest('.flash-control-wrp').addClass('on');
        });
});
