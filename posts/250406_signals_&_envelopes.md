---
title: Signals & Envelopes
published_at: 2025-04-06
snippet: sculpting with time
disable_html_sanitization: true
---

# Using time with `requestAnimationFrame ()`

The cleanest way to create animations in the browser is by calling `requestAnimationFrame ()`, which will call the function passed into it (called a [callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)) when the browser deems itself ready for the next frame.

The problem with this is that the framerate will be completely dependant on the browser, and operating system, and device specifications.  Even if you know these things, you may find that the framerate varies over time, depending on the availability of those resources the device needs to spend on preparing the next animation frame.

This means that animations that depend solely on iterating a `frameCount` variable may run faster in some contexts, and slower in others.

In order to ameliorate this problem, `requestAnimationFrame` passes the elapsed time in milliseconds to the callback function, when it calls it for the next frame.

<canvas id="milli_seconds"></canvas>

<script type="module" id="ms_example">
   const cnv  = document.getElementById (`milli_seconds`)
   cnv.width  = cnv.parentNode.scrollWidth
   cnv.height = cnv.width * 9 / 32

   const ctx = cnv.getContext (`2d`)
   ctx.font = `48px monospace`
   ctx.textAlign = `center`
   ctx.textBaseline = `middle`
   
   const rectify = (s, w, c) => {
      if (s.length >= w) return s
      else return (Array (w).join (c) + s).slice (-w)
   }

   // draw_frame function takes a parameter for milliseconds
   const draw_frame = ms => {

      // cleaning up the millisecond value
      // & converting to string for display
      const ms_string = rectify (ms.toFixed (2).toString (), 9, `0`) 

      ctx.fillStyle = `turquoise`
      ctx.fillRect (0, 0, cnv.width, cnv.height)

      ctx.fillStyle = `deeppink`
      ctx.fillText (ms_string, cnv.width / 2, cnv.height / 2)

      requestAnimationFrame (draw_frame)
   }

   requestAnimationFrame (draw_frame)
</script>

<script type="module">
   import codeblockRenderer from "./scripts/codeblock_renderer.js"
   codeblockRenderer (document, `ms_example`, `milli_seconds`)
</script>


# Phase Ramps

<style>
   .iframe-container {
      display: flex;
      justify-content: center;
      margin: 1em 0; /* Optional: Add some vertical spacing */
   }
</style>

<div class="iframe-container">
<iframe 
   src="https://editor.p5js.org/capogreco/full/_1BDmNcrB" 
   id="linear"
   width=300 
   height=342
></iframe>
</div>

For repetative (or *periodic*) motion, often the simplest way to imagine how things change is to think in terms of *phase*, which refers to how far along the present moment is between the start (` = 0`) and the finish (` = 1`).

For example:

<canvas id="phase_ramp_cnv"></canvas>

<script type="module" id="phase_ramp">
   const cnv = document.getElementById (`phase_ramp_cnv`)
   cnv.width = cnv.parentNode.scrollWidth

   const h = cnv.width * 9 / 32
   cnv.height = h

   const ctx = cnv.getContext (`2d`)

   const draw_frame = ms => {

      // convert milliseconds to seconds
      const t = ms / 1000

      // reset the phase every 9 seconds
      const p = (t / 9) % 1

      // calculate an x coordinate
      // according to the phase
      const x = p * (cnv.width - h)

      ctx.fillStyle = `turquoise`
      ctx.fillRect (0, 0, cnv.width, cnv.height)

      ctx.fillStyle = `deeppink`
      ctx.fillRect (x, 0, h, h)

      requestAnimationFrame (draw_frame)
   }

   requestAnimationFrame (draw_frame)
</script>

<script type="module">
   import codeblockRenderer from "./scripts/codeblock_renderer.js"
   codeblockRenderer (document, `phase_ramp`, `phase_ramp_cnv`)
</script>

#  Tricks with Phase Ramps

Using phase directly, like the above example, creates *linear* motion.  The nice thing about dealing with values between 0 - 1, is that we can modulate the curve of the motion by using [exponentiation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation), which we can do in javascript using the `**` operator.


