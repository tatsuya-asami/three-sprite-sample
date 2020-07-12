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

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();

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

camera.position.set(100, 100, 100);
controls.update();

const geometry = new THREE.BoxGeometry(30, 30, 30);
const material = new THREE.MeshLambertMaterial({
  color: 'red',
  transparent: true,
  opacity: 0.8,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// ここからがSprite

// 貼り付けるcanvasを作成。
const canvasForText = document.createElement('canvas');
const ctx = canvasForText.getContext('2d');
ctx.canvas.width = 300;
ctx.canvas.height = 300;
ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
ctx.fillStyle = 'black';
ctx.font = '40px serif';
// ctx.fillText('Hello WorldWorldWorld!', 5, 40);
ctx.fillText('Hello WorldWorldWorld!', 5, 40, ctx.canvas.width);

// canvasをtextureに変換し、materialに載せる。
const canvasTexture = new THREE.CanvasTexture(canvasForText);
const spriteMaterial = new THREE.SpriteMaterial({
  map: canvasTexture,
});

const spriteWithCanvas = new THREE.Sprite(spriteMaterial);
spriteWithCanvas.position.set(50, 50, 20);
spriteWithCanvas.scale.set(40, 40, 40);

scene.add(spriteWithCanvas);
