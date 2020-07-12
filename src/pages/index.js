// import './style.scss';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.clearColor();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color('white'));
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
const lightHelper = new THREE.DirectionalLightHelper(light, 15);
light.position.set(0.7, 0.7, 1);
scene.add(light);
scene.add(lightHelper);

const axexHelper = new THREE.AxesHelper(1000);
scene.add(axexHelper);

const gridHelper = new THREE.GridHelper(1000, 100);
scene.add(gridHelper);

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.5,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.set(100, 100, 100);
controls.update();

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();
