---
title: Shaders 
published_at: 2025-04-13
snippet: ... calculating with the GPU
disable_html_sanitization: true
---

# What are Shaders?

Shaders are small programs that run on your GPU (Graphics Processing Unit) instead of your CPU. They're used to calculate how pixels should be colored on the screen. What makes shaders special is that they run in parallel - processing thousands or millions of pixels simultaneously on the GPU rather than one at a time on the CPU.

# Shaders in Three.js

In Three.js, there are two main types of shaders:

1. **Vertex Shaders**: Determine where the points (vertices) of a 3D object should be positioned
2. **Fragment Shaders**: Determine what color each pixel should be

Let's start with a simple example using Three.js to create a shader that animates colors.

<div id="shader_example"></div>
<div id="shader_example_code"></div>

<script id="shader_example_script" type="module">
   import * as THREE from "/scripts/threejs/three.js"
   import { OrbitControls } from "/scripts/threejs/OrbitControls.js"
   import codeblockRenderer from "/scripts/codeblock_renderer.js"
   
   const div = document.getElementById ("shader_example")
   const width = div.parentNode.scrollWidth
   const height = width * 9 / 16
   
   // Basic three.js setup
   const scene = new THREE.Scene()
   const camera = new THREE.PerspectiveCamera (70, width / height, 0.01, 10)
   camera.position.z = 1
   
   const renderer = new THREE.WebGLRenderer ({ antialias: true })
   renderer.setSize (width, height)
   div.appendChild (renderer.domElement)
   
   const controls = new OrbitControls (camera, renderer.domElement)
   
   // Our shader material
   const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
         u_time: { value: 0.0 }
      },
      vertexShader: `
         void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
         }
      `,
      fragmentShader: `
         uniform float u_time;
         
         void main() {
            vec2 uv = gl_FragCoord.xy / vec2(${ width }.0, ${ height }.0);
            
            // Create a pulsing effect based on time
            float r = 0.5 + 0.5 * sin (u_time + uv.x * 6.0);
            float g = 0.5 + 0.5 * sin (u_time + uv.y * 6.0);
            float b = 0.5 + 0.5 * sin (u_time + uv.x * 2.0 + uv.y * 2.0);
            
            gl_FragColor = vec4 (r, g, b, 1.0);
         }
      `
   })
   
   // Create a simple plane to display our shader
   const geometry = new THREE.PlaneGeometry (1.6, 0.9)
   const mesh = new THREE.Mesh (geometry, shaderMaterial)
   scene.add (mesh)
   
   // Animation loop
   renderer.setAnimationLoop (time => {
      shaderMaterial.uniforms.u_time.value = time * 0.001
      renderer.render (scene, camera)
   })
   
   // Render code block
   codeblockRenderer (document, "shader_example_script", "shader_example_code")
</script>

# Understanding the Shader Code

Let's break down what's happening in our fragment shader:

```glsl
uniform float u_time;

void main() {
   vec2 uv = gl_FragCoord.xy / vec2(${width}.0, ${height}.0);
   
   // Create a pulsing effect based on time
   float r = 0.5 + 0.5 * sin(u_time + uv.x * 6.0);
   float g = 0.5 + 0.5 * sin(u_time + uv.y * 6.0);
   float b = 0.5 + 0.5 * sin(u_time + uv.x * 2.0 + uv.y * 2.0);
   
   gl_FragColor = vec4(r, g, b, 1.0);
}
```

Here's what each part does:

1. `uniform float u_time;` - A uniform is a value we pass from JavaScript into our shader. In this case, we're passing the current time.

2. `vec2 uv = gl_FragCoord.xy / vec2(${width}.0, ${height}.0);` - This creates normalized coordinates (0 to 1) across our canvas. `gl_FragCoord.xy` gives us the pixel position.

3. The `r`, `g`, and `b` variables - We use sine waves to create pulsing color values. By adding `u_time`, the colors change over time. The `* 6.0` parts change how quickly the colors cycle across the screen.

4. `gl_FragColor = vec4(r, g, b, 1.0);` - This sets the final color of the pixel. The 1.0 at the end is the alpha (opacity) value.

# Adding Interactions

Let's make a more exciting shader that responds to mouse movement:

<div id="interactive_shader"></div>
<div id="interactive_shader_code"></div>

