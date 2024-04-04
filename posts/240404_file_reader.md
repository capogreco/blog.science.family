---
title: File Reader
published_at: 2024-04-04
snippet: wrangling files in javascript
disable_html_sanitization: true
---


<div id="drop_zone"></div>

<script type="module">

   const data_div = document.getElementById (`drop_zone`)

   data_div.width = data_div.parentNode.scrollWidth
   data_div.style.height = `${ data_div.width * 9 / 16 }px`
   data_div.style.backgroundColor = `deeppink`
   data_div.style.color = `white`
   data_div.style.overflow = `hidden`
   data_div.style.fontFamily = `monospace`
   data_div.style.fontWeight = `bold`
   data_div.style.fontSize = `xx-small`
   data_div.style.wordBreak = `break-all`

   let data_text

   data_div.ondragover = e => e.preventDefault ()

   data_div.ondrop = e => {

      const reader = new FileReader ()

      const file_array = [ ...e.dataTransfer.files ]

      file_array.forEach (f => reader.readAsDataURL (f))

      reader.onload = d => start_draw (d.target.result) //.target.result)

      e.preventDefault ()
   }

   const start_draw = r => {
      if (r.length > 100000) {
         r = r.slice (0, 100000)
      }
      data_text = r
      draw_frame ()
   }

   const draw_frame = () => {

      data_div.innerText = data_text

      data_text = data_text.slice (135, data_text.length)

      requestAnimationFrame (draw_frame)
   }


</script>

<em>drag and drop a file onto here ^</em>

```html
   <div id="drop_zone"></div>

   <script type="module">

   const data_div = document.getElementById (`drop_zone`)

   data_div.width = data_div.parentNode.scrollWidth
   data_div.style.height = `${ data_div.width * 9 / 16 }px`
   data_div.style.backgroundColor = `deeppink`
   data_div.style.color = `white`
   data_div.style.overflow = `hidden`
   data_div.style.fontFamily = `monospace`
   data_div.style.fontWeight = `bold`
   data_div.style.fontSize = `xx-small`
   data_div.style.wordBreak = `break-all`

   let data_text

   data_div.ondragover = e => e.preventDefault ()

   data_div.ondrop = e => {

      const reader = new FileReader ()

      const file_array = [ ...e.dataTransfer.files ]

      file_array.forEach (f => reader.readAsDataURL (f))

      reader.onload = d => start_draw (d.target.result)

      e.preventDefault ()
   }

   const start_draw = r => {

      if (r.length > 100000) {
         r = r.slice (0, 100000)
      }

      data_text = r

      draw_frame ()
   }

   const draw_frame = () => {

      data_div.innerText = data_text

      data_text = data_text.slice (135, data_text.length)

      requestAnimationFrame (draw_frame)
   }

   </script>
```