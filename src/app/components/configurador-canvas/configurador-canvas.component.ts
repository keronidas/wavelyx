import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  OnInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { AmbientLight, DirectionalLight } from 'three';
import * as dat from 'dat.gui';
import { color } from 'three/webgpu';

@Component({
  selector: 'configurador-canvas',
  standalone: true,
  imports: [],
  templateUrl: './configurador-canvas.component.html',
  styleUrl: './configurador-canvas.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  debugObject = { color: 0xff12ae }; // Objeto para el color del móvil
  nuevoMaterial = new THREE.MeshStandardMaterial({
    color: this.debugObject.color,
  }); // Material del móvil
  directionalLightFront = new DirectionalLight(this.debugObject.color, 1);
  directionalLightBack = new DirectionalLight(this.debugObject.color, 1);

  // Variables para el plano
  plane: THREE.Mesh | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    // Solo continuar si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      // Este código se ejecuta solo en el navegador

      // Crear el renderizador
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true; // Habilitar sombras
      this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

      // Crear la escena
      this.scene = new THREE.Scene();
      // Crear un color de fondo blanco
      this.scene.background = new THREE.Color('#e5e7eb'); // Usar THREE.Color

      // FOndo

      // const rgbeLoader = new RGBELoader();
      // rgbeLoader.load("assets/environmentMap/arena_playa.hdr", (environmentMap) => {
      //   environmentMap.mapping = THREE.EquirectangularReflectionMapping;
      //   this.scene.background = environmentMap;
      //   this.scene.environment = environmentMap;
      // })

      // Luz ambiental (para iluminar el modelo)
      const ambientLight = new AmbientLight(0x404040, 5); // Luz suave
      this.scene.add(ambientLight);
      const directionalLights = [];
      for (let i = 0; i < 8; i++) {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(
          i % 2 === 0 ? 4 : -4,
          i < 4 ? 5 : -4,
          i % 2 === 0 ? 4 : -4
        );
        directionalLights.push(light);
        this.scene.add(light);
      }
      // Luz direccional (luz principal)
      this.directionalLightFront.position.set(2, 2, 2).normalize();
      this.directionalLightFront.castShadow = true; // Habilitar sombras en la luz direccional
      this.scene.add(this.directionalLightFront);

      this.directionalLightBack.position.set(-2, -2, -2).normalize();
      this.directionalLightBack.castShadow = true; // Habilitar sombras en la luz direccional
      this.scene.add(this.directionalLightBack);

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

      // Cargar el modelo 3D
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        '/assets/models/vibex200.glb',
        (gltf) => {
          const model = gltf.scene;
          model.scale.set(2, 2, 2);
          model.rotateY(Math.PI / 6.5)
          this.scene.add(model)
        },
        (xhr) => {
          console.log(`Progreso: ${(xhr.loaded / xhr.total) * 100}%`);
        },
        (error) => {
          console.error('Error al cargar el modelo:', error);
        }
      );
      gltfLoader.load(
        '/assets/models/vibex200.glb',
        (gltf) => {
          const model = gltf.scene;
          model.scale.set(2, 2, 2);
          model.position.set(-2, 0, 0)
          model.rotateY(-Math.PI / 1.25)
          this.scene.add(model)
        },
        (xhr) => {
          console.log(`Progreso: ${(xhr.loaded / xhr.total) * 100}%`);
        },
        (error) => {
          console.error('Error al cargar el modelo:', error);
        }
      );
      // Crear una luz de área
      const rectLight = new THREE.RectAreaLight(0xffffff, 5, 10, 5); // Color, intensidad, ancho y alto
      rectLight.position.set(0, 5, 0); // Posicionar la luz

      // Crear un objeto para visualizar la luz (es común hacerlo con una malla)

      // Añadir la luz de área a la escena
      this.scene.add(rectLight);

      // Animar la escena
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        this.renderer.render(this.scene, camera);
      };
      animate();
    }
  }
}