<div class="iframe-container">
<iframe 
   src="https://editor.p5js.org/capogreco/full/yiE67ngHK" 
   width=300 
   height=342 
></iframe>
</div>

<canvas id="slow_start_cnv"></canvas>

<script type="module" id="slow_start">
   const cnv = document.getElementById (`slow_start_cnv`)
   cnv.width = cnv.parentNode.scrollWidth

   const h = cnv.width * 9 / 32
   cnv.height = h

   const ctx = cnv.getContext (`2d`)

   const draw_frame = ms => {

      const t = ms / 1000
      const p = (t / 9) % 1

      // calculate a curve by 
      // exponentiating the phase
      const c = p ** 3

      // calculate an x coordinate
      // according to the curve
      const x = c * (cnv.width - h)

      ctx.fillStyle = `turquoise`
      ctx.fillRect (0, 0, cnv.width, cnv.height)

      ctx.fillStyle = `deeppink`
      ctx.fillRect (x, 0, h, h)

      requestAnimationFrame (draw_frame)
   }

   requestAnimationFrame (draw_frame)
</script>

<script type="module">
   import codeblockRenderer from "./scripts/codeblock_renderer.js"
   codeblockRenderer (document, `slow_start`, `slow_start_cnv`)
</script>

In this ^ example, we put phase to the power of a positive number *above 1* (in this case, *3*), which slows down the start of the movement, and speeds up the end of the movement.

If we put phase to the power of a positive number *below 1*, we get the opposite:


<div class="iframe-container">
<iframe 
   src="https://editor.p5js.org/capogreco/full/1rjk8KUG9" 
   width=300 
   height=342
></iframe>
</div>


<canvas id="slow_end_cnv"></canvas>

<script type="module" id="slow_end">
   const cnv = document.getElementById (`slow_end_cnv`)
   cnv.width = cnv.parentNode.scrollWidth

   const h = cnv.width * 9 / 32
   cnv.height = h

   const ctx = cnv.getContext (`2d`)

   const draw_frame = ms => {

      const t = ms / 1000
      const p = (t / 9) % 1

      // calculate a curve by 
      // exponentiating the phase
      const c = p ** (1 / 3)

      const x = c * (cnv.width - h)

      ctx.fillStyle = `turquoise`
      ctx.fillRect (0, 0, cnv.width, cnv.height)

      ctx.fillStyle = `deeppink`
      ctx.fillRect (x, 0, h, h)

      requestAnimationFrame (draw_frame)
   }

   requestAnimationFrame (draw_frame)
</script>

<script type="module">
   import codeblockRenderer from "./scripts/codeblock_renderer.js"
   codeblockRenderer (document, `slow_end`, `slow_end_cnv`)
</script>

The main problem with using phase ramps in this way, is that they are *discontinuous* - they jump from the end back to the start in an abrupt fashion.

#  Triangle Wave

One way of keeping continuity is to use a triangle wave.

A lo-fi way of getting a triangle wave might be to do something like this:

<div class="iframe-container">
<iframe 
   src="https://editor.p5js.org/capogreco/full/sgmtnLcID" 
   width=300 
   height=342 
></iframe>
</div>

<canvas id="lo_fi_tri_cnv"></canvas>

<script type="module" id="lo_fi_tri">
   const cnv = document.getElementById (`lo_fi_tri_cnv`)
   cnv.width = cnv.parentNode.scrollWidth

   const h = cnv.width * 9 / 32
   cnv.height = h

   const ctx = cnv.getContext (`2d`)

   const draw_frame = ms => {

      const t = ms / 1000
      const p = (t / 9) % 1

      // calculate triangle wave signal
      const sig = 1 - Math.abs (p * 2 - 1)

      const x = sig * (cnv.width - h)

      ctx.fillStyle = `turquoise`
      ctx.fillRect (0, 0, cnv.width, cnv.height)

      ctx.fillStyle = `deeppink`
      ctx.fillRect (x, 0, h, h)

      requestAnimationFrame (draw_frame)
   }

   requestAnimationFrame (draw_frame)
</script>

