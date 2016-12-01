# ThreeJS-export-STL
STL exporter for [three.js](https://github.com/mrdoob/three.js)

Can create both `binary` and `ascii` STL's.

# Example

```javascript
import 'mrdoob/three.js/three.js';
import { saveAs } from 'file-saver';
import * as exportSTL from 'Doodle3D/ThreeJS-export-STL';

const geometry = new THREE.BoxGeometry(1, 1, 1).clone();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);

mesh.position.y = 0.5;

const buffer = exportSTL.fromMesh(mesh);
const blob = new Blob([buffer], { type: exportSTL.mimeType });

saveAs(blob, 'cube.stl');
```

# Installation

### Using JSPM (ECMAScript / ES6 Module)

Install the library.

```
jspm install github:Doodle3D/ThreeJS-export-STL
```

Include the library.

```javascript
import * as exportSTL from 'Doodle3D/ThreeJS-export-STL';
```

### Using NPM (CommonJS module)

Install the library.

```
npm install threejs-export-stl --save
```

Include the library.

```javascript
const exportSTL = require('threejs-export-stl');
```

# API

**exportSTL.fromMesh**

```javascript
data: String || Buffer = exportSTL.fromMesh( mesh: THREE.Mesh, [ binary: Boolean = true ] )
```

Creates a .STL from `THREE.Mesh`. When binary is set to `true` result will be a `Buffer` Object, when set to false result will be an ASCII string. The transformation on the `THREE.Mesh` will be applied to the STL geometry.

**exportSTL.fromGeometry**

```javascript
data: String || Buffer = exportSTL.fromGeometry( geometry: THREE.Geometry || THREE.BufferGeometry, [ matrix: THREE.Matrix4, binary: Boolean = true ] )
```

Creates a .STL from `THREE.Geometry`. When binary is set to `true` result will be a `Buffer` Object, when set to false result will be an ASCII string. The transformation from the optional `matrix` argument will be applied to the STL geometry.

**exportSTL.mimeType**

```javascript
mimeType: String = exportSTL.mimeType
```

A constant with the mime type of STL (`application/vnd.ms-pki.stl`).
