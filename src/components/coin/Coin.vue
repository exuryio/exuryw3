<template>
  <div ref="container" class="three-container"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Mesh } from "three";

const props = defineProps<{
  models?: { initialRotationX: number; initialRotationY: number }[];
}>();

const container = ref<HTMLDivElement | null>(null);
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let models: { object: THREE.Object3D; animation: () => void }[] = [];
const minHeightOffset = -0.3;
const maxHeightOffset = 0.3;
const minRotationSpeed = 0.1;
const maxRotationSpeed = 1;
onMounted(() => {
  if (!container.value) return;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 1.5;
  camera.position.y = 0;
  camera.position.x = 0;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  if (container.value) {
    container.value.appendChild(renderer.domElement);
  }

  const ambientLight = new THREE.AmbientLight(0x00ff95, 1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 10, 7.5);
  scene.add(directionalLight);

  const pointLightLeft = new THREE.PointLight(0x44ff88, 1);
  pointLightLeft.position.set(-1, -1, 3);
  scene.add(pointLightLeft);

  const pointLightRight = new THREE.PointLight(0x44ff88, 1);
  pointLightRight.position.set(1, 2, 3);
  scene.add(pointLightRight);

  const pointLightTop = new THREE.PointLight(0x44ff88, 1);
  pointLightTop.position.set(0, 3, 2);
  scene.add(pointLightTop);

  const textureLoader = new THREE.TextureLoader();

  const normalTexture = textureLoader.load(
    "/assets/Textures/DefaultMaterial_Normal_OpenGL.png",
  );
  const objLoader = new OBJLoader();
  const modelsToLoad =
    props.models && props.models.length > 0 ? props.models : [{}];

  modelsToLoad.forEach((modelProps: any, index) => {
    const baseColorTexture = textureLoader.load(
      index % 2 === 0
        ? "/assets/Textures/DefaultMaterial_Base_Color.png"
        : "/assets/Textures/DefaultMaterial_Base_Color2.png",
    );
    objLoader.load("/assets/OBJ/SimpleGoldCoin.obj", (object) => {
      const model = object;

      model.traverse((child: Mesh) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = new THREE.MeshStandardMaterial({
            map: baseColorTexture,
            normalMap: normalTexture,
            metalness: 0.9,
            roughness: 0.4,
          });
        }
      });

      model.scale.set(5, 5, 5);
      model.rotation.x = modelProps.initialRotationX ?? 0;
      model.rotation.y = modelProps.initialRotationY ?? 0;

      const angle = (index / modelsToLoad.length) * Math.PI * 2;
      const radius = 0.05 * modelsToLoad.length;
      const heightOffset =
        minHeightOffset + (maxHeightOffset - minHeightOffset) * Math.random();
      model.position.set(
        radius * Math.cos(angle),
        heightOffset,
        radius * Math.sin(angle),
      );

      const animateModel = () => {
        const randomSpeed =
          minRotationSpeed +
          (maxRotationSpeed - minRotationSpeed) * Math.random();
        model.rotation.z += 0.01 * (index + 1) * randomSpeed;
      };

      models.push({ object: model, animation: animateModel });
      scene.add(model);

      if (index === modelsToLoad.length - 1) {
        animate();
      }
    });
  });

  const onWindowResize = () => {
    if (container.value) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  };

  window.addEventListener("resize", onWindowResize);

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onWindowResize);
    if (container.value && renderer) {
      container.value.removeChild(renderer.domElement);
    }
  });

  const animate = () => {
    requestAnimationFrame(animate);
    models.forEach((modelData) => {
      modelData.animation();
    });
    renderer.render(scene, camera);
  };
});
</script>

<style lang="scss" scoped>
@import "./coin.scss";
@import "@/styles/variables.scss";
.three-container {
  width: $coin-scene-width;
  height: $coin-scene-height;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
