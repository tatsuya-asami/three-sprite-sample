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
  color: 'green',
  transparent: true,
  opacity: 0.7,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// ここからがSprite関係

// svgファイルのtextureを作成
const createTexture = (filePath) => {
  return new THREE.TextureLoader().load(filePath);
};
// spriteを作成し、sceneに追加
const createSprite = (texture, scale, position) => {
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(scale.x, scale.y, scale.z);
  sprite.position.set(position.x, position.y, position.z);

  scene.add(sprite);
};

const wideImageTexture = createTexture(
  'https://dummyimage.com/200x100/4a9e62/fff.png'
);
createSprite(
  wideImageTexture,
  { x: 30, y: 30, z: 30 },
  { x: 20, y: 20, z: 20 }
);
createSprite(wideImageTexture, { x: 60, y: 30, z: 3 }, { x: 70, y: 20, z: 20 });

const createCanvasForTexture = (canvasWidth, canvasHeight, text, fontSize) => {
  // 貼り付けるcanvasを作成。
  const canvasForText = document.createElement('canvas');
  const ctx = canvasForText.getContext('2d');
  ctx.canvas.width = canvasWidth;
  ctx.canvas.height = canvasHeight;
  // 透過率50%の青背景を描く
  ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //
  ctx.fillStyle = 'black';
  ctx.font = `${fontSize}px serif`;
  ctx.fillText(
    text,
    // x方向の余白/2をx方向開始時の始点とすることで、横方向の中央揃えをしている。
    (canvasWidth - ctx.measureText(text).width) / 2,
    // y方向のcanvasの中央に文字の高さの半分を加えることで、縦方向の中央揃えをしている。
    canvasHeight / 2 + ctx.measureText(text).actualBoundingBoxAscent / 2
  );
  return canvasForText;
};

// canvasをtextureに載せ、さらにmaterialに載せる。
const canvasTexture = new THREE.CanvasTexture(
  createCanvasForTexture(500, 500, 'Hello World!', 40)
);
const scaleMaster = 70;

createSprite(
  canvasTexture,
  {
    x: scaleMaster,
    y: scaleMaster,
    z: scaleMaster,
  },
  { x: -70, y: 70, z: -70 }
);

const canvasWidth = 500;
const canvasHeight = 140;
const canvasRectTexture = new THREE.CanvasTexture(
  createCanvasForTexture(canvasWidth, canvasHeight, '寿司鯖あ、。カナｶﾅ', 50)
);
createSprite(
  canvasRectTexture,
  {
    x: scaleMaster,
    // 縦方向の縮尺を調整
    y: scaleMaster * (canvasHeight / canvasWidth),
    z: scaleMaster,
  },
  { x: 50, y: 50, z: 50 }
);
