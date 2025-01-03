import { defineCommand, runMain } from "citty";
import colors from "picocolors";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
function getPackageVersion() {
  let dirname;
  typeof __dirname < "u" ? dirname = __dirname : dirname = path.dirname(fileURLToPath(import.meta.url));
  const packagePath = path.join(dirname, "..", "..", "package.json");
  return JSON.parse(readFileSync(packagePath, "utf-8")).version;
}
const version = getPackageVersion();
path.sep !== "/" && console.warn(colors.bgYellow("WARNING: UNSUPPORTED OS") + colors.yellow(" - It appears you\u2019re using Windows, which is currently not supported. You may experience unexpected issues."));
const modes = {
    development: "development",
    production: "production"
  },
  dev = defineCommand({
    meta: {
      name: "dev",
      version,
      description: "Start the dev server"
    },
    args: {
      clean: {
        type: "boolean"
      },
      host: {
        type: "string"
      },
      port: {
        type: "string"
      },
      https: {
        type: "boolean"
      },
      mode: {
        type: "string",
        description: 'If set to "production" you can run the development server but serve the production bundle'
      }
    },
    async run({
      args: {
        clean: clean2,
        host,
        https,
        mode,
        port
      }
    }) {
      const {
        run
      } = await import("./cli/run.mjs");
      await run({
        clean: clean2,
        host,
        https,
        mode: modes[mode],
        port
      });
    }
  }),
  buildCommand = defineCommand({
    meta: {
      name: "build",
      version,
      description: "Build your app"
    },
    args: {
      step: {
        type: "string",
        required: !1
      },
      // limit the pages built
      only: {
        type: "string",
        required: !1
      }
    },
    async run({
      args
    }) {
      const {
        build
      } = await import("./vite/build.mjs");
      await build(args), process.exit(0);
    }
  }),
  serveCommand = defineCommand({
    meta: {
      name: "serve",
      version,
      description: "Serve a built app for production"
    },
    args: {
      host: {
        type: "string"
      },
      port: {
        type: "string"
      },
      platform: {
        type: "string"
      },
      compress: {
        type: "boolean"
      },
      cacheHeaders: {
        type: "boolean"
      }
    },
    async run({
      args
    }) {
      const {
        serve
      } = await import("./serve.mjs");
      await serve({
        port: args.port ? +args.port : void 0,
        host: args.host,
        cacheHeaders: args.cacheHeaders === !1 ? "off" : void 0,
        compress: args.compress,
        platform: args.platform === "vercel" ? "vercel" : "node"
      });
    }
  }),
  prebuild = defineCommand({
    meta: {
      name: "prebuild",
      version,
      description: "Prebuild native iOS project"
      // TODO: Android
    },
    args: {
      platform: {
        type: "string"
      }
    },
    async run({
      args
    }) {
      const {
        run
      } = await import("./cli/prebuild.mjs");
      await run(args);
    }
  }),
  runIos = defineCommand({
    meta: {
      name: "run:ios",
      version
    },
    args: {},
    async run({
      args
    }) {
      const {
        run
      } = await import("./cli/runIos.mjs");
      await run(args);
    }
  }),
  runAndroid = defineCommand({
    meta: {
      name: "run:android",
      version
    },
    args: {},
    async run({
      args
    }) {
      const {
        run
      } = await import("./cli/runAndroid.mjs");
      await run(args);
    }
  }),
  clean = defineCommand({
    meta: {
      name: "clean",
      version: "0.0.0",
      description: "Clean build folders"
    },
    args: {},
    async run() {
      const {
        clean: vxrnClean
      } = await import("vxrn");
      await vxrnClean({
        root: process.cwd()
      });
    }
  }),
  patch = defineCommand({
    meta: {
      name: "patch",
      version: "0.0.0",
      description: "Apply package patches"
    },
    args: {},
    async run({
      args
    }) {
      const {
        run
      } = await import("./cli/patch.mjs");
      await run(args);
    }
  }),
  subCommands = {
    dev,
    clean,
    build: buildCommand,
    prebuild,
    "run:ios": runIos,
    "run:android": runAndroid,
    patch,
    serve: serveCommand
  },
  subMain = defineCommand({
    meta: {
      name: "main",
      version,
      description: "Welcome to One"
    },
    subCommands
  }),
  main = defineCommand({
    meta: {
      name: "main",
      version,
      description: "Welcome to One"
    },
    args: {
      name: {
        type: "positional",
        description: "Folder name to place the app into",
        required: !1
      }
    },
    async run({
      args
    }) {
      if (subCommands[args.name]) {
        runMain(subMain);
        return;
      }
      const {
        cliMain
      } = await import("./cli/main.mjs");
      await cliMain(args);
    }
  });
runMain(main);
//# sourceMappingURL=cli.mjs.map
