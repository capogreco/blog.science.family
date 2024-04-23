---
title: Three.js
published_at: 2024-04-11
snippet: javascript library for 3D
disable_html_sanitization: true
---

You can find all things three.js related [here](https://threejs.org/).

The library itself you can find [here](https://cdn.jsdelivr.net/npm/three@0.163.0/src/), and its add-ons [here](https://cdn.jsdelivr.net/npm/three@0.163.0/examples/jsm/).

<div id="three_container"></div>

<script id="three_script" type="module"> 
   import * as THREE from "/scripts/threejs/three.js"
   import { OrbitControls } from "/scripts/threejs/OrbitControls.js"
   
   const div = document.getElementById ("three_container")

   const width = div.parentNode.scrollWidth
   const height = width * 9 / 16

   const camera = new THREE.PerspectiveCamera (70, width / height, 0.01, 10)
   camera.position.z = 1

   const scene = new THREE.Scene ()

   const geometry = new THREE.BoxGeometry (0.2, 0.2, 0.2)
   const material = new THREE.MeshNormalMaterial ()

   const mesh = new THREE.Mesh (geometry, material)
   scene.add (mesh)

   const renderer = new THREE.WebGLRenderer ({ antialias: true })
   renderer.setSize (width, height)

   const controls = new OrbitControls (camera, renderer.domElement)

   div.appendChild (renderer.domElement)

   const draw_frame = time => {
      mesh.rotation.x = time / 2000
      renderer.render (scene, camera)
   }

   renderer.setAnimationLoop (draw_frame)
</script>

```html
<div id="three_container"></div>

<script id="three_script" type="module"> 
   import * as THREE from "/scripts/threejs/three.js"
   import { OrbitControls } from "/scripts/threejs/OrbitControls.js"
   
   const div = document.getElementById ("three_container")

   const width = div.parentNode.scrollWidth
   const height = width * 9 / 16

   const camera = new THREE.PerspectiveCamera (70, width / height, 0.01, 10)
   camera.position.z = 1

   const scene = new THREE.Scene ()

   const geometry = new THREE.BoxGeometry (0.2, 0.2, 0.2)
   const material = new THREE.MeshNormalMaterial ()

   const mesh = new THREE.Mesh (geometry, material)
   scene.add (mesh)

   const renderer = new THREE.WebGLRenderer ({ antialias: true })
   renderer.setSize (width, height)
   
   const controls = new OrbitControls (camera, renderer.domElement)

   div.appendChild (renderer.domElement)

   const draw_frame = time => {
      mesh.rotation.x = time / 2000
      renderer.render (scene, camera)
   }

   renderer.setAnimationLoop (draw_frame)
</script>
```

## Using Addons `// IMPORTANT !!`

Note that all addons, like `OrbitControls.js`, use the *import specifier* `'three'` by default:
```js
// original OrbitControls.js, from:
// https://cdn.jsdelivr.net/npm/three@0.163.0/examples/jsm/controls/OrbitControls.js

import {
	EventDispatcher,
	MOUSE,
	Quaternion,
	Spherical,
	TOUCH,
	Vector2,
	Vector3,
	Plane,
	Ray,
	MathUtils
} from 'three'; // <- import specifier

/// ...
```

... but because we are not using an [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) that tells the browser what to do with the import specifier `'three'`, this will throw an error.

To make it work, we need to point those imports directly to our `three.js` script, which in my case looks like this:

```js
// modified OrbitControls.js

import {
	EventDispatcher,
	MOUSE,
	Quaternion,
	Spherical,
	TOUCH,
	Vector2,
	Vector3,
	Plane,
	Ray,
	MathUtils
} from '/scripts/threejs/three.js' // <- filepath to local three.js

// ...
```

