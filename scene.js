var Detector = {
// Detect if webgl is enabled
webgl: (function () {
    try {
        var canvas = document.createElement( 'canvas' );
        return !! (window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
})(),
getWebGLMessage: function() {
    var errorMsg = document.createElement("div");
    errorMsg.id = "no-webgl";
    errorMsg.className = "error-box";
    errorMsg.innerHTML = "<p>Your browser does not appear to support WebGL. This interactive requires WebGL and a modern browser.</p><p><a target='_blank' href='http://superuser.com/questions/836832/how-can-i-enable-webgl-in-my-browser'>Learn how to enable WebGL in your browser</a></p>";
    document.body.appendChild(errorMsg);
},
is_iOS8: /iPhone OS 8/.test(navigator.userAgent),
is_mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
};