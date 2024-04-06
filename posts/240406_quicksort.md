---
title: Quicksort
published_at: 2024-04-06
snippet: using recursion to sort quickly
disable_html_sanitization: true
---

<canvas id="quicksort_cnv"></canvas>

<script type="module">

   // prepare canvas
   const cnv = document.getElementById(`quicksort_cnv`)
   const ctx = cnv.getContext (`2d`)
   cnv.width = cnv.parentNode.scrollWidth
   cnv.height = cnv.width * 9 / 16

   // create ordered array
   const w2h = (_, i) => i * cnv.height / cnv.width
   let values = Array (cnv.width).fill ().map (w2h)

   // define jumble function
   const rand_el = a => {
      const i = Math.floor (Math.random () * a.length)
      return a.splice (i, 1)[0]
   }

   const jumble = a => {
      const r = []
      while (a.length) r.push (rand_el (a))
      return r
   }

   // define quicksort function
   const quicksort = a => {
      if (a.length <= 1) return a

      let pivot = a[0]
      let left = []
      let right = []

      for (let i = 1; i < a.length; i++) {
         if (a[i] < pivot) left.push (a[i])
         else right.push (a[i])
      }

      return [ ...quicksort (left), pivot, ...quicksort (right) ]
   }

   // define display function
   const display = a => {
      ctx.reset ()
      a.forEach ((v, i) => {
         ctx.beginPath ()
         ctx.moveTo (i, cnv.height)
         ctx.lineTo (i, cnv.height - v)
         ctx.stroke ()
      })
   }

   // define pointer interaction
   cnv.onpointerdown = () => {
      const process = is_jumbled ? quicksort : jumble
      values = process (values)

      display (values)

      is_jumbled = !is_jumbled
   }

   let is_jumbled = false

   display (values)

</script>


```html
<canvas id="quicksort_cnv"></canvas>

<script type="module">

   // get & resize canvas, etc.
   const cnv = document.getElementById(`quicksort_cnv`)
   const ctx = cnv.getContext (`2d`)
   cnv.width = cnv.parentNode.scrollWidth
   cnv.height = cnv.width * 9 / 16

   // create ordered array
   const w2h = (_, i) => i * cnv.height / cnv.width
   let values = Array (cnv.width).fill ().map (w2h)

   // define jumble function
   const rand_el = a => {
      const i = Math.floor (Math.random () * a.length)
      return a.splice (i, 1)[0]
   }

   const jumble = a => {
      const r = []
      while (a.length) r.push (rand_el (a))
      return r
   }

   // define quicksort function
   const quicksort = a => {
      if (a.length <= 1) return a

      let pivot = a[0]
      let left = []
      let right = []

      for (let i = 1; i < a.length; i++) {
         if (a[i] < pivot) left.push (a[i])
         else right.push (a[i])
      }

      return [ ...quicksort (left), pivot, ...quicksort (right) ]
   }

   // define display function
   const display = a => {
      ctx.reset ()
      a.forEach ((v, i) => {
         ctx.beginPath ()
         ctx.moveTo (i, cnv.height)
         ctx.lineTo (i, cnv.height - v)
         ctx.stroke ()
      })
   }

   let is_jumbled = false

   // define pointer interaction
   cnv.onpointerdown = () => {
      const process = is_jumbled ? quicksort : jumble
      values = process (values)
      display (values)
      is_jumbled = !is_jumbled
   }

   display (values)

</script>
```

Note the use of:
- [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) (`[ ...array ]`)
- [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator) (`condition ? if_true : if_false`).

Made with help from [this tutorial](https://www.freecodecamp.org/news/how-to-write-quick-sort-algorithm-with-javascript/) and [this video](https://youtu.be/eqo2LxRADhU).
