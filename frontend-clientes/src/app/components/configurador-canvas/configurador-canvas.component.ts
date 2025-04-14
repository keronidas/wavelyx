import {
  Component,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
  OnInit,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { AmbientLight } from 'three';
import { ProductosDirective } from '../../directives/productos-configurables.directive';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
import { NgStyle } from '@angular/common';
import { CarritoDirective } from '../../directives/carrito.directive';
import { CarritoProducto } from '../../interfaces/producto-carrito.interface';

@Component({
  selector: 'configurador-canvas',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './configurador-canvas.component.html',
  providers: [ProductosDirective, CarritoDirective],
})
export class AppComponent implements OnInit, OnDestroy {
  private productosDirectiva = inject(ProductosDirective);
  private carritoDirectiva = inject(CarritoDirective);

  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  controls!: OrbitControls;
  debugObject = { color: 0xff12ae };
  productos = this.productosDirectiva.productos;
  extras = this.productosDirectiva.extras;
  seguros = this.productosDirectiva.seguros;

  seleccion = signal({
    producto: this.productos[0],
    seguro: this.seguros[0],
    extras: this.extras[0],
  });

  precioTotal = signal(0);
  private model: THREE.Group | null = null;
  private loader = new GLTFLoader();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.calcularPrecioTotal();
  }

  ngOnInit(): void {
    this.initThreeJS();
    this.cargarModeloInicial();
  }

  initThreeJS(): void {
    const width = window.innerWidth - 384;
    const height = window.innerHeight - 48 - 80;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load('assets/environmentMap/mountain.hdr', (environmentMap) => {
      environmentMap.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.background = environmentMap;
      this.scene.environment = environmentMap;
    });
    // Escena
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#e5e7eb');

    // Iluminación
    const ambientLight = new AmbientLight(0x404040, 10);
    this.scene.add(ambientLight);

    // Configuración de luces direccionales
    this.configurarLuces();

    // Cámara
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 1, 5);
    this.scene.add(this.camera);

    // Controles
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.configurarControles();

    // Animación
    this.animate();
  }

  configurarLuces(): void {
    for (let i = 0; i < 8; i++) {
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(
        i % 2 === 0 ? 4 : -4,
        i < 4 ? 5 : -4,
        i % 2 === 0 ? 4 : -4
      );
      this.scene.add(light);
    }
  }

  configurarControles(): void {
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.dampingFactor = 0.1;
    this.controls.rotateSpeed = 0.05;
    this.controls.zoomSpeed = 0.8;
  }

  cargarModeloInicial(): void {
    this.cargarModelo(this.productos[0].fn);
  }

  cargarModelo(modeloId: string): void {
    // Eliminar modelo anterior si existe
    if (this.model) {
      this.scene.remove(this.model);
    }

    const rutaModelo = `/assets/models/${modeloId}.glb`;

    this.loader.load(
      rutaModelo,
      (gltf) => {
        this.model = gltf.scene;
        this.ajustarModelo(modeloId);
        this.scene.add(this.model);
      },
      (xhr) => {
        console.log(`Cargando modelo: ${(xhr.loaded / xhr.total) * 100}%`);
      },
      (error) => {
        console.error('Error al cargar modelo:', error);
      }
    );
  }

  ajustarModelo(modeloId: string): void {
    if (!this.model) return;

    switch (modeloId) {
      case 'sky300':
        this.model.scale.set(13, 13, 13);
        this.model.position.set(0, -1, 0);
        break;
      case 'vibex200':
        this.model.scale.set(1, 1, 1);
        this.model.position.set(0, 0, 0);
        break;
      case 'terrax':
        this.model.scale.set(0.3, 0.3, 0.3);
        this.model.rotation.y = -Math.PI / 2;
        break;
      default:
        this.model.scale.set(1, 1, 1);
    }
  }

  animate(): void {
    const animateLoop = () => {
      requestAnimationFrame(animateLoop);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    animateLoop();
  }

  seleccionarProducto(producto: any): void {
    this.seleccion.set({
      ...this.seleccion(),
      producto,
    });
    this.cargarModelo(producto.fn);
    this.calcularPrecioTotal();
  }

  seleccionarSeguro(seguro: any): void {
    this.seleccion.update((prev) => ({
      ...prev,
      seguro,
    }));
    this.calcularPrecioTotal();
  }

  seleccionarExtra(extra: any): void {
    this.seleccion.update((prev) => ({
      ...prev,
      extras: extra,
    }));
    this.calcularPrecioTotal();
  }

  calcularPrecioTotal(): void {
    const { producto, seguro, extras } = this.seleccion();
    const total =
      parseInt(producto.precio) +
      parseInt(seguro.precio) +
      parseInt(extras.precio);
    this.precioTotal.set(total);
  }

  onWindowResize(): void {
    const width = window.innerWidth - 384;
    const height = window.innerHeight - 48 - 80;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
  agregarAlCarrito(): void {
    const { producto, seguro, extras } = this.seleccion();

    const itemCarrito: CarritoProducto = {
      id: `${producto.fn}-${Date.now()}`, // ID único
      nombre: producto.nombre,
      precio: this.precioTotal(),
      cantidad: 1,
      detalles: {
        producto: producto,
        seguro: seguro,
        extras: extras,
      },
    };

    this.carritoDirectiva.addToCarrito(itemCarrito);

    // Opcional: Mostrar confirmación
    alert(`${producto.nombre} agregado al carrito!`);
  }
}
