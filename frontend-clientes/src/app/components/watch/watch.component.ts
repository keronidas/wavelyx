import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-watch',
  imports: [],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent {
  @ViewChild('watch', { static: true }) canvasContainer!: ElementRef;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  private model!: THREE.Object3D;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.scene = new THREE.Scene();
  }

  ngAfterViewInit(): void {
    this.renderer.setSize(800, 800);
    this.renderer.shadowMap.enabled = true;
    this.renderer.setClearColor(0x000000, 0);
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);
    // Cámara
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const controls = new OrbitControls(camera, this.renderer.domElement);
    camera.position.set(1, 7, 7);
    camera.lookAt(0, 0, 0);
    this.scene.add(camera);
    // Luces
    const ambientLight = new THREE.AmbientLight(0x404040, 3);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/assets/models/digital_watch.glb',
      (gltf) => {
        this.model = gltf.scene;
        this.model.scale.set(1, 1, 1); // Ajusta la escala
        this.model.rotation.set(1,1,1)
        this.scene.add(this.model);

        // Llamar a la función para animar el móvil
        this.animateWatch();
      },
      (xhr) => {
      },
      (error) => {
        console.error('Error al cargar el modelo:', error);
      }
    );
    // Bucle de animación de Three.js
    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, camera);
    };
    animate();
  }

  animateWatch(): void { }
}
