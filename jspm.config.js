SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "github:": "jspm_packages/github/",
    "threejs-export-stl/": "src/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.17",
      "file-saver": "npm:file-saver@1.3.3",
      "mrdoob/three.js": "github:mrdoob/three.js@master"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "threejs-export-stl": {
      "main": "threejs-export-stl.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {},
  packages: {}
});
