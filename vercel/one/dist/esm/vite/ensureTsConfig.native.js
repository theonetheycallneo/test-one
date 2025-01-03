import { writeFile } from "node:fs/promises";
import "../polyfills-server";
import { existsAsync } from "../utils/existsAsync";
function ensureTSConfig() {
  existsAsync("tsconfig.json").then(function(hasTsConfig) {
    hasTsConfig || (console.info("[one] adding default tsconfig.json. to disable set one/vite { config: { tsConfigPaths: false } }"), writeFile("tsconfig.json", `{
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "~/*": ["./*"]
  },
  "strict": true,
  "rootDir": ".",
  "noEmit": true,
  "module": "Preserve",
  // allows react-native style imports without path extensions, for compat with platform-specific files
  "moduleResolution": "Bundler",
  "preserveSymlinks": true,
  "skipLibCheck": true,
  "jsx": "react-jsx",
  "noImplicitAny": false,
  "types": [
    "node",
    "react",
    "vite/client"
  ],
  "lib": [
    "dom",
    "esnext"
  ]
},
"exclude": [
  "node_modules",
  ".expo",
  "**/test",
  "**/dist",
  "**/types",
  "**/__tests__"
],
}
`));
  });
}
export {
  ensureTSConfig
};
//# sourceMappingURL=ensureTsConfig.js.map
