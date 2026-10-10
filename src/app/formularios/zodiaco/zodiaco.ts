import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  imports: [ReactiveFormsModule],
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css',
})
export class Zodiaco implements OnInit {
  formulario!: FormGroup;

  nombreCompleto: string = '';
  edad: number = 0;
  signoChino: string = '';
  imagenSigno: string = '';

  anioNacimiento: number = 0;
  residuo: number = 0;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      aPaterno: new FormControl(''),
      aMaterno: new FormControl(''),
      dia: new FormControl(''),
      mes: new FormControl(''),
      anio: new FormControl(''),
      sexo: new FormControl('Masculino'),
    });
  }

  imprimir(): void {
    this.nombreCompleto = this.formulario.value.nombre + ' ' + this.formulario.value.aPaterno + ' ' + this.formulario.value.aMaterno;
                        
    this.anioNacimiento = Number(this.formulario.value.anio);
    this.edad = 2026 - this.anioNacimiento;

    this.residuo = this.anioNacimiento % 12;

    switch (this.residuo) {
      case 0:
        this.signoChino = 'Mono';
        this.imagenSigno = 'img/mono.png';
        break;
      case 1:
        this.signoChino = 'Gallo';
        this.imagenSigno = 'img/gallo.png';
        break;
      case 2:
        this.signoChino = 'Perro';
        this.imagenSigno = 'img/perro.png';
        break;
      case 3:
        this.signoChino = 'Cerdo';
        this.imagenSigno = 'img/cerdo.png';
        break;
      case 4:
        this.signoChino = 'Rata';
        this.imagenSigno = 'img/rata.png';
        break;
      case 5:
        this.signoChino = 'Buey';
        this.imagenSigno = 'img/buey.png';
        break;
      case 6:
        this.signoChino = 'Tigre';
        this.imagenSigno = 'img/tigre.png';
        break;
      case 7:
        this.signoChino = 'Conejo';
        this.imagenSigno = 'img/conejo.png';
        break;
      case 8:
        this.signoChino = 'Dragón';
        this.imagenSigno = 'img/dragon.png';
        break;
      case 9:
        this.signoChino = 'Serpiente';
        this.imagenSigno = 'img/serpiente.png';
        break;
      case 10:
        this.signoChino = 'Caballo';
        this.imagenSigno = 'img/caballo.png';
        break;
      case 11:
        this.signoChino = 'Cabra';
        this.imagenSigno = 'img/cabra.png';
        break;
    }
  }
}