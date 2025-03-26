import Prism from "https://esm.sh/prismjs"
import { render } from "https://esm.sh/jsr/@deno/gfm/mod.ts"

export default function codeblockRenderer (document, script_name, el_name) {
   const script = document.getElementById (script_name)
   const el = document.getElementById (el_name)
   const div = document.createElement (`div`)
   div.innerHTML = render ("```js\n" + script.innerText + "\n```")
   el.after (div)
}