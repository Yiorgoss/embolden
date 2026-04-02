#!/bin/bash
wasm-pack build converter --target=web --out-dir ../src/lib/assets/wasm/embolden && rm src/lib/wasm/.gitignore
# never tested, but it worked with the old embolden