<script id="interactive_shader_script" type="module">
   import * as THREE from "/scripts/threejs/three.js"
   import codeblockRenderer from "/scripts/codeblock_renderer.js"
   
   const div = document.getElementById ("interactive_shader")
   const width = div.parentNode.scrollWidth
   const height = width * 9 / 16
   
   // Basic three.js setup
   const scene = new THREE.Scene()
   const camera = new THREE.PerspectiveCamera (70, width / height, 0.01, 10)
   camera.position.z = 1
   
   const renderer = new THREE.WebGLRenderer ({ antialias: true })
   renderer.setSize (width, height)
   div.appendChild (renderer.domElement)
   
   // Track mouse position
   const mouse = new THREE.Vector2(0.5, 0.5)
   div.addEventListener('mousemove', (event) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = (event.clientX - rect.left) / width
      mouse.y = 1.0 - (event.clientY - rect.top) / height  // Invert Y coordinate
   })
   
   // Ripple shader material
   const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
         u_time: { value: 0.0 },
         u_mouse: { value: mouse }
      },
      vertexShader: `
         void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
         }
      `,
      fragmentShader: `
         uniform float u_time;
         uniform vec2 u_mouse;
         
         void main() {
            vec2 uv = gl_FragCoord.xy / vec2(${width}.0, ${height}.0);
            
            // Distance from mouse position
            float dist = distance(uv, u_mouse);
            
            // Create ripples from the mouse position
            float ripple = sin(dist * 50.0 - u_time * 5.0) * 0.5 + 0.5;
            
            // Fade out the ripple with distance
            ripple *= smoothstep(0.5, 0.0, dist);
            
            // Base color (turquoise)
            vec3 baseColor = vec3(0.0, 0.8, 0.8);
            
            // Add ripple effect (deeppink)
            vec3 rippleColor = vec3(1.0, 0.0, 0.5);
            vec3 finalColor = mix(baseColor, rippleColor, ripple);
            
            gl_FragColor = vec4(finalColor, 1.0);
         }
      `
   })
   
   // Create a simple plane to display our shader
   const geometry = new THREE.PlaneGeometry(1.6, 0.9)
   const mesh = new THREE.Mesh(geometry, shaderMaterial)
   scene.add(mesh)
   
   // Animation loop
   renderer.setAnimationLoop((time) => {
      shaderMaterial.uniforms.u_time.value = time * 0.001
      renderer.render(scene, camera)
   })
   
   // Render code block
   codeblockRenderer(document, "interactive_shader_script", "interactive_shader_code")
</script>


# More Advanced - 3D with Shaders

Now let's see how we can apply custom shaders to 3D objects for more interesting effects:

<div id="shader_3d"></div>
<div id="shader_3d_code"></div>

<script id="shader_3d_script" type="module">
   import * as THREE from "/scripts/threejs/three.js"
   import { OrbitControls } from "/scripts/threejs/OrbitControls.js"
   import codeblockRenderer from "/scripts/codeblock_renderer.js"
   
   const div = document.getElementById ("shader_3d")
   const width = div.parentNode.scrollWidth
   const height = width * 9 / 16
   
   // Basic three.js setup
   const scene = new THREE.Scene ()
   scene.background = new THREE.Color (0x161616)
   const camera = new THREE.PerspectiveCamera (70, width / height, 0.01, 10)
   camera.position.z = 2
   
   const renderer = new THREE.WebGLRenderer ({ antialias: true })
   renderer.setSize (width, height)
   div.appendChild (renderer.domElement)
   
   const controls = new OrbitControls (camera, renderer.domElement)
   controls.enableDamping = true
   
   // Custom shader material
   const shaderMaterial = new THREE.ShaderMaterial ({
      uniforms: {
         u_time: { value: 0.0 }
      },
      vertexShader: `
         uniform float u_time;
         varying vec3 vNormal;
         varying vec3 vPosition;
         
         void main() {
            vNormal = normal;
            
            // Animate the vertices
            vec3 newPosition = position;
            float displacement = sin(position.y * 10.0 + u_time * 2.0) * 0.1;
            newPosition += normal * displacement;
            
            vPosition = newPosition;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
         }
      `,
      fragmentShader: `
         uniform float u_time;
         varying vec3 vNormal;
         varying vec3 vPosition;
         
         void main() {
            // Create a color based on the position and normal
            vec3 color = 0.5 + 0.5 * cos(u_time + vPosition + vec3(0, 2, 4));
            
            // Add some shading based on the normals
            float lighting = dot(normalize(vNormal), normalize(vec3(1.0, 1.0, 1.0)));
            lighting = 0.5 + lighting * 0.5;
            
            gl_FragColor = vec4(color * lighting, 1.0);
         }
      `,
      side: THREE.DoubleSide
   })
   
   // create a torus knot
   const geometry = new THREE.TorusKnotGeometry (0.5, 0.15, 200, 32)
   const mesh = new THREE.Mesh (geometry, shaderMaterial)
   scene.add (mesh)
   
   // add light
   const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
   scene.add (ambientLight)
   
   // animation loop
   renderer.setAnimationLoop (time => {
      shaderMaterial.uniforms.u_time.value = time * 0.001
      controls.update ()
      renderer.render (scene, camera)
   })
   
   // render code block
   codeblockRenderer (document, "shader_3d_script", "shader_3d_code")
