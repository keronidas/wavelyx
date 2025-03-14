import {
  Component,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { AmbientLight, Group, Object3DEventMap } from 'three';
import { ProductosDirective } from '../../directives/productos-configurables.directive';

@Component({
  selector: 'configurador-canvas',
  standalone: true,
  imports: [],
  templateUrl: './configurador-canvas.component.html',
  styleUrl: './configurador-canvas.component.scss',
  providers: [ProductosDirective]
})
export class AppComponent implements OnInit, OnDestroy {
  private productosDirectiva = inject(ProductosDirective)
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  controls!: OrbitControls;
  debugObject = { color: 0xff12ae };
  productos = this.productosDirectiva.productos;
  extras = this.productosDirectiva.extras;
  seguros = this.productosDirectiva.seguros;
  private model = new THREE.Group
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    const width = window.innerWidth - 384;
    const height = window.innerHeight - 48 - 80;

    // Crear el renderizador
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true; // Habilitar sombras
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    // Crear la escena
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#e5e7eb'); // Color de fondo

    // Cargar el HDR para el fondo
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load('assets/environmentMap/mountain.hdr', (environmentMap) => {
      environmentMap.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.background = environmentMap;
      this.scene.environment = environmentMap;
    });

    // Luz ambiental
    const ambientLight = new AmbientLight(0x404040, 10); // Luz suave
    this.scene.add(ambientLight);

    // Luces direccionales
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

    // Cámara
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 1, 5);
    this.scene.add(this.camera);

    // Controles orbitales
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.dampingFactor = 0.1;
    this.controls.rotateSpeed = 0.05;
    this.controls.zoomSpeed = 0.8;

    this.showsky300()


    // Animación de la escena
    const animate = () => {
      requestAnimationFrame(animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    animate();

    // Listener para redimensionar
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  onWindowResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight - 48;

    // Actualizar la cámara
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    // Ajustar el tamaño del renderizador
    this.renderer.setSize(width, height);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
  }




  showItem(model: string) {
    if (this.model) {
      this.scene.remove(this.model);
    }
    switch (model) {
      case 'sky300':
        this.showsky300()
        break;
      case 'vibex200':
        this.showVibex200()
        break;
      case 'terrax':
        this.showTerrax()
        break;
      default:
        this.showsky300()
        break;
    }
  }

  showsky300() {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/assets/models/sky300.glb',
      (gltf) => {
        this.model = gltf.scene;
        this.model.scale.set(13, 13, 13);
        this.scene.add(this.model);
      },
      (xhr) => {
        console.log(`Progreso: ${(xhr.loaded / xhr.total) * 100}%`);
      },
      (error) => {
        console.error('Error al cargar el modelo:', error);
      }
    );
  }
  showVibex200() {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/assets/models/vibex200.glb',
      (gltf) => {
        this.model = gltf.scene;
        this.model.scale.set(1, 1, 1);
        this.scene.add(this.model);
      },
      (xhr) => {
        console.log(`Progreso: ${(xhr.loaded / xhr.total) * 100}%`);
      },
      (error) => {
        console.error('Error al cargar el modelo:', error);
      }
    );
  }
  showTerrax() {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/assets/models/terrax.glb',
      (gltf) => {
        this.model = gltf.scene;
        this.model.scale.set(0.3, 0.3, 0.3);
        this.model.rotateY(-Math.PI/2)
        this.scene.add(this.model);
      },
      (xhr) => {
        console.log(`Progreso: ${(xhr.loaded / xhr.total) * 100}%`);
      },
      (error) => {
        console.error('Error al cargar el modelo:', error);
      }
    );
  }
}
