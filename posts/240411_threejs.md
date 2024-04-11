---
title: Three.js
published_at: 2024-04-11
snippet: like p5, but specifically for 3D
disable_html_sanitization: true
---

<script id="three_script" type="module"> 
   import * as THREE from "/scripts/three.js"
   
   const width = window.innerWidth
   const height = width * 9 / 16

   // init
   const camera = new THREE.PerspectiveCamera (70, width / height, 0.01, 10)
   camera.position.z = 1

   const scene = new THREE.Scene ()

   const geometry = new THREE.BoxGeometry (0.2, 0.2, 0.2)
   const material = new THREE.MeshNormalMaterial ()

   const mesh = new THREE.Mesh (geometry, material)
   scene.add (mesh)

   const renderer = new THREE.WebGLRenderer ({antialias: true })
   renderer.setSize (width, height)
   renderer.setAnimationLoop (animation)
   document.body.appendChild (renderer.domElement)

   // animation
   function animation (time) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render (scene, camera)
   }
</script>

