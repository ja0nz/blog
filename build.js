const esbuild = require("esbuild");

const args = process.argv.slice(2);

esbuild
  .build({
    entryPoints: ["src/main.js"],
    outfile: "js/min.js",
    bundle: true,
    sourcemap: true,
    minify: true,
    format: "iife",
    watch: args.includes("--watch"),
  })
  .catch((e) => console.error(e.message));
