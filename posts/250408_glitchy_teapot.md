---
title: Glitchy Teapot
published_at: 2025-04-08
snippet: rendering a teapot with three.js
disable_html_sanitization: true
---

Example taken from [here](https://threejs.org/examples/#webgl_geometry_teapot).

<div id="three.js_container"></div>

<script type="module" id="three_script">
import * as THREE from "/250408/three.js/build/three.module.js"

const container = document.getElementById (`three.js_container`)
const width = container.parentNode.scrollWidth
const height = width * 9 / 16

// import { GUI } from '/250408/three.js/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from '/250408/three.js/examples/jsm/controls/OrbitControls.js'
import { TeapotGeometry } from '/250408/three.js/examples/jsm/geometries/TeapotGeometry.js'

let camera, scene, renderer
let cameraControls
let effectController
const teapotSize = 300
let ambientLight, light

let tess = - 1	// force initialization
let bBottom
let bLid
let bBody
let bFitLid
let bNonBlinn
let shading

let teapot, textureCube
const materials = {}

init ()
render ()

function init() {

   const canvasWidth = width
   const canvasHeight = height

   // CAMERA
   camera = new THREE.PerspectiveCamera (45, width / height, 1, 80000)
   camera.position.set (-600, 550, 1300)

   // LIGHTS
   ambientLight = new THREE.AmbientLight (0x7c7c7c, 2.0)

   light = new THREE.DirectionalLight (0xFFFFFF, 2.0)
   light.position.set (0.32, 0.39, 0.7)

   // RENDERER
   renderer = new THREE.WebGLRenderer ({ antialias: true })
   renderer.setPixelRatio (window.devicePixelRatio)
   renderer.setSize (canvasWidth, canvasHeight)
   container.appendChild (renderer.domElement)

   // EVENTS
   window.addEventListener ('resize', onWindowResize)

   // CONTROLS
   cameraControls = new OrbitControls (camera, renderer.domElement)
   cameraControls.addEventListener ('change', render)

   // TEXTURE MAP
   const textureMap = new THREE.TextureLoader ()
      .load ('250408/three.js/examples/textures/uv_grid_opengl.jpg')
   textureMap.wrapS = textureMap.wrapT = THREE.RepeatWrapping
   textureMap.anisotropy = 16
   textureMap.colorSpace = THREE.SRGBColorSpace

   // REFLECTION MAP
   const path = '250408/three.js/examples/textures/cube/pisa/'
   const urls = [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ]

   textureCube = new THREE.CubeTextureLoader ().setPath (path).load (urls)

   materials[ 'wireframe' ] = new THREE.MeshBasicMaterial ({ 
      wireframe: true 
   })

   materials[ 'flat' ] = new THREE.MeshPhongMaterial ({ 
      specular: 0x000000, 
      flatShading: true, 
      side: THREE.DoubleSide 
   })

   materials[ 'smooth' ] = new THREE.MeshLambertMaterial ({ 
      side: THREE.DoubleSide 
   })

   materials[ 'glossy' ] = new THREE.MeshPhongMaterial ({ 
      color: 0xc0c0c0, 
      specular: 0x404040, 
      shininess: 300, 
      side: THREE.DoubleSide
   })

   materials[ 'textured' ] = new THREE.MeshPhongMaterial ({ 
      map: textureMap, 
      side: THREE.DoubleSide
   })

   materials[ 'reflective' ] = new THREE.MeshPhongMaterial ({ 
      envMap: textureCube, 
      side: THREE.DoubleSide
   })

   // scene itself
   scene = new THREE.Scene();
   scene.background = new THREE.Color( 0xAAAAAA );

   scene.add( ambientLight );
   scene.add( light );

   effectController = {
      newTess: 15,
      bottom: true,
      lid: true,
      body: true,
      fitLid: false,
      nonblinn: false,
      newShading: 'glossy'
   };
}

// EVENT HANDLERS
function onWindowResize () {
   const w = container.parentNode.scrollWidth
   const h = w * 9 / 16

   renderer.setSize (w, h)
   camera.aspect = 16 / 9
   camera.updateProjectionMatrix ()

   render ()
}

// function setupGui() {
//    effectController = {
//       newTess: 15,
//       bottom: true,
//       lid: true,
//       body: true,
//       fitLid: false,
//       nonblinn: false,
//       newShading: 'glossy'
//    };

//    const gui = new GUI({ 
//       container,
//       width: 200,
//    });

//    gui.add( effectController, 'newTess', [ 2, 3, 4, 5, 6, 8, 10, 15, 20, 30, 40, 50 ] ).name( 'Tessellation Level' ).onChange( render );
//    gui.add( effectController, 'lid' ).name( 'display lid' ).onChange( render );
//    gui.add( effectController, 'body' ).name( 'display body' ).onChange( render );
//    gui.add( effectController, 'bottom' ).name( 'display bottom' ).onChange( render );
//    gui.add( effectController, 'fitLid' ).name( 'snug lid' ).onChange( render );
//    gui.add( effectController, 'nonblinn' ).name( 'original scale' ).onChange( render );
//    gui.add( effectController, 'newShading', [ 'wireframe', 'flat', 'smooth', 'glossy', 'textured', 'reflective' ] ).name( 'Shading' ).onChange( render );
// }

function render() {
   if (effectController.newTess !== tess ||
      effectController.bottom !== bBottom ||
      effectController.lid !== bLid ||
      effectController.body !== bBody ||
      effectController.fitLid !== bFitLid ||
      effectController.nonblinn !== bNonBlinn ||
      effectController.newShading !== shading ) {

      tess = effectController.newTess;
      bBottom = effectController.bottom;
      bLid = effectController.lid;
      bBody = effectController.body;
      bFitLid = effectController.fitLid;
      bNonBlinn = effectController.nonblinn;
      shading = effectController.newShading;

      // createNewTeapot();
   }

   // skybox is rendered separately, so that it is always behind the teapot.
   if ( shading === 'reflective' ) {
      scene.background = textureCube
   } else {
      scene.background = null
   }

   renderer.render (scene, camera)
}

const mutate_geometry = (g, p) => {
   const p_is_positive = p >= 0.5

   const length = g.index.array.length
   const glitch_amount = Math.abs ((p * 2) - 1) ** 5 // very steep curve from phase
   const glitch_length = Math.floor (glitch_amount * length)   
   const glitch_location = Math.floor (
      Math.random () * (length - glitch_length)
   )
   const front = g.index.array.slice (0, glitch_location)

   const mutation = p_is_positive
      ? () => Math.floor (Math.random () * 8192)
      : () => 0

   const middle = new Uint16Array (glitch_length)
      .fill (0)
      .map (mutation)

   const back = g.index.array.slice (glitch_location + glitch_length)
   const mutated = new Uint16Array (length)
   mutated.set (front)
   mutated.set (middle, front.length)
   mutated.set (back, front.length + middle.length)
   g.index.array = mutated 
}

let next_glitch_time = 0
let is_glitching = false
let geometry = new TeapotGeometry (
   teapotSize,
   tess,
   effectController.bottom,
   effectController.lid,
   effectController.body,
   effectController.fitLid,
   !effectController.nonblinn
)


// Whenever the teapot changes, the scene is rebuilt from scratch (not much to it).
function draw_teapot (ms) {
   if (teapot !== undefined) {
      teapot.geometry.dispose ()
      scene.remove (teapot)
   }

   const t = ms / 1000

   if (t > next_glitch_time) {
      const period = Math.random () ** 24 * 2
      next_glitch_time = t + period

      is_glitching = !is_glitching

      if (is_glitching) {
         mutate_geometry (geometry, Math.random ())
      }
      else {
         geometry = new TeapotGeometry (
            teapotSize,
            tess,
            effectController.bottom,
            effectController.lid,
            effectController.body,
            effectController.fitLid,
            !effectController.nonblinn
         )
      }
   }

   teapot = new THREE.Mesh (geometry, materials[ shading ])
   scene.add (teapot)

   render ()

   requestAnimationFrame (draw_teapot)
}


requestAnimationFrame (draw_teapot)

</script>

<script type="module">
   import codeBlockRenderer from "/scripts/codeblock_renderer.js"
   codeBlockRenderer (document, `three_script`, `three.js_container`)
</script>

![file tree showing three.js folder with bare essential files inside](250408/reduced_folder.png)