</script>


# Key GLSL Language Features

GLSL (OpenGL Shading Language) has some useful features for this sort of work:

## Data Types

- `float`: decimal numbers (`1.0`, `3.14159`)
- `int`: whole numbers (`1`, `42`)
- `bool`: true or false (`true`, `false`)
- `vec2`, `vec3`, `vec4`: vectors with 2, 3, or 4 components
- `mat2`, `mat3`, `mat4`: 2×2, 3×3, or 4×4 matrices

## Operations

You can perform operations on entire vectors at once:

```glsl
vec3 color1 = vec3 (1.0, 0.0, 0.5);
vec3 color2 = vec3 (0.0, 1.0, 0.5);
vec3 mixedColor = color1 + color2; // Results in (1.0, 1.0, 1.0)
```

## Built-in Functions

GLSL has many useful built-in functions:

- `sin ()`, `cos ()`, `tan ()`: trigonometric functions
- `mix (a, b, t)`: linear interpolation between `a` and `b` based on `t`
- `smoothstep (edge0, edge1, x)`: smooth transition between 0 and 1
- `distance (p1, p2)`: calculate distance between two points

# Shaders in p5.js

p5.js also supports shaders, making GPU-based graphics accessible to beginners. Let's create a simple p5.js shader example:

<div id="p5_shader_container"></div>
<div id="p5_shader_code"></div>

<script id="p5_shader_script" type="module">
   import codeblockRenderer from "/scripts/codeblock_renderer.js"
   import p5 from "/scripts/p5.esm.js"
   
   const sketch = p => {
      console.log (p.createShader)
      let theShader
      
      p.preload = () => {

         // Define the shaders as strings
         const vertexShader = `
            attribute vec3 aPosition;
            attribute vec2 aTexCoord;
            
            varying vec2 vTexCoord;
            
            void main() {
               vTexCoord = aTexCoord;
               vec4 positionVec4 = vec4(aPosition, 1.0);
               positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
               gl_Position = positionVec4;
            }
         `
         
         const fragmentShader = `
            precision mediump float;
            
            varying vec2 vTexCoord;
            uniform vec2 u_resolution;
            uniform float u_time;
            uniform vec2 u_mouse;
            
            float circle(vec2 st, float radius, vec2 center) {
               vec2 dist = st - center;
               return 1.0 - smoothstep(radius - 0.01, radius + 0.01, dot(dist, dist) * 4.0);
            }
            
            void main() {
               vec2 st = vTexCoord;
               
               // Create a gradient background
               vec3 bg = vec3(st.x, st.y, 0.5);
               
               // Interactive circle that follows the mouse
               float mouseBall = circle(st, 0.1, u_mouse);
               vec3 mouseBallColor = vec3(1.0, 0.2, 0.6);
               
               // Time-based animated circles
               float t = u_time * 0.5;
               float pulse = sin(t) * 0.5 + 0.5;
               float circle1 = circle(st, 0.2 * pulse, vec2(0.3, 0.3));
               float circle2 = circle(st, 0.1 * (1.0 - pulse), vec2(0.7, 0.7));
               
               // Blend all elements together
               vec3 color = bg;
               color = mix(color, vec3(0.0, 0.8, 0.8), circle1);
               color = mix(color, vec3(1.0, 0.8, 0.0), circle2);
               color = mix(color, mouseBallColor, mouseBall);
               
               gl_FragColor = vec4(color, 1.0);
            }
         `
         
         // Load the shader
         theShader = p.createShader (vertexShader, fragmentShader)
      }
      
      p.setup = () => {
         // Create a canvas that fills the container
         const container = document.getElementById ('p5_shader_container')
         const width = container.offsetWidth
         const height = width * 9 / 16
         p.createCanvas (width, height, p.WEBGL)
         p.noStroke ()
      }
      
      p.draw = () => {
         // Shader uniforms can be set with setUniform
         theShader.setUniform ("u_resolution", [p.width, p.height])
         theShader.setUniform ("u_time", p.millis () / 1000.0)
         theShader.setUniform ("u_mouse", [p.mouseX / p.width, 1.0 - p.mouseY / p.height])
         
         // Apply the shader
         p.shader (theShader)
         
         // Draw a rectangle covering the entire canvas
         p.rect(0, 0, p.width, p.height)
      }
   }
   
   // Create the p5 instance and attach it to the container
   new p5 (sketch, 'p5_shader_container')
   
   // Render the code for the p5 sketch
   codeblockRenderer (document, "p5_shader_script", "p5_shader_code")
