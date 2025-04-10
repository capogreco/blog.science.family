import Prism from "https://esm.sh/prismjs"
import { render } from "https://esm.sh/jsr/@deno/gfm/mod.ts"

export default function codeblockRenderer (document, script_id, el_id) {
   const script = document.getElementById (script_id)
   const el = document.getElementById (el_id)
   const div = document.createElement (`div`)
   div.innerHTML = render ("```js\n" + script.innerText + "\n```")
   el.after (div)
}