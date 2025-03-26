---
title: Pixel Data
published_at: 2024-04-07
snippet: finding the colour of individual pixels
disable_html_sanitization: true
---

<canvas id="colour_picker"></canvas>

<div id="picked_colour"></div>

<script type="module" id="pixel_data">
   const cnv  = document.getElementById (`colour_picker`)
   cnv.width  = cnv.parentNode.scrollWidth
   cnv.height = cnv.width * 9 / 16   

   // can this block be refactored?
   const div = document.getElementById (`picked_colour`)
   div.style.height = `${ div.parentNode.scrollWidth * 9 / 32 }px`
   div.style.fontFamily      = `monospace`
   div.style.fontWeight      = `bold`
   div.style.textAlign       = 'center'
   div.style.lineHeight      = div.style.height
   div.style.fontSize        = '36px'
   div.style.color           = 'white'
   div.style.backgroundColor = `black`

   const ctx = cnv.getContext (`2d`)

   const draw = i => ctx.drawImage (i, 0, 0, cnv.width, cnv.height)

   const img = new Image ()

   let img_data = false

   img.onload = () => {
      cnv.height = cnv.width * (img.height / img.width)
      draw (img)
      img_data = ctx.getImageData (0, 0, cnv.width, cnv.height).data
   }

   img.src = `/240407/thelonious.jpg`

   // what does this function do?
   const rectify = (s, w, c) => {
      if (s.length >= w) return s
      else return (Array (w).join (c) + s).slice (-w)
   }

   cnv.onpointermove = e => {
      if (!img_data) return
      const x = Math.floor (e.offsetX)
      const y = Math.floor (e.offsetY)
      const i = ((y * cnv.width) + x) * 4

      const r = rectify (img_data[i].toString (), 3, `0`)
      const g = rectify (img_data[i + 1].toString (), 3, `0`)
      const b = rectify (img_data[i + 2].toString (), 3, `0`)
      
      const col = `rgb(${ r }, ${ g }, ${ b })`
      div.innerText = col
      div.style.backgroundColor = col
   }
</script>

<script type="module">
   import codeBlockRenderer from "/scripts/codeblock_renderer.js"
   codeBlockRenderer (document, `pixel_data`, `picked_colour`)
</script>

Note the use of:
- [HTMLElement: .onload](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/load_event)
- [Pixel manipulation with canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas)
- [Pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)