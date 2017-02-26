// DOM SETUP
/*~~~~~~~~~~~~~~~~~~
We have to tell our renderer where on the page to put the 3D scene.
We're going to put it into the div #my-scene.
~~~~~~~~~~~~~~~~~~*/
domElement = document.getElementById('my-scene');
sceneWidth = domElement.offsetWidth;
sceneHeight = domElement.offsetHeight;




// INITIALIZATION
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
    alpha:true, // Turn this on if you want a transparent background
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
camera.position.z = 40;

// Make it responsive!
function onWindowResize( event ) {
    renderer.setSize( domElement.offsetWidth, domElement.offsetHeight );
    camera.aspect = domElement.offsetWidth / domElement.offsetHeight;
    camera.updateProjectionMatrix();
}
window.addEventListener( 'resize', onWindowResize, false );




// CONTROLS
/*~~~~~~~~~~~~~~~~~~~~~~
There are many different three.js control modules. I'm including the following:
• orbitControls

Uncomment the one you want to use, and comment out the rest.
If you don't want any controls, remember to comment out controls.update() in the render loop
~~~~~~~~~~~~~~~~~~~~~~*/
var controls = new THREE.OrbitControls(camera, renderer.domElement);




// LIGHTING
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
spotLight.position.set(30,100,30)
// spotLight.castShadow = true;
scene.add(spotLight)

// point light
// var pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
// pointLight.position.set( 50, 50, 50 );
// // spotLight.castShadow = true;
// scene.add(pointLight);




// OBJECTS
/*~~~~~~~~~~~~~~~~~~~~
The basic process for adding an object is this:
1. Define a geometry
2. Define a material
3. Make a mesh
4. Tell it where to go (x,y,z position)
5. Add it to the scene

Three.js has lots of geometries built in, so I'm providing a basic mesh that has many geometries
commented out. Choose the one you want!

There are also a bunch of models in the models directory that can be imported into your scene.
They all get imported the same way, so you can just change the file path of the loader
to one of the following options:
•TK TK TK 
•TK TK TK 
~~~~~~~~~~~~~~~~~~~~*/

var mesh = new THREE.Mesh(
    // GEOMETRIES (PICK ONE)
    // new THREE.BoxGeometry( 1, 1, 1 ), // (x,y,z length)
    new THREE.SphereGeometry(4,32,32), // (size, vertical subdivisions, horizontal subdivisions)
    // new THREE.CylinderGeometry( 3, 3, 10, 20 ), // (top radius, bottom radius, circle segments, height segments)
    // new THREE.OctahedronGeometry(2), // (radius)
    // new THREE.TetrahedronGeometry(2), // (radius)
    // new THREE.DodecahedronGeometry(2), // (radius)
    // new THREE.TorusGeometry(5, 2, 8, 16), // (radius, width, radial segments, tube segments)
    // new THREE.TorusKnotGeometry(5, 2, 30, 16), // (radius, inner radius, radial segments, tube segments)

    // MATERIALS (PICK ONE)
    // new THREE.MeshBasicMaterial({color:0xfff1e0})
    new THREE.MeshLambertMaterial({color:0xfff1e0})
    // new THREE.MeshPhongMaterial({color:0xfff1e0})
);
mesh.position.set(0,0,0)
// scene.add(mesh);


var object;
var loader = new THREE.ColladaLoader();
loader.load(
    // MODELS (CHOOSE ONE)
    // 'js/models/WineBottle.dae',
    // 'js/models/Pyramid.dae',
    // 'js/models/Octahedron.dae',
    // 'js/models/Cone.dae',
    // 'js/models/Soda.dae',
    // 'js/models/Ring.dae',
    // 'js/models/pawn.dae',
    'js/models/hollywood_model.dae',
    // 'js/models/tv.dae',
    function(model){
        object = model.scene;
        scene.add(object);

        object.rotation.y -= Math.PI/2

        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                var material = new THREE.MeshLambertMaterial({color:0xffffff});
                child.material = material;
            }

        } );
    }
);

var object2;
// Load a model that has textures assigned (they're in the textures directory)
var loader = new THREE.ColladaLoader();
loader.load("js/models/kershaw-v6.dae",function(collada){

        object2 = collada.scene;
        scene.add(object2);

        object2.scale.set(0.002,0.002,0.002)
        object2.position.set(1,0,1)

        object2.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                var material = new THREE.MeshBasicMaterial();
                material.map = child.material.map;
                child.material = material;
                child.geometry.computeFaceNormals();
                child.geometry.computeVertexNormals();
                child.geometry.computeBoundingBox();
            }
        } );
});



// RENDER
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