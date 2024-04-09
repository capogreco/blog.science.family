---
title: Pixel Sort
published_at: 2024-04-08
snippet: putting pixels in order
disable_html_sanitization: true
---

<canvas id="pixel_sort"></canvas>

<script type="module">
   import { PixelSorter } from "/scripts/pixel_sort.js"

   const cnv  = document.getElementById (`pixel_sort`)
   cnv.width  = cnv.parentNode.scrollWidth
   cnv.height = cnv.width * 9 / 16   

   const ctx = cnv.getContext (`2d`)
   const sorter = new PixelSorter (ctx)

   const img = new Image ()

   img.onload = async () => {
      cnv.height = cnv.width * (img.height / img.width)
      ctx.drawImage (img, 0, 0, cnv.width, cnv.height)
      sorter.init ()
      draw_frame ()
   }

   img.src = `/240408/kornerpark.jpg`

   let frame_count = 0
   const draw_frame = () => {

      ctx.drawImage (img, 0, 0, cnv.width, cnv.height)

      let sig = Math.cos (frame_count * 2 * Math.PI / 500)

      const mid = {
         x: cnv.width / 2,
         y: cnv.height / 2
      }

      const dim = {
         x: Math.floor ((sig + 3) * (cnv.width / 6)) + 1,
         y: Math.floor ((sig + 1) * (cnv.height / 6)) + 1
      }

      const pos = {
         x: Math.floor (mid.x - (dim.x / 2)),
         y: Math.floor (mid.y - (dim.y / 2))
      }

      sorter.glitch (pos, dim)

      frame_count++
      requestAnimationFrame (draw_frame)
   }

</script>

```html
<canvas id="pixel_sort"></canvas>

<script type="module">
   import { PixelSorter } from "/scripts/pixel_sort.js"

   const cnv  = document.getElementById (`pixel_sort`)
   cnv.width  = cnv.parentNode.scrollWidth
   cnv.height = cnv.width * 9 / 16   

   const ctx = cnv.getContext (`2d`)
   const sorter = new PixelSorter (ctx)

   const img = new Image ()

   img.onload = async () => {
      cnv.height = cnv.width * (img.height / img.width)
      ctx.drawImage (img, 0, 0, cnv.width, cnv.height)
      sorter.init ()
      draw_frame ()
   }

   img.src = `/240408/kornerpark.jpg`

   let frame_count = 0
   const draw_frame = () => {

      ctx.drawImage (img, 0, 0, cnv.width, cnv.height)

      let sig = Math.cos (frame_count * 2 * Math.PI / 500)

      const mid = {
         x: cnv.width / 2,
         y: cnv.height / 2
      }

      const dim = {
         x: Math.floor ((sig + 3) * (cnv.width / 6)) + 1,
         y: Math.floor ((sig + 1) * (cnv.height / 6)) + 1
      }

      const pos = {
         x: Math.floor (mid.x - (dim.x / 2)),
         y: Math.floor (mid.y - (dim.y / 2))
      }

      sorter.glitch (pos, dim)

      frame_count++
      requestAnimationFrame (draw_frame)
   }

</script>
```

```js
// pixel_sort.js

const quicksort = a => {
   if (a.length <= 1) return a

   let pivot = a[0]
   let left = []
   let right = []

   for (let i = 1; i < a.length; i++) {
      if (a[i].br < pivot.br) left.push (a[i])
      else right.push (a[i])
   }

   const sorted = [ ...quicksort (left), pivot, ...quicksort (right) ]

   return sorted
}

export class PixelSorter {
   constructor (ctx) {
      this.ctx = ctx
   }

   init () {
      this.width = this.ctx.canvas.width
      this.height = this.ctx.canvas.height
      this.img_data = this.ctx.getImageData (0, 0, this.width, this.height).data
   }


   glitch (pos, dim) {
      const find_i = c => ((c.y * this.ctx.canvas.width) + c.x) * 4 

      for (let x_off = 0; x_off < dim.x; x_off++) {
         const positions = []

         for (let y_pos = pos.y; y_pos < pos.y + dim.y; y_pos++) {
            positions.push (find_i ({ x: pos.x + x_off, y: y_pos }))
         }

         const unsorted = []

         positions.forEach (p => {
            const r = this.img_data[p]
            const g = this.img_data[p + 1]
            const b = this.img_data[p + 2]
            const a = this.img_data[p + 3]
            unsorted.push ({ r, g, b, a, br: r * g * b })
         })

         const sorted = quicksort (unsorted).reverse ()

         let rgba = []

         sorted.forEach (e => {
            rgba.push (e.r)
            rgba.push (e.g)
            rgba.push (e.b)
            rgba.push (e.a)
         })

         rgba = new Uint8ClampedArray (rgba)

         const new_data = this.ctx.createImageData (1, dim.y)
         
         new_data.data.set (rgba)

         this.ctx.putImageData (new_data, pos.x + x_off, pos.y)
      }
   }
}
```
