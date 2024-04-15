---
title: Three.js
published_at: 2024-04-11
snippet: javascript library for 3D
disable_html_sanitization: true
---

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

   div.appendChild (renderer.domElement)

   const draw_frame = time => {
      mesh.rotation.x = time / 2000
      // mesh.rotation.y = time / 1000

      renderer.render (scene, camera)
   }

   renderer.setAnimationLoop (draw_frame)
</script>