<script type="module">
   import codeblockRenderer from "./scripts/codeblock_renderer.js"
   codeblockRenderer (document, `lo_fi_tri`, `lo_fi_tri_cnv`)
</script>


Again, because these signals are between 0-1, we can manipulate them using exponentiation:

<div class="iframe-container">
<iframe src="https://editor.p5js.org/capogreco/full/e9pdpd7ya" width=300 height=342>
</iframe>
</div>

<canvas id="pointy_tri_cnv"></canvas>

<script type="module" id="pointy_tri">
   const cnv = document.getElementById (`pointy_tri_cnv`)
   cnv.width = cnv.parentNode.scrollWidth

   const h = cnv.width * 9 / 32
   cnv.height = h

   const ctx = cnv.getContext (`2d`)

   const draw_frame = ms => {

      const t = ms / 1000
      const p = (t / 9) % 1

      // calculate triangle wave signal
      let sig = 1 - Math.abs (p * 2 - 1)

      // exponentiate signal
      sig = sig ** 3

      const x = sig * (cnv.width - h)

      ctx.fillStyle = `turquoise`
      ctx.fillRect (0, 0, cnv.width, cnv.height)

      ctx.fillStyle = `deeppink`
      ctx.fillRect (x, 0, h, h)

      requestAnimationFrame (draw_frame)
   }

   requestAnimationFrame (draw_frame)
</script>

<script type="module">
   import codeblockRenderer from "./scripts/codeblock_renderer.js"
   codeblockRenderer (document, `pointy_tri`, `pointy_tri_cnv`)
</script>

<div class="iframe-container">
<iframe 
   src="https://editor.p5js.org/capogreco/full/7FW4gZ7By"
   width=300
   height=342
></iframe>
</div>

<canvas id="rev_pointy_tri_cnv"></canvas>

<script type="module" id="rev_pointy_tri">
   const cnv = document.getElementById (`rev_pointy_tri_cnv`)
   cnv.width = cnv.parentNode.scrollWidth

   const h = cnv.width * 9 / 32
   cnv.height = h

   const ctx = cnv.getContext (`2d`)

   const draw_frame = ms => {

      const t = ms / 1000
      const p = (t / 9) % 1

      // calculate triangle wave signal
      let sig = 1 - Math.abs (p * 2 - 1)

      // exponentiate signal
      sig = sig ** (1 / 3)

      const x = sig * (cnv.width - h)

      ctx.fillStyle = `turquoise`
      ctx.fillRect (0, 0, cnv.width, cnv.height)

      ctx.fillStyle = `deeppink`
      ctx.fillRect (x, 0, h, h)

      requestAnimationFrame (draw_frame)
   }

   requestAnimationFrame (draw_frame)
</script>

<script type="module">
   import codeblockRenderer from "./scripts/codeblock_renderer.js"
   codeblockRenderer (document, `rev_pointy_tri`, `rev_pointy_tri_cnv`)
</script>


# Sinusoids

Sinusoids are periodic functions that oscillate smoothly between -1 and 1, and are the result of *sine* and *cosine* functions.  

The difference between sine and cosine is simply a matter of *phase* - sine functions begin at 0: 

<div class="iframe-container">
<iframe 
   src="https://editor.p5js.org/capogreco/full/jZajwt5Pa"
   width=300
   height=342
></iframe>
</div>

... whereas cosine functions begin at 1:


<div class="iframe-container">
<iframe 
   src="https://editor.p5js.org/capogreco/full/USbjjhNOM"
   width=300
   height=342
></iframe>
</div>

... which means they are out of phase by 1 / 4 of a phase, which is useful for making things go round in circles:

<canvas id="sin_cos_circle_cnv"></canvas>

