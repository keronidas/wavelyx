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
    camera.position.set(0, 4, 0);
    this.scene.add(camera);

    // Controles orbitales
    const controls = new OrbitControls(camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.05;
    controls.zoomSpeed = 0.8;

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
      '/assets/models/Phone.glb', // Ruta del modelo
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(2, 2, 2); // Escala el modelo

        // Ajustar materiales del modelo
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.material && child.material.color) {
              child.material = new THREE.MeshStandardMaterial({
                color: 'yellow',
              });
              child.castShadow = true; // Proyectar sombras
              child.receiveShadow = true; // Recibir sombras
            }
          }
        });

        // Cargar la imagen
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
          '/assets/images/OpenOfice2.png', // Ruta de la imagen
          (imageTexture) => {
            console.log('Imagen cargada correctamente'); // Verifica si se carga
            const planeGeometry = new THREE.PlaneGeometry(1.8, 3.6); // Tamaño del plano
            const planeMaterial = new THREE.MeshBasicMaterial({
              map: imageTexture,
              transparent: true,
              side: THREE.DoubleSide,
            });
            this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
            // Posicionar el plano sobre el modelo
            this.plane.position.set(0, 0.15, -0.3); // Ajusta la posición
            this.plane.rotation.x = -Math.PI / 2; // Rotar el plano si es necesario

            this.plane.castShadow = true; // Habilitar sombras en el plano
            this.plane.receiveShadow = true;

            // Crear un grupo que contenga tanto el modelo como la imagen
            const group = new THREE.Group();
            group.add(model);
            group.add(this.plane);
            group.rotation.x = Math.PI / 2.15; // Ajusta la rotación
            group.position.y = -0.5; // Ajusta la posición
            // Añadir el grupo a la escena
            this.scene.add(group);
            console.log('Imagen aplicada correctamente');

            // Crear el GUI una vez que el plano esté disponible
            const guiContainer = document.querySelector('.dg') as HTMLElement;
            if (guiContainer) {
              guiContainer.style.position = 'absolute';
              guiContainer.style.top = '100px'; // Cambia la posición vertical
              guiContainer.style.left = '20px'; // Cambia la posición horizontal
            }
          },
          undefined, // Progreso (si lo necesitas)
          (error) => {
            console.error('Error al cargar la imagen:', error);
          }
        );
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
    };
    animate();
  }
}
