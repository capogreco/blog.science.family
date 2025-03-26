#!/usr/bin/env -S deno run -A --watch=static/,routes/ --import-map=import_map.json

import dev from "$fresh/dev.ts";

await dev(import.meta.url, "./main.ts");
