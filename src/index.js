export const mimeType = 'application/vnd.ms-pki.stl';

const LITTLE_ENDIAN = true;

function writeVectorAscii(dataView, { x, y, z }, isNormal) {
  dataView.data += `${isNormal ? 'facet normal' : 'vertex'} ${x} ${y} ${z}\n`;
}

function writeVectorBinary(dataView, { x, y, z }) {
  writeFloat(dataView, x);
  writeFloat(dataView, y);
  writeFloat(dataView, z);
}

function writeFloat(dataView, float) {
  dataView.data.setFloat32(dataView.offset, float, LITTLE_ENDIAN);
  dataView.offset += 4;
}

function geometryToData(geometry, binary) {
  const faces = geometry.faces;
  const vertices = geometry.vertices;

  let dataView;
  if (binary) {
    const bufferSize = 84 + (50 * faces.length);
    const buffer = new ArrayBuffer(bufferSize);
    dataView = {
      data: new DataView(buffer),
      offset: 84
    };

    dataView.data.setUint32(80, faces.length, LITTLE_ENDIAN);
  } else {
    dataView = { data: 'solid\n' };
  }

  const writeVector = binary ? writeVectorBinary : writeVectorAscii;

  for (let i = 0; i < faces.length; i ++) {
    writeVector(dataView, faces[i].normal, true);

    if (!binary) {
      dataView.data += 'outer loop\n';
    }

    writeVector(dataView, vertices[faces[i].a], false);
    writeVector(dataView, vertices[faces[i].b], false);
    writeVector(dataView, vertices[faces[i].c], false);

    if (binary) {
      dataView.offset += 2;
    } else {
      dataView.data += 'endloop\nendfacet\n';
    }
  }

  if (!binary) {
    dataView.data += 'endsolid';
  }

  return binary ? dataView.data.buffer : dataView.data;
}

export function fromGeometry(geometry, matrix, binary = true) {
  if (geometry.type === 'BufferGeometry') {
    geometry = new THREE.Geometry().fromBufferGeometry(geometry);
  } else if (geometry.type === 'Geometry') {
    geometry = geometry.clone();
  } else {
    throw new Error('Geometry is not an instance of BufferGeometry or Geometry');
  }

  if (matrix) {
    geometry.applyMatrix(matrix);
  }

  geometry.computeFaceNormals();

  return geometryToData(geometry, binary);
}

export function fromMesh(mesh, binary) {
  mesh.updateMatrix();

  return fromGeometry(mesh.geometry, mesh.matrix, binary);
}
