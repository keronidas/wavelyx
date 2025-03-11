import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-mobile-home',
  templateUrl: './mobile-home.component.html',
  styleUrls: ['./mobile-home.component.css'],
})
export class MobileHomeComponent implements AfterViewInit {
  @ViewChild('movil', { static: true }) canvasContainer!: ElementRef;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  plane: THREE.Mesh | undefined;
  private model!: THREE.Object3D;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.scene = new THREE.Scene();
  }

  ngAfterViewInit(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true; // Habilitar sombras
    this.renderer.setClearColor(0x000000, 0); // Set clear color to transparent
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    // Cámara
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 0);
    this.scene.add(camera);

    // Controles orbitales
    const controls = new OrbitControls(camera, this.renderer.domElement);
    controls.enabled=false
    controls.minPolarAngle = Math.PI / 2.15; // Limita la rotación hacia arriba
    controls.maxPolarAngle = Math.PI / 2.15; // Limita la rotación hacia abajo


    /**
     * Lights
     */
    const ambientLight = new THREE.AmbientLight(0x404040, 3);
    this.scene.add(ambientLight);

    // Luz direccional (cuatro fuentes de luz)
    const directionalLights = [];
    for (let i = 0; i < 8; i++) {
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(
        i % 2 === 0 ? 5 : -5,
        i < 4 ? 5 : -5,
        i % 2 === 0 ? 5 : -5
      );
      directionalLights.push(light);
      this.scene.add(light);
    }

    // Cargar el modelo 3D
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/assets/models/mobile_phone.glb', // Ruta del modelo
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(4, 4, 4); // Escala el modelo
        model.position.y = -0.5;
        this.scene.add(model)
        this.model = model
        // Cargar la imagen

      },
      (xhr) => {
        console.log(`Progreso: ${(xhr.loaded / xhr.total) * 100}%`);
      },
      (error) => {
        console.error('Error al cargar el modelo:', error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      this.renderer.render(this.scene, camera);
      this.model.rotation.y += 0.01
    };
    animate();
  }
}
