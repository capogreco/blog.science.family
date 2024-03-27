---
title: Canvas Example
published_at: 2024-03-21
snippet: an example using the canvas element
disable_html_sanitization: true
---

`ctrl` + `~` -> opens the terminal *inside* VS Code!

<canvas id="example_canvas"></canvas>

<script type="module">
    const cnv = document.getElementById (`example_canvas`)
    cnv.width = cnv.parentNode.scrollWidth
    cnv.height = cnv.width * 9 / 16

    const ctx = cnv.getContext (`2d`)

    let x_pos = -100

    const draw_frame = () => {

        ctx.fillStyle = `turquoise`
        ctx.fillRect (0, 0, cnv.width, cnv.height)
        
        ctx.fillStyle = `hotpink`
        ctx.fillRect (x_pos, cnv.height / 2 - 50, 100, 100)

        x_pos += 1

        if (x_pos > cnv.width) x_pos = -100

        requestAnimationFrame (draw_frame)
    }

    draw_frame ()
</script>

```html
<canvas id="example_canvas"></canvas>

<script type="module">
    const cnv = document.getElementById (`example_canvas`)
    cnv.width = cnv.parentNode.scrollWidth
    cnv.height = cnv.width * 9 / 16

    const ctx = cnv.getContext (`2d`)

    let x_pos = -100

    const draw_frame = () => {

        ctx.fillStyle = `turquoise`
        ctx.fillRect (0, 0, cnv.width, cnv.height)
        
        ctx.fillStyle = `hotpink`
        ctx.fillRect (x_pos, cnv.height / 2 - 50, 100, 100)

        x_pos += 1

        if (x_pos > cnv.width) x_pos = -100

        requestAnimationFrame (draw_frame)
    }

    draw_frame ()
</script>
```

<canvas id="recursive_squares"></canvas>

<script type="module">
    const cnv = document.getElementById (`recursive_squares`)
    cnv.width = cnv.parentNode.scrollWidth
    cnv.height = cnv.width
    
    const ctx = cnv.getContext (`2d`)

    function draw_square (size) {
        const x = (cnv.width - size) / 2
        const y = (cnv.height - size) / 2

        ctx.fillStyle = rand_col ()
        ctx.fillRect (x, y, size, size)
    }

    function draw_squares (start_size) {
        draw_square (start_size)

        if (start_size > 0) {
            draw_squares (start_size - 20)
        }
    }

    function rand_col () {
        return `hsl(${ Math.random () * 360 }, 80%, 66%)`
    }

    draw_squares (cnv.height)

</script>

```html
<canvas id="recursive_squares"></canvas>

<script type="module">
    const cnv = document.getElementById (`recursive_squares`)
    cnv.width = cnv.parentNode.scrollWidth
    cnv.height = cnv.width
    
    const ctx = cnv.getContext (`2d`)

    function rand_col () {
        return `hsl(${ Math.random () * 360 }, 100%, 66%)`
    }

    function draw_square (size) {
        const x = (cnv.width - size) / 2
        const y = (cnv.height - size) / 2

        ctx.fillStyle = rand_col ()
        ctx.fillRect (x, y, size, size)
    }

    function draw_squares (start_size) {
        draw_square (start_size)

        if (start_size > 0) {
            draw_squares (start_size - 20)
        }
    }

    draw_squares (cnv.height)

</script>
```