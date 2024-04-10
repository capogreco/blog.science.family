---
title: Group Tasks
published_at: 2024-04-08
snippet: explain these code blocks
disable_html_sanitization: true
---

```js
const w2h = (_, i) => i * cnv.height / cnv.width
let values = Array (cnv.width).fill ().map (w2h)
```

```js
const rand_el = a => {
   const i = Math.floor (Math.random () * a.length)
   return a.splice (i, 1)[0]
}
```

```js
const jumble = a => {
   const r = []
   while (a.length) r.push (rand_el (a))
   return r
}
```

```js
const rectify = (s, w, c) => {
   if (s.length >= w) return s
   else return (Array (w).join (c) + s).slice (-w)
}
```


You may want to draw on the following resources:
- [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Array: .splice ()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

- [String: slice ()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)