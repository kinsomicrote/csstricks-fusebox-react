const { FuseBox, CSSPlugin, SVGPlugin, WebIndexPlugin } = require("fuse-box");
const { src, task, context } = require("fuse-box/sparky");

context({
  setConfig() {
    return FuseBox.init({
      homeDir: "src",
      output: "dist/$name.js",
      useTypescriptCompiler: true,
      plugins: [
        CSSPlugin(),
        SVGPlugin(),
        WebIndexPlugin({
          template: "src/index.html"
        })
      ]
    });
  },
  createBundle(fuse) {
    return fuse
      .bundle("app")
      .instructions(`> index.js`)
      .hmr();
  }
});

task("clean", () => src("dist").clean("dist").exec());
task("default", ["clean"], async (context) => {
  const fuse = context.setConfig();
  fuse.dev();
  context.createBundle(fuse);
  await fuse.run()
});

// fuse.dev();
// fuse
//   .bundle("app")
//   .instructions(`> index.js`)
//   .hmr()
//   .watch()
//
// fuse.run();