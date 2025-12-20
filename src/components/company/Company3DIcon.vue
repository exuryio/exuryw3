<template>
  <div ref="container" class="company-3d-icon"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";

const props = defineProps<{
  type: "shield" | "eye" | "key" | "trophy" | "lock" | "star" | "lightbulb" | "lightning" | "gear" | "globe" | "building" | "book" | "vision";
  size?: number;
}>();

const container = ref<HTMLDivElement | null>(null);
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let mesh: THREE.Object3D | null = null;
let animationId: number | null = null;

const size = props.size || 96;

onMounted(() => {
  if (!container.value) return;

  // Scene setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
  camera.position.z = 3;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(size, size);
  renderer.setClearColor(0x000000, 0);
  container.value.appendChild(renderer.domElement);

  // Lights - Enhanced for better visibility
  const ambientLight = new THREE.AmbientLight(0x00bb72, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0x00bb72, 1.2);
  directionalLight.position.set(2, 2, 2);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0x00bb72, 0.8);
  pointLight.position.set(-2, -2, 2);
  scene.add(pointLight);
  
  const pointLight2 = new THREE.PointLight(0x00bb72, 0.6);
  pointLight2.position.set(0, 3, 2);
  scene.add(pointLight2);

  // Material - Enhanced for better visibility
  const material = new THREE.MeshStandardMaterial({
    color: 0x00bb72,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0x00bb72,
    emissiveIntensity: 0.4,
  });

  // Create geometry based on type
  switch (props.type) {
    case "shield":
      mesh = createShield(material);
      break;
    case "eye":
      mesh = createEye(material);
      break;
    case "key":
      mesh = createKey(material);
      break;
    case "trophy":
      mesh = createTrophy(material);
      break;
    case "lock":
      mesh = createLock(material);
      break;
    case "star":
      mesh = createStar(material);
      break;
    case "lightbulb":
      mesh = createLightbulb(material);
      break;
    case "lightning":
      mesh = createLightning(material);
      break;
    case "gear":
      mesh = createGear(material);
      break;
    case "globe":
      mesh = createGlobe(material);
      break;
    case "building":
      mesh = createBuilding(material);
      break;
    case "book":
      mesh = createBook(material);
      break;
    case "vision":
      mesh = createVision(material);
      break;
  }

  if (mesh) {
    scene.add(mesh);
    animate();
  }
});

function createShield(material: THREE.MeshStandardMaterial): THREE.Group {
  const group = new THREE.Group();
  const shape = new THREE.Shape();
  shape.moveTo(0, -1);
  shape.lineTo(0.8, -0.5);
  shape.lineTo(0.8, 0.5);
  shape.quadraticCurveTo(0, 1, -0.8, 0.5);
  shape.quadraticCurveTo(-0.8, -0.5, 0, -1);
  
  const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelSegments: 2, bevelThickness: 0.1 };
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);
  return group;
}

function createEye(material: THREE.MeshStandardMaterial): THREE.Group {
  const group = new THREE.Group();
  const eyeGeometry = new THREE.SphereGeometry(0.8, 32, 32);
  const eyeMesh = new THREE.Mesh(eyeGeometry, material);
  eyeMesh.scale.set(1, 0.6, 1);
  group.add(eyeMesh);
  
  const pupilGeometry = new THREE.SphereGeometry(0.3, 16, 16);
  const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x004645, emissive: 0x00bb72, emissiveIntensity: 0.3 });
  const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  pupil.position.z = 0.85;
  group.add(pupil);
  return group;
}

function createKey(material: THREE.MeshStandardMaterial): THREE.Group {
  const group = new THREE.Group();
  const headGeometry = new THREE.TorusGeometry(0.3, 0.1, 16, 32);
  const head = new THREE.Mesh(headGeometry, material);
  group.add(head);
  
  const shaftGeometry = new THREE.BoxGeometry(0.15, 0.8, 0.15);
  const shaft = new THREE.Mesh(shaftGeometry, material);
  shaft.position.y = -0.4;
  group.add(shaft);
  
  const teethGeometry = new THREE.BoxGeometry(0.1, 0.2, 0.1);
  const teeth = new THREE.Mesh(teethGeometry, material);
  teeth.position.set(0.15, -0.7, 0);
  group.add(teeth);
  return group;
}

