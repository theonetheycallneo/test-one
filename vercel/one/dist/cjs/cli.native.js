"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
));
var import_citty = require("citty"), import_picocolors = __toESM(require("picocolors"), 1), import_node_fs = require("node:fs"), import_node_path = __toESM(require("node:path"), 1), import_node_url = require("node:url");
const import_meta = {};
function getPackageVersion() {
  var dirname;
  typeof __dirname < "u" ? dirname = __dirname : dirname = import_node_path.default.dirname((0, import_node_url.fileURLToPath)(import_meta.url));
  var packagePath = import_node_path.default.join(dirname, "..", "..", "package.json"), packageJson = JSON.parse((0, import_node_fs.readFileSync)(packagePath, "utf-8"));
  return packageJson.version;
}
var version = getPackageVersion();
import_node_path.default.sep !== "/" && console.warn(import_picocolors.default.bgYellow("WARNING: UNSUPPORTED OS") + import_picocolors.default.yellow(" - It appears you\u2019re using Windows, which is currently not supported. You may experience unexpected issues."));
var modes = {
  development: "development",
  production: "production"
}, dev = (0, import_citty.defineCommand)({
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
  async run(param) {
    var { args: { clean: clean2, host, https, mode, port } } = param, { run } = await import("./cli/run");
    await run({
      clean: clean2,
      host,
      https,
      mode: modes[mode],
      port
    });
  }
}), buildCommand = (0, import_citty.defineCommand)({
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
  async run(param) {
    var { args } = param, { build } = await import("./vite/build");
    await build(args), process.exit(0);
  }
}), serveCommand = (0, import_citty.defineCommand)({
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
  async run(param) {
    var { args } = param, { serve } = await import("./serve");
    await serve({
      port: args.port ? +args.port : void 0,
      host: args.host,
      cacheHeaders: args.cacheHeaders === !1 ? "off" : void 0,
      compress: args.compress,
      platform: args.platform === "vercel" ? "vercel" : "node"
    });
  }
}), prebuild = (0, import_citty.defineCommand)({
  meta: {
    name: "prebuild",
    version,
    description: "Prebuild native iOS project"
  },
  // TODO: Android
  args: {
    platform: {
      type: "string"
    }
  },
  async run(param) {
    var { args } = param, { run } = await import("./cli/prebuild");
    await run(args);
  }
}), runIos = (0, import_citty.defineCommand)({
  meta: {
    name: "run:ios",
    version
  },
  args: {},
  async run(param) {
    var { args } = param, { run } = await import("./cli/runIos");
    await run(args);
  }
}), runAndroid = (0, import_citty.defineCommand)({
  meta: {
    name: "run:android",
    version
  },
  args: {},
  async run(param) {
    var { args } = param, { run } = await import("./cli/runAndroid");
    await run(args);
  }
}), clean = (0, import_citty.defineCommand)({
  meta: {
    name: "clean",
    version: "0.0.0",
    description: "Clean build folders"
  },
  args: {},
  async run() {
    var { clean: vxrnClean } = await import("vxrn");
    await vxrnClean({
      root: process.cwd()
    });
  }
}), patch = (0, import_citty.defineCommand)({
  meta: {
    name: "patch",
    version: "0.0.0",
    description: "Apply package patches"
  },
  args: {},
  async run(param) {
    var { args } = param, { run } = await import("./cli/patch");
    await run(args);
  }
}), subCommands = {
  dev,
  clean,
  build: buildCommand,
  prebuild,
  "run:ios": runIos,
  "run:android": runAndroid,
  patch,
  serve: serveCommand
}, subMain = (0, import_citty.defineCommand)({
  meta: {
    name: "main",
    version,
    description: "Welcome to One"
  },
  subCommands
}), main = (0, import_citty.defineCommand)({
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
  async run(param) {
    var { args } = param;
    if (subCommands[args.name]) {
      (0, import_citty.runMain)(subMain);
      return;
    }
    var { cliMain } = await import("./cli/main");
    await cliMain(args);
  }
});
(0, import_citty.runMain)(main);
//# sourceMappingURL=cli.js.map