</script>

In this p5.js example:

1. We create a p5.js sketch with the instance mode
2. We define both vertex and fragment shaders as strings within our JavaScript code
3. We use p5.js's `createShader ()` function to compile the shader
4. We pass uniforms to the shader using `setUniform ()`
5. The shader creates gradient background with animated circles and mouse interaction

This approach makes shader programming more accessible to beginners who are already familiar with p5.js.

# Creating Moiré Effects with Shaders

Moiré patterns are the interference effects that occur when two similar patterns are overlaid with slight differences.

## 1. Concentric Circles

This example creates a moiré pattern by overlaying two sets of concentric circles:

<div id="moire_circles"></div>
<div id="moire_circles_code"></div>

<script id="moire_circles_script" type="module">
   import * as THREE from "/scripts/threejs/three.js"
   import codeblockRenderer from "/scripts/codeblock_renderer.js"
   
   const div = document.getElementById ("moire_circles")
   const width = div.parentNode.scrollWidth
   const height = width * 9 / 16
   
   // Basic three.js setup
   const scene = new THREE.Scene ()
   const camera = new THREE.PerspectiveCamera (70, width / height, 0.01, 10)
   camera.position.z = 0.6
   
   const renderer = new THREE.WebGLRenderer ({ antialias: true })
   renderer.setSize (width, height)
   div.appendChild (renderer.domElement)
   
   // Track mouse position
   const mouse = new THREE.Vector2 (0.5, 0.5)
   
   div.onmousemove = event => {
      const rect = renderer.domElement.getBoundingClientRect ()
      mouse.x = (event.clientX - rect.left) / width
      mouse.y = 1.0 - (event.clientY - rect.top) / height  // Invert Y coordinate
   }
   
   div.onmouseleave = () => {
      // return to center when mouse leaves
      mouse.x = 0.5
      mouse.y = 0.5
   }
   
   // create shader material
   const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
         u_time: { value: 0.0 },
         u_mouse: { value: mouse }
      },
      vertexShader: `
         varying vec2 vUv;
         void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
         }
      `,
      fragmentShader: `
         uniform float u_time;
         uniform vec2 u_mouse;
         varying vec2 vUv;
         
         void main() {
            // Normalized pixel coordinates (0 to 1)
            vec2 uv = vUv;

            // Calculate aspect ratio-corrected UV coordinates
            float aspect = 16.0 / 9.0;
            vec2 uv_corrected = vec2 (uv.x * aspect, uv.y);

            // Create two sets of concentric circles with different centers
            // First set - fixed,
            vec2 center1 = vec2 (0.5, 0.5);
            vec2 center1_corrected = vec2 (center1.x * aspect, center1.y);
            float dist1 = distance (uv_corrected, center1_corrected) * 360.0;
            float circle1 = sin (dist1) * 0.5 + 0.5;
            
            // Second set - controlled by mouse
            vec2 center2 = u_mouse;
            vec2 center2_corrected = vec2 (center2.x * aspect, center2.y);
            float dist2 = distance (uv_corrected, center2_corrected) * 360.0;
            float circle2 = sin (dist2) * 0.5 + 0.5;
            
            // Create moiré pattern by multiplying
            float moire = circle1 * circle2;
            
            // Change color based on mouse position
            float r = u_mouse.x * 0.5;
            float g = moire * 0.8;
            float b = u_mouse.y * 0.5 + moire * 0.5;
            
            vec3 color = vec3 (r, g, b);
            gl_FragColor = vec4 (color, 1.0);
         }
      `
   });
   
   // create plane and add to scene
   const geometry = new THREE.PlaneGeometry (1.6, 0.9)
   const mesh = new THREE.Mesh (geometry, shaderMaterial)
   scene.add (mesh)
   
   // animation loop
   renderer.setAnimationLoop (time => {
      shaderMaterial.uniforms.u_time.value = time * 0.001
      renderer.render (scene, camera)
   });
   
   // Render code block
   codeblockRenderer (document, "moire_circles_script", "moire_circles_code")