function createTrophy(material: THREE.MeshStandardMaterial): THREE.Group {
  const group = new THREE.Group();
  const cupGeometry = new THREE.ConeGeometry(0.6, 1, 8);
  const cup = new THREE.Mesh(cupGeometry, material);
  cup.position.y = 0.2;
  group.add(cup);
  
  const baseGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 8);
  const base = new THREE.Mesh(baseGeometry, material);
  base.position.y = -0.5;
  group.add(base);
  
  const handleGeometry = new THREE.TorusGeometry(0.3, 0.05, 8, 16);
  const handle1 = new THREE.Mesh(handleGeometry, material);
  handle1.position.set(-0.5, 0.3, 0);
  handle1.rotation.z = Math.PI / 2;
  group.add(handle1);
  
  const handle2 = new THREE.Mesh(handleGeometry, material);
  handle2.position.set(0.5, 0.3, 0);
  handle2.rotation.z = Math.PI / 2;
  group.add(handle2);
  return group;
}

function createLock(material: THREE.MeshStandardMaterial): THREE.Group {
  const group = new THREE.Group();
  const bodyGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.3);
  const body = new THREE.Mesh(bodyGeometry, material);
  group.add(body);
  
  const shackleGeometry = new THREE.TorusGeometry(0.25, 0.05, 8, 16);
  const shackle = new THREE.Mesh(shackleGeometry, material);
  shackle.position.y = 0.3;
  shackle.rotation.z = Math.PI / 2;
  group.add(shackle);
  
  const keyholeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.1, 8);
  const keyhole = new THREE.Mesh(keyholeGeometry, new THREE.MeshStandardMaterial({ color: 0x000000 }));
  keyhole.position.z = 0.16;
  group.add(keyhole);
  return group;
}

function createStar(material: THREE.MeshStandardMaterial): THREE.Group {
  const group = new THREE.Group();
  const starShape = new THREE.Shape();
  const spikes = 5;
  const outerRadius = 0.8;
  const innerRadius = 0.4;
  
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * Math.PI) / spikes;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) starShape.moveTo(x, y);
    else starShape.lineTo(x, y);
  }
  starShape.closePath();
  
  const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelSegments: 2, bevelThickness: 0.1 };
  const geometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);
  return group;
}

function createLightbulb(material: THREE.MeshStandardMaterial): THREE.Group {
  const group = new THREE.Group();
  const bulbGeometry = new THREE.SphereGeometry(0.5, 16, 16);
  const bulb = new THREE.Mesh(bulbGeometry, material);
  bulb.position.y = 0.2;
  group.add(bulb);
  
  const baseGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.3, 8);
  const base = new THREE.Mesh(baseGeometry, material);
  base.position.y = -0.35;
  group.add(base);
  
  const filamentGeometry = new THREE.TorusGeometry(0.2, 0.02, 8, 16);
  const filament = new THREE.Mesh(filamentGeometry, new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xffff00, emissiveIntensity: 0.5 }));
  filament.position.y = 0.2;
  group.add(filament);
  return group;
}

function createLightning(material: THREE.MeshStandardMaterial): THREE.Group {
  const group = new THREE.Group();
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.8);
  shape.lineTo(0.3, 0.4);
  shape.lineTo(0, 0.2);
  shape.lineTo(0.2, -0.2);
  shape.lineTo(-0.2, -0.6);
  shape.lineTo(0, -0.8);
  shape.lineTo(-0.3, -0.4);
  shape.lineTo(0, -0.2);
  shape.lineTo(-0.2, 0.2);
  shape.lineTo(0.2, 0.6);
  shape.closePath();
  
  const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelSegments: 2, bevelThickness: 0.05 };
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);
  return group;
}

function createGear(material: THREE.MeshStandardMaterial): THREE.Group {
  const group = new THREE.Group();
  const gearShape = new THREE.Shape();
  const teeth = 12;
  const outerRadius = 0.7;
  const innerRadius = 0.5;
  
  for (let i = 0; i < teeth * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * Math.PI) / teeth;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) gearShape.moveTo(x, y);
    else gearShape.lineTo(x, y);
  }
  gearShape.closePath();
  
  const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelSegments: 2, bevelThickness: 0.1 };
  const geometry = new THREE.ExtrudeGeometry(gearShape, extrudeSettings);
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);
  
  const centerGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.25, 16);
  const center = new THREE.Mesh(centerGeometry, new THREE.MeshStandardMaterial({ color: 0x004645 }));
  group.add(center);
  return group;
}

