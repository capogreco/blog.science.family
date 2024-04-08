---
title: Pixel Sort
published_at: 2024-04-08
snippet: putting pixels in order
disable_html_sanitization: true
---

<canvas id="pixel_sort"></canvas>

<script type="module">

   const cnv  = document.getElementById (`pixel_sort`)
   cnv.width  = cnv.parentNode.scrollWidth
   cnv.height = cnv.width * 9 / 16   

   const ctx = cnv.getContext (`2d`)

   const draw = i => ctx.drawImage (i, 0, 0, cnv.width, cnv.height)

   const img = new Image ()

   let img_data = false

   img.onload = async () => {
      cnv.height = cnv.width * (img.height / img.width)
      draw (img)
      img_data = await ctx.getImageData (0, 0, cnv.width, cnv.height).data
      process ()
   }

   img.src = `/240408/kornerpark.jpg`

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

   const process = () => {
      const rand_int = m => Math.floor (Math.random () * m)
      const find_i = c => ((c.y * cnv.width) + c.x) * 4 

      const x = 250
      const y = 100
      
      for (let x_off = 0; x_off < 324; x_off++) {
         const positions = []

         for (let y_pos = y; y_pos < cnv.height; y_pos++) {
            positions.push (find_i ({ x: x + x_off, y: y_pos }))
         }

         const b_values = []

         positions.forEach (p => {
            const r = img_data[p]
            const g = img_data[p + 1]
            const b = img_data[p + 2]
            b_values.push ({ r, g, b, br: r * g * b })
         })

         const sorted = quicksort (b_values)
         sorted.reverse ()

         let rgba = []

         sorted.forEach ((e, i) => {
            rgba.push (e.r)
            rgba.push (e.g)
            rgba.push (e.b)
            rgba.push (255)
         })

         rgba = new Uint8ClampedArray (rgba)

         const new_data = ctx.createImageData (1, cnv.height - y)
         
         new_data.data.set (rgba)

         ctx.putImageData (new_data, x + x_off, y)
      }
   }
</script>

