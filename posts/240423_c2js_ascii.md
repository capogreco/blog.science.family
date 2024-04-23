---
title: c2.js with ascii
published_at: 2024-04-17
snippet: example of combination
disable_html_sanitization: true
---

<script src="/scripts/c2.min.js"></script>

<canvas id="c2"></canvas>
<div id="ascii_div"></div>

<script>
   //Created by Ren Yuan

   const renderer = new c2.Renderer (document.getElementById ('c2'));
   resize ()

   renderer.background ('turquoise')
   let random = new c2.Random ()

   class Agent extends c2.Point {
      constructor () {
         let x = random.next (renderer.width)
         let y = random.next (renderer.height)
         super (x, y)

         this.vx = random.next (-2, 2)
         this.vy = random.next (-2, 2)
      }

      update() {
         this.x += this.vx
         this.y += this.vy

         if (this.x < 0) {
               this.x = 0
               this.vx *= -1
         } else if (this.x > renderer.width) {
               this.x = renderer.width
               this.vx *= -1
         }
         if (this.y < 0) {
               this.y = 0
               this.vy *= -1
         } else if (this.y > renderer.height) {
               this.y = renderer.height
               this.vy *= -1
         }
      }

      display () {
         // renderer.stroke ('white')
         // renderer.lineWidth (5)
         // renderer.point (this.x, this.y);
      }
   }

   let agents = new Array (20)
   for (let i = 0; i < agents.length; i++) agents[i] = new Agent ()

   const chars = "¶Ñ@%&∆∑∫#Wß¥$£√?!†§ºªµ¢çø∂æåπ*™≤≥≈∞~,.…_¬“‘˚`˙"

   const div = document.getElementById (`ascii_div`)
   div.style.fontFamily = `monospace`
   div.style.textAlign = `center`

   renderer.draw (() => {
      renderer.clear ()

      let delaunay = new c2.Delaunay ()
      delaunay.compute (agents)
      let vertices = delaunay.vertices
      let edges = delaunay.edges
      let triangles = delaunay.triangles

      let maxArea = 0
      let minArea = Number.POSITIVE_INFINITY;
      for (let i = 0; i < triangles.length; i++) {
         let area = triangles[i].area ()
         if (area < minArea) minArea = area
         if (area > maxArea) maxArea = area
      }

      renderer.stroke (false)
      for (let i = 0; i < triangles.length; i++) {
         let t = c2.norm (triangles[i].area(), minArea, maxArea)
         let color = c2.Color.hsl (315+30*t, 30+30*t, 20+80*t)
         renderer.fill (color)
         renderer.triangle (triangles[i])
      }

      for (let i = 0; i < agents.length; i++) {
         agents[i].display ()
         agents[i].update ()
      }

      let ascii_img = ``

      const pixels = renderer.context.getImageData (0, 0, renderer.canvas.width, renderer.canvas.height).data

      for (let y = 0; y < renderer.canvas.height; y += 22) {
         for (let x = 0; x < renderer.canvas.width; x += 10) {
            const i = (y * renderer.canvas.width + x) * 4
            const r = pixels[i]
            const g = pixels[i + 1]
            const b = pixels[i + 2]
            // const br = Math.min ((r * g * b / 16581376) ** 0.1, 0.999)
            const br = (r * g * b / 16581376) ** 0.1
            const char_i = Math.floor (br * chars.length)
            ascii_img += chars[char_i]
         }
         ascii_img += `\n`
      }

      div.innerText = ascii_img

   })

   function resize () {
      let parent = renderer.canvas.parentElement
      renderer.size (parent.clientWidth, parent.clientWidth / 16 * 9)
   }
</script>

<br>

```html
<canvas id="c2"></canvas>
<div id="ascii_div"></div>

<script>
   //Created by Ren Yuan

   const renderer = new c2.Renderer (document.getElementById ('c2'));
   resize ()

   renderer.background ('turquoise')
   let random = new c2.Random ()

   class Agent extends c2.Point {
      constructor () {
         let x = random.next (renderer.width)
         let y = random.next (renderer.height)
         super (x, y)

         this.vx = random.next (-2, 2)
         this.vy = random.next (-2, 2)
      }

      update() {
         this.x += this.vx
         this.y += this.vy

         if (this.x < 0) {
               this.x = 0
               this.vx *= -1
         } else if (this.x > renderer.width) {
               this.x = renderer.width
               this.vx *= -1
         }
         if (this.y < 0) {
               this.y = 0
               this.vy *= -1
         } else if (this.y > renderer.height) {
               this.y = renderer.height
               this.vy *= -1
         }
      }

      display () {
         // renderer.stroke ('white')
         // renderer.lineWidth (5)
         // renderer.point (this.x, this.y);
      }
   }

   let agents = new Array (20)
   for (let i = 0; i < agents.length; i++) agents[i] = new Agent ()

   const chars = "¶Ñ@%&∆∑∫#Wß¥$£√?!†§ºªµ¢çø∂æåπ*™≤≥≈∞~,.…_¬“‘˚`˙"

   const div = document.getElementById (`ascii_div`)
   div.style.fontFamily = `monospace`
   div.style.textAlign = `center`

   renderer.draw (() => {
      renderer.clear ()

      let delaunay = new c2.Delaunay ()
      delaunay.compute (agents)
      let vertices = delaunay.vertices
      let edges = delaunay.edges
      let triangles = delaunay.triangles

      let maxArea = 0
      let minArea = Number.POSITIVE_INFINITY;
      for (let i = 0; i < triangles.length; i++) {
         let area = triangles[i].area ()
         if (area < minArea) minArea = area
         if (area > maxArea) maxArea = area
      }

      renderer.stroke (false)
      for (let i = 0; i < triangles.length; i++) {
         let t = c2.norm (triangles[i].area(), minArea, maxArea)
         let color = c2.Color.hsl (315+30*t, 30+30*t, 20+80*t)
         renderer.fill (color)
         renderer.triangle (triangles[i])
      }

      for (let i = 0; i < agents.length; i++) {
         agents[i].display ()
         agents[i].update ()
      }

      let ascii_img = ``

      const pixels = renderer.context.getImageData (0, 0, renderer.canvas.width, renderer.canvas.height).data

      for (let y = 0; y < renderer.canvas.height; y += 22) {
         for (let x = 0; x < renderer.canvas.width; x += 10) {
            const i = (y * renderer.canvas.width + x) * 4
            const r = pixels[i]
            const g = pixels[i + 1]
            const b = pixels[i + 2]
            // const br = Math.min ((r * g * b / 16581376) ** 0.1, 0.999)
            const br = (r * g * b / 16581376) ** 0.1
            const char_i = Math.floor (br * chars.length)
            ascii_img += chars[char_i]
         }
         ascii_img += `\n`
      }

      div.innerText = ascii_img

   })

   function resize () {
      let parent = renderer.canvas.parentElement
      renderer.size (parent.clientWidth, parent.clientWidth / 16 * 9)
   }
</script>
```