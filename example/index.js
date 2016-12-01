import 'mrdoob/three.js';
import { saveAs } from 'file-saver';
import { fromMesh, mimeType } from 'src/index.js';

const canvas = document.getElementById('canvas');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas });

const geometry = new THREE.BoxGeometry(1, 1, 1).clone();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

mesh.position.y = 0.5;

(function render() {
  requestAnimationFrame(render);

  const t = Date.now() * 0.001;
  const x = Math.sin(t) * 3;
  const y = 3;
  const z = Math.cos(t) * 3;

  camera.position.set(x, y, z);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  renderer.render(scene, camera);
})();

const download = document.getElementById('download');
download.addEventListener('click', () => {
  const buffer = fromMesh(mesh);
  const blob = new Blob([buffer], { type: mimeType });

  saveAs(blob, 'cube.stl');
});
