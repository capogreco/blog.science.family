---
title: ascii cam
published_at: 2024-04-12
snippet: webcam rendered via ASCII characters
disable_html_sanitization: true
---

<div id="ascii_div"></div>

<script type="module">
   const stream = await navigator.mediaDevices.getUserMedia ({ 
      audio: false,
      video: true,
      facingMode: `user`,
   })

   const videoTracks = await stream.getVideoTracks ()
   console.log (`Using video device: ${ videoTracks[0].label }`)

   const video = document.createElement (`video`)
   video.srcObject = stream
   await video.play ()

   const cnv = document.createElement (`canvas`)
   cnv.width  = 64
   cnv.height = cnv.width * video.videoHeight / video.videoWidth

   const div = document.getElementById (`ascii_div`)
   div.style.fontFamily = `monospace`
   div.style.textAlign = `center`

   const ctx = cnv.getContext (`2d`)

   const chars = "¶Ñ@%&∆∑∫#Wß¥$£√?!†§ºªµ¢çø∂æåπ*™≤≥≈∞~,.…_¬“‘˚`˙"

   const draw_frame = async () => {

      ctx.save ()
      ctx.scale (-1, 1)
      ctx.drawImage (video, -cnv.width, 0, cnv.width, cnv.height)
      ctx.restore ()

      const pixels = await ctx.getImageData (0, 0, cnv.width, cnv.height).data

      let ascii_img = ``

      for (let y = 0; y < cnv.height; y += 2) {
         for (let x = 0; x < cnv.width; x++) {
            const i = (y * cnv.width + x) * 4
            const r = pixels[i]
            const g = pixels[i + 1]
            const b = pixels[i + 2]
            const br = (r * g * b / 16581375) ** 0.1
            const char_i = Math.floor (br * chars.length)
            ascii_img += chars[char_i]
         }
         ascii_img += `\n`
      }

      div.innerText = ascii_img

      requestAnimationFrame (draw_frame)
   }

   draw_frame ()
</script>


<br>

```html
<div id="ascii_div"></div>

<script type="module">
   const stream = await navigator.mediaDevices.getUserMedia ({ 
      audio: false,
      video: true,
      facingMode: `user`,
   })

   const videoTracks = await stream.getVideoTracks ()
   console.log (`Using video device: ${ videoTracks[0].label }`)

   const video = document.createElement (`video`)
   video.srcObject = stream
   await video.play ()

   const cnv = document.createElement (`canvas`)
   cnv.width  = 64
   cnv.height = cnv.width * video.videoHeight / video.videoWidth

   const div = document.getElementById (`ascii_div`)
   div.style.fontFamily = `monospace`
   div.style.textAlign = `center`

   const ctx = cnv.getContext (`2d`)

   const chars = "¶Ñ@%&∆∑∫#Wß¥$£√?!†§ºªµ¢çø∂æåπ*™≤≥≈∞~,.…_¬“‘˚`˙"

   const draw_frame = async () => {

      ctx.save ()
      ctx.scale (-1, 1)
      ctx.drawImage (video, -cnv.width, 0, cnv.width, cnv.height)
      ctx.restore ()

      const pixels = await ctx.getImageData (0, 0, cnv.width, cnv.height).data

      let ascii_img = ``

      for (let y = 0; y < cnv.height; y += 2) {
         for (let x = 0; x < cnv.width; x++) {
            const i = (y * cnv.width + x) * 4
            const r = pixels[i]
            const g = pixels[i + 1]
            const b = pixels[i + 2]
            const br = (r * g * b / 16581375) ** 0.1
            const char_i = Math.floor (br * chars.length)
            ascii_img += chars[char_i]
         }
         ascii_img += `\n`
      }

      div.innerText = ascii_img

      requestAnimationFrame (draw_frame)
   }

   draw_frame ()
</script>
```

Inspired by [this p5 sketch](https://editor.p5js.org/codingtrain/sketches/KTVfEcpWx).