<script type="module" id="sin_cos_circle">
   const cnv = document.getElementById (`sin_cos_circle_cnv`)
   cnv.width = cnv.parentNode.scrollWidth
   cnv.height = cnv.width

   const ctx = cnv.getContext (`2d`)

   const draw_frame = ms => {

      const t = ms / 1000
      const p = (t / 9) % 1

      const TAU = Math.PI * 2

      // calculate the horizontal sinusoid
      // with cosine
      let cos_sig = Math.cos (p * TAU)
      cos_sig += 1
      cos_sig /= 2

      // calculate the vertical sinusoid
      // with sine
      let sin_sig = Math.sin (p * TAU)
      sin_sig += 1
      sin_sig /= 2

      const x = cos_sig * (cnv.width  - 100)
      const y = sin_sig * (cnv.height - 100)

      ctx.fillStyle = `turquoise`
      ctx.fillRect (0, 0, cnv.width, cnv.height)

      // show the individual sinusoids
      // with white outlines
      ctx.strokeStyle = `white`

      // horizontal sinusoid square
      ctx.strokeRect (x, (cnv.height / 2) - 50, 100, 100)      

      // vertical sinusoid square
      ctx.strokeRect ((cnv.width / 2) - 50, y, 100, 100)      

      // cosine and sine combine to give circular motion
      ctx.fillStyle = `deeppink`
      ctx.fillRect (x, y, 100, 100)

      requestAnimationFrame (draw_frame)
   }

   requestAnimationFrame (draw_frame)
</script>

<script type="module">
   import codeblockRenderer from "./scripts/codeblock_renderer.js"
   codeblockRenderer (document, `sin_cos_circle`, `sin_cos_circle_cnv`)
</script>

# Envelopes

Often we might want things to happen once and then disappear, rather than continue and repeat.  For these cases it can be simpler to think about the way something changes over time as an *envelope*:

<canvas id="env_cnv"></canvas>

<script type="module" id="env">
   const cnv  = document.getElementById (`env_cnv`)
   cnv.width  = cnv.parentNode.scrollWidth
   cnv.height = cnv.width * 9 / 16

   const ctx = cnv.getContext (`2d`)

   class Blinker {
      constructor (pos, len, siz) {
         this.pos   = pos
         this.len   = len
         this.size  = siz
         this.alive = true
         this.init  = false
      }

      initialise (t) {
         this.start = t
         this.init = true
      }

      draw (t) {
         // make sure blinker is alive and initialised
         if (!this.alive || !this.init) return

         // calculate elapsed time
         const elapsed = t - this.start

         // calculate phase
         const p = elapsed / this.len

         // if phase is >= 1, 
         // set alive to false & return
         if (p >= 1) {
            this.alive = false
            return
         }

         // create envelope with lo-fi triangle alg
         // const env = 1 - Math.abs (p * 2 - 1)

         let env = Math.cos (p * Math.PI * 2) // [ -1, 1 ]
         env += 1 // [ 0, 2 ]
         env /= 2 // [ 0, 1 ]
         env = 1 - env // flip env to start at 0

         // calculate current side length
         const l = this.size * env

         // calculate top-left coordinates
         const x = this.pos.x - (l / 2)
         const y = this.pos.y - (l / 2)

         ctx.fillStyle = `deeppink`
         ctx.fillRect (x, y, l, l)
      }
   }

   const blinkers = []
   const remove = []

   let pointer_is_down = false

   cnv.onpointerdown = e => {
      pointer_is_down = true
   }

   cnv.onpointerup = e => {
      pointer_is_down = false
   }

   cnv.onpointermove = e => {
      if (pointer_is_down) {
         const period = 3
         blinkers.push (new Blinker ({
            x: e.offsetX,
            y: e.offsetY
         }, period, 20))
      }
   }
   const draw_frame = ms => {
      ctx.fillStyle = `turquoise`
      ctx.fillRect (0, 0, cnv.width, cnv.height)

      const t = ms / 1000

      remove.length = 0

      blinkers.forEach ((b, i) => {

         // draw blinker
         b.draw (t)

         // initialise new blinker
         if (!b.init) b.initialise (t)

         // put the index of dead blinkers
         // in the remove list
         if (!b.alive) remove.push (i)
      })

      // use the indexes stored in remove
      // to locate and remove dead blinkers
      remove.forEach (i => blinkers.splice (i, 1))

      requestAnimationFrame (draw_frame)
   }

   requestAnimationFrame (draw_frame)
</script>

<script type="module">
   import codeblockRenderer from "./scripts/codeblock_renderer.js"
   codeblockRenderer (document, `env`, `env_cnv`)
</script>