function createGlobe(material: THREE.MeshStandardMaterial): THREE.Group {
  const group = new THREE.Group();
  const globeGeometry = new THREE.SphereGeometry(0.7, 32, 32);
  const globe = new THREE.Mesh(globeGeometry, material);
  group.add(globe);
  
  // Latitude lines
  for (let i = -2; i <= 2; i++) {
    const latGeometry = new THREE.RingGeometry(0.7, 0.7, 32);
    const latMaterial = new THREE.MeshBasicMaterial({ color: 0x00bb72, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
    const lat = new THREE.Mesh(latGeometry, latMaterial);
    lat.rotation.x = (i * Math.PI) / 6;
    group.add(lat);
  }
  
  // Longitude line
  const longGeometry = new THREE.TorusGeometry(0.7, 0.02, 8, 32);
  const longMaterial = new THREE.MeshBasicMaterial({ color: 0x00bb72, transparent: true, opacity: 0.3 });
  const longitude = new THREE.Mesh(longGeometry, longMaterial);
  longitude.rotation.y = Math.PI / 2;
  group.add(longitude);
  return group;
}

function createBuilding(material: THREE.MeshStandardMaterial): THREE.Group {
  const group = new THREE.Group();
  const baseGeometry = new THREE.BoxGeometry(0.8, 1, 0.6);
  const base = new THREE.Mesh(baseGeometry, material);
  group.add(base);
  
  // Roof
  const roofGeometry = new THREE.ConeGeometry(0.6, 0.3, 4);
  const roof = new THREE.Mesh(roofGeometry, material);
  roof.position.y = 0.65;
  roof.rotation.y = Math.PI / 4;
  group.add(roof);
  
  // Windows
  const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x00bb72, emissive: 0x00bb72, emissiveIntensity: 0.3 });
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      const windowGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.05);
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      window.position.set(-0.25 + i * 0.5, -0.2 + j * 0.4, 0.31);
      group.add(window);
    }
  }
  return group;
}

function createBook(material: THREE.MeshStandardMaterial): THREE.Group {
  const group = new THREE.Group();
  const coverGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.15);
  const cover = new THREE.Mesh(coverGeometry, material);
  cover.rotation.z = -0.1;
  group.add(cover);
  
  const pagesGeometry = new THREE.BoxGeometry(0.75, 0.55, 0.1);
  const pagesMaterial = new THREE.MeshStandardMaterial({ color: 0xe5e5e5 });
  const pages = new THREE.Mesh(pagesGeometry, pagesMaterial);
  pages.rotation.z = -0.1;
  pages.position.z = 0.02;
  group.add(pages);
  return group;
}

function createVision(material: THREE.MeshStandardMaterial): THREE.Group {
  const group = new THREE.Group();
  const eyeGeometry = new THREE.SphereGeometry(0.6, 32, 32);
  const eye = new THREE.Mesh(eyeGeometry, material);
  eye.scale.set(1, 0.5, 1);
  group.add(eye);
  
  const irisGeometry = new THREE.SphereGeometry(0.3, 16, 16);
  const irisMaterial = new THREE.MeshStandardMaterial({ color: 0x00bb72, emissive: 0x00bb72, emissiveIntensity: 0.4 });
  const iris = new THREE.Mesh(irisGeometry, irisMaterial);
  iris.position.z = 0.65;
  group.add(iris);
  
  const pupilGeometry = new THREE.SphereGeometry(0.15, 16, 16);
  const pupil = new THREE.Mesh(pupilGeometry, new THREE.MeshStandardMaterial({ color: 0x000000 }));
  pupil.position.z = 0.8;
  group.add(pupil);
  
  // Light rays
  for (let i = 0; i < 3; i++) {
    const rayGeometry = new THREE.ConeGeometry(0.05, 0.4, 4);
    const rayMaterial = new THREE.MeshBasicMaterial({ color: 0x00bb72, transparent: true, opacity: 0.3 });
    const ray = new THREE.Mesh(rayGeometry, rayMaterial);
    const angle = (i - 1) * Math.PI / 6;
    ray.rotation.z = angle;
    ray.position.set(Math.cos(angle) * 0.5, Math.sin(angle) * 0.5, 0);
    group.add(ray);
  }
  return group;
}

function animate() {
  animationId = requestAnimationFrame(animate);
  
  if (mesh) {
    // Animación sutil: solo rotación en Y, más lenta
    mesh.rotation.y += 0.003;
  }
  
  renderer.render(scene, camera);
}

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (container.value && renderer) {
    container.value.removeChild(renderer.domElement);
  }
});
</script>

<style scoped>
.company-3d-icon {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