</script>

## 2. Rotating Grid Patterns

This example creates a moiré effect by overlaying two grid patterns, with one rotating over time.

<div id="moire_grid"></div>
<div id="moire_grid_code"></div>

<script id="moire_grid_script" type="module">
   import * as THREE from "/scripts/threejs/three.js"
   import codeblockRenderer from "/scripts/codeblock_renderer.js"
   
   const div = document.getElementById ("moire_grid")
   const width = div.parentNode.scrollWidth
   const height = width * 9 / 16
   
   // basic three.js setup
   const scene = new THREE.Scene()
   const camera = new THREE.PerspectiveCamera (70, width / height, 0.01, 10)
   camera.position.z = 0.5
   
   const renderer = new THREE.WebGLRenderer ({ antialias: true })
   renderer.setSize (width, height)
   div.appendChild (renderer.domElement)
   
   // create shader material
   const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
         u_time: { value: 0.0 }
      },
      vertexShader: `
         varying vec2 vUv;
         void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
         }
      `,
      fragmentShader: `
         uniform float u_time;
         varying vec2 vUv;
         
         void main () {
            // normalized pixel coordinates (0 to 1)
            vec2 uv = vUv;
            vec2 center = vec2(0.5, 0.5);
            
            // first grid pattern - with sinusoidal frequency modulation
            vec2 toCenter = uv - center;

            // base frequency that pulses between 
            // 400 and 800 using sine wave
            float baseFreq1 = 600.0 + 200.0 * sin (u_time * 0.07);
            float dist = length(toCenter) * baseFreq1;
            float angle1 = atan(toCenter.y, toCenter.x);
            float radialGrid = sin(dist) * 0.5 + 0.5;
            float angularGrid = sin(angle1 * 100.0) * 0.5 + 0.5;
            float grid1 = radialGrid * angularGrid;
            
            // second grid pattern 
            // rotating with different pulsing frequency
            float baseFreq2 = 600.0 + 200.0 * sin (u_time * 0.09817477042);
            float angle2 = u_time * 0.01;
            float s = sin (angle2);
            float c = cos (angle2);
            
            // translate to center, rotate, then translate back
            vec2 centered = uv - center;
            vec2 rotatedUV = vec2 (
               centered.x * c - centered.y * s,
               centered.x * s + centered.y * c
            );
            rotatedUV += center;
            
            // create an ultra-dense grid pattern with pulsing frequency
            float grid2x = sin (rotatedUV.x * baseFreq2) * 0.5 + 0.5; 
            float grid2y = sin (rotatedUV.y * baseFreq2) * 0.5 + 0.5;
            float grid2 = grid2x * grid2y;
            
            // combine for moiré effect
            float moire = grid1 * grid2;
            
            vec3 color = vec3 (moire, 0.2, 0.5);
            gl_FragColor = vec4 (color, 1.0);
         }
      `
   });
   
   // Create plane and add to scene
   const geometry = new THREE.PlaneGeometry (1.6, 0.9)
   const mesh = new THREE.Mesh (geometry, shaderMaterial)
   scene.add (mesh)
   
   // Animation loop
   renderer.setAnimationLoop (time => {
      shaderMaterial.uniforms.u_time.value = time * 0.001
      renderer.render (scene, camera)
   });
   
   // Render code block
   codeblockRenderer (document, "moire_grid_script", "moire_grid_code")
</script>

## 3. Radial vs Linear Patterns

This example creates a moiré effect by combining radial lines with moving linear lines.

<div id="moire_radial"></div>
<div id="moire_radial_code"></div>

