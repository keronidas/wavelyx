import { Directive } from '@angular/core';

@Directive({
    selector: '[appRouting]',
})

export class ProductosDirective {
    constructor() { }

    productos = [
        {
            nombre: 'sky300',
            precio: '399',
            categoria: 'movil',
            procesador: 'R23F',
            fn: 'sky300'
        },
        {
            nombre: 'VibeX200',
            precio: '499',
            categoria: 'movil',
            procesador: 'Vortex X',
            fn: 'vibex200'
        },
        {
            nombre: 'TerraX Pro',
            precio: '249',
            categoria: 'Reloj',
            procesador: 'Zelemtic R23',
            fn: 'terrax'
        },
    ]
    seguros = [
        {
            nombre: 'Seguro contra daños accidentales',
            precio: '79',
            categoria: 'Cobertura por daños y robo',
            descripcion: 'Garantía de 2 años para daños accidentales, robo o mal funcionamiento.'
        },
        {
            nombre: 'Seguro todo riesgo',
            precio: '120',
            categoria: 'Cobertura global',
            descripcion: 'Cobertura completa que incluye daños, robo y accidentes en todo el mundo.'
        },
        {
            nombre: 'Seguro básico',
            precio: '49',
            categoria: 'Cobertura limitada',
            descripcion: 'Cobertura contra daños menores y fallos de fábrica por 1 año.'
        }
    ];

    extras = [
        {
            nombre: 'Protector de pantalla',
            precio: '15',
            categoria: 'Accesorio',
            descripcion: 'Protección adicional contra arañazos y golpes en la pantalla.'
        },
        {
            nombre: 'Estuche resistente',
            precio: '25',
            categoria: 'Accesorio',
            descripcion: 'Estuche de alta resistencia para proteger tu dispositivo de caídas.'
        },
        {
            nombre: 'Cargador rápido',
            precio: '20',
            categoria: 'Accesorio',
            descripcion: 'Cargador de alta velocidad compatible con la mayoría de dispositivos.'
        }
    ];

}