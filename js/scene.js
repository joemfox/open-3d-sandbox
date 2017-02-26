// BOILERPLATE
/*~~~~~~~~~~~~~~~~~
You can pretty much ignore this section, it's just giving us some utilities to help
~~~~~~~~~~~~~~~~~~*/

// Detect if webgl is enabled (because if your browser doesn't support it, we can't really help you)
var Detector = {
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
// ~~~~~~END BOILERPLATE~~~~~~~

// DOM setup
/*~~~~~~~~~~~~~~~~~~
We have to tell our renderer where on the page to put the 3D scene.
We're going to put it into the div #my-scene.
~~~~~~~~~~~~~~~~~~*/
domElement = document.getElementById('my-scene');
sceneWidth = domElement.offsetWidth;
sceneHeight = domElement.offsetHeight;

// initialization
/*~~~~~~~~~~~~~~~~~~~
Here's where we set up our scene. This code will only be run one time,
then the render loop will start. Anything we want in our scene is going
to get set up before our render loop is started. These are the big things
we need:
    • scene
    • renderer
    • camera
    • controls
    • lighting
    • objects
~~~~~~~~~~~~~~~~~~~*/
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
    // alpha:true, // Turn this on if you want a transparent background
    // antialiasing:true // Turn this on to smooth the edges of objects (performace may suffer and doesn't work in Firefox)
});
// set the pixel ratio of the renderer to match the screen
renderer.setPixelRatio(window.devicePixelRatio);
// set the size of the renderer to match the DOM element
renderer.setSize(sceneWidth,sceneHeight);
// Attach the renderer to the page
domElement.appendChild(renderer.domElement);


/* This is our camera. It's initialized with the following options:
    • vertical field of view (in degrees)
    • aspect ratio
    • near frustum (distance to closest rendered objects)
    • far frustum (distance to farthest rendered objects)
*/
var camera = new THREE.PerspectiveCamera(30,sceneWidth/sceneHeight,1,10000);
// move the camera backward
camera.position.z = -40;

// Make it responsive!
function onWindowResize( event ) {
    renderer.setSize( domElement.offsetWidth, domElement.offsetHeight );
    camera.aspect = domElement.offsetWidth / domElement.offsetHeight;
    camera.updateProjectionMatrix();
}
window.addEventListener( 'resize', onWindowResize, false );

// controls
/*~~~~~~~~~~~~~~~~~~~~~~
There are many different three.js control modules. I'm including the following:
• orbitControls

Uncomment the one you want to use, and comment out the rest.
If you don't want any controls, remember to comment out controls.update() in the render loop
~~~~~~~~~~~~~~~~~~~~~~*/
var controls = new THREE.OrbitControls(camera, renderer.domElement);


// lighting
/*~~~~~~~~~~~~~~~~~~~~
If you don't add lights to your scene, you won't be able to see anything!
Exception: objects with MeshBasicMaterial do not need light to be visible

I've included various types of lights below. Uncomment what you want to use.
~~~~~~~~~~~~~~~~~~~~*/

// ambient light
var ambientLight = new THREE.AmbientLight( 0xeeeeee,0.1 ); // (color,intensity)
scene.add(ambientLight)

// hemisphere light
// var hemiLight = new THREE.HemisphereLight( 0xeeeeee,0x777777,0.9 ); //(top color, bottom color, intensity)
// scene.add(hemiLight)

// spotlight
var spotLight = new THREE.SpotLight( 0xeeeeee,0.9 ); // (color,intensity)
spotLight.position.set(30,100,0)
// spotLight.castShadow = true;
scene.add(spotLight)


// objects
/*~~~~~~~~~~~~~~~~~~~~
The basic process for adding an object is this:
1. Define a geometry
2. Define a material
3. Make a mesh
4. Tell it where to go (x,y,z position)
5. Add it to the scene

Three.js has lots of geometries built in, so you can uncomment the block with the shape you want
below. These are the ones I've built in:
• sphere
• TK TK TK

There are also a bunch of models in the models directory that can be imported into your scene.
They all get imported the same way, so you can just change the file path of the loader
to one of the following options:
•TK TK TK 
•TK TK TK 
~~~~~~~~~~~~~~~~~~~~*/

// sphere
var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(4,32,32), // (size, vertical subdivisions, horizontal subdivisions)
    new THREE.MeshLambertMaterial({color:0xfff1e0})
);
sphere.position.set(0,0,0)
scene.add(sphere);

// render
/*~~~~~~~~~~~~~~~~~~~~~~~~~~
The render loop is the part of the code that makes things happen on the screen.
This loop is run before *every* frame, so any heavy lifting in here will slow your
scene down. This is where you can make things move or change over time.
~~~~~~~~~~~~~~~~~~~~~~~~~~*/
function render() {
    requestAnimationFrame( render );

    controls.update();
    renderer.render( scene, camera );
}

render();