<script id="moire_radial_script" type="module">
   import * as THREE from "/scripts/threejs/three.js"
   import codeblockRenderer from "/scripts/codeblock_renderer.js"
   
   const div = document.getElementById ("moire_radial")
   const width = div.parentNode.scrollWidth
   const height = width * 9 / 16
   
   // Basic three.js setup
   const scene = new THREE.Scene ()
   const camera = new THREE.PerspectiveCamera (70, width / height, 0.01, 10)
   camera.position.z = 0.5
   
   const renderer = new THREE.WebGLRenderer ({ antialias: true })
   renderer.setSize (width, height)
   div.appendChild (renderer.domElement)
   
   // Create shader material
   const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
         u_time: { value: 0.0 }
      },
      vertexShader: `
         varying vec2 vUv;
         void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
         }
      `,
      fragmentShader: `
         uniform float u_time;
         varying vec2 vUv;
         
         void main() {
            // Normalized pixel coordinates (0 to 1)
            vec2 uv = vUv;
            
            // Center coordinate
            vec2 center = vec2 (0.5, 0.5);
            
            // Radial lines
            float angle = atan (uv.y - center.y, uv.x - center.x);
            float radialLines = sin (angle * 360.0) * 0.5 + 0.5;
            
            // Linear lines (with movement)
            float t = u_time * 0.02;
            float linearLines = sin((uv.x + uv.y + t) * 600.0) * 1.5 + 0.5;
            
            // Combine patterns for moiré effect
            float moire = radialLines * linearLines;
            
            vec3 color = vec3(0.8, moire * 0.8, moire * 0.5);
            gl_FragColor = vec4(color, 1.0);
         }
      `
   });
   
   // Create plane and add to scene
   const geometry = new THREE.PlaneGeometry(1.6, 0.9)
   const mesh = new THREE.Mesh(geometry, shaderMaterial)
   scene.add(mesh)
   
   // Animation loop
   renderer.setAnimationLoop(ms => {
      const t = ms * 0.001
      shaderMaterial.uniforms.u_time.value = t
      const sig = Math.sin (t * 0.05 * Math.PI * 2)
      camera.position.z = 1.1 + sig
      renderer.render (scene, camera)
   });
   
   // Render code block
   codeblockRenderer (document, "moire_radial_script", "moire_radial_code")
</script>

## How Moiré Patterns Work

Moiré patterns occur when two similar patterns are overlaid with a slight difference in angle, spacing, or position. The key principles to remember:

1. **Pattern Similarity** - The two patterns should be similar but slightly different (two grids, two sets of concentric circles, etc.)

2. **Interaction Methods**:
   - **Multiplication** - Multiply the two pattern values together
   - **Addition** - Add the pattern values and then normalize
   - **Subtraction** - Take the absolute difference between patterns

3. **Movement** - Animate one pattern relative to the other by:
   - Rotating one pattern
   - Scaling one pattern
   - Moving one pattern's center
   - Changing one pattern's frequency

# Code and Concept References

The examples in this tutorial draw inspiration and knowledge from several excellent sources:

## p5.js Shader Example
- Implementation based on the [p5.js shader tutorial](https://p5js.org/examples/3d-shader-using-webcam.html)
- SDF circle function adapted from [The Book of Shaders: Shapes](https://thebookofshaders.com/07/)

## Basic Shader Example
- Color wave animation concept: Inspired by [The Book of Shaders: Colors chapter](https://thebookofshaders.com/06/)
- Three.js implementation: Based on the [Three.js ShaderMaterial documentation](https://threejs.org/docs/#api/en/materials/ShaderMaterial)

## Interactive Ripple Effect
- Ripple mathematics: Adapted from [Shadertoy: Water Ripple by Alexander Alekseev](https://www.shadertoy.com/view/4dS3Wd)
- Mouse interaction technique: Based on Three.js examples for [Interactive Particles](https://threejs.org/examples/?q=inter#webgl_interactive_particles)

## 3D Vertex Animation
- Vertex displacement technique: Inspired by [Three.js examples: Vertex displacement](https://threejs.org/examples/?q=shader#webgl_shader)
- Color animation: Based on techniques from [The Book of Shaders: Shapes](https://thebookofshaders.com/07/)

## Moiré Patterns
- Basic moiré concept: Mathematical principles from [Physically Based Rendering](http://www.pbr-book.org/) by Matt Pharr
- Concentric circles implementation: Adapted from [Inigo Quilez's articles on SDFs](https://iquilezles.org/articles/distfunctions2d/)
- Irrational frequency relationship: Based on principles from [Nature of Code](https://natureofcode.com/book/chapter-1-vectors/) by Daniel Shiffman

# Resources for Learning More

More resources:

- [The Book of Shaders](https://thebookofshaders.com/) - A gentle step-by-step guide
- [Shadertoy](https://www.shadertoy.com/) - See and experiment with amazing shaders
- [Three.js Shaders Documentation](https://threejs.org/docs/#api/en/materials/ShaderMaterial) - Reference for using shaders in Three.js
- [Inigo Quilez's Articles](https://iquilezles.org/articles/) - Deep dives into shader mathematics
- [ShaderToy: Art of Code](https://www.youtube.com/c/TheArtofCodeIsCool) - YouTube channel with excellent shader tutorials

