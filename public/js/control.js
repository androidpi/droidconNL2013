(function(io){
    var socket = io.connect(window.location.origin);

    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(event){
         socket.emit('data', {
                timestamp : (new Date()).getTime(),
                alpha : event.alpha,
                beta : event.beta,
                gamma : event.gamma
         });
        }, false);
    }
})(io);
