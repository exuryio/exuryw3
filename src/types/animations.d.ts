declare module "three/examples/jsm/loaders/OBJLoader" {
  export class OBJLoader extends THREE.Loader {
    load(
      url: string,
      onLoad: (object: THREE.Group) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void,
    ): void;
  }
}
declare module "three/examples/jsm/controls/OrbitControls" {
  import * as THREE from "three";
  export class OrbitControls extends THREE.EventDispatcher {
    constructor(object: THREE.Camera, domElement?: HTMLElement);
    update(): void;
  }
}
