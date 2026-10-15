import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

interface IZodiacoRegistro {
  nombreCompleto: string;
  edad: number;
  signoChino: string;
  nombre?: string;
  aPaterno?: string;
  aMaterno?: string;
  dia?: string | number;
  mes?: string | number;
  anio?: string | number;
  sexo?: string;
}

@Component({
  selector: 'app-zodiaco',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css',
})
export class Zodiaco implements OnInit {
  formulario!: FormGroup;
  registros: IZodiacoRegistro[] = [];

  nombreCompleto: string = '';
  edad: number = 0;
  signoChino: string = '';
  imagenSigno: string = '';
  sexo: string = '';
  anioNacimiento: number = 0;
  residuo: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarRegistros();

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

  calcularAnioZodiacoChino(anio: number, mes: number, dia: number): number {
    let anioLunar = anio;
    if (mes === 1) {
      anioLunar = anio - 1;
    } else if (mes === 2 && dia < 10) {
      anioLunar = anio - 1;
    }
    return anioLunar;
  }

  imprimir(): void {
    this.nombreCompleto = this.formulario.value.nombre + ' ' + this.formulario.value.aPaterno + ' ' + this.formulario.value.aMaterno;
                        
    const anioIngresado = Number(this.formulario.value.anio);
    const mesIngresado = Number(this.formulario.value.mes);
    const diaIngresado = Number(this.formulario.value.dia);
    this.sexo = this.formulario.value.sexo;

    this.edad = 2026 - anioIngresado;

    const anioZodiaco = this.calcularAnioZodiacoChino(anioIngresado, mesIngresado, diaIngresado);
    this.residuo = anioZodiaco % 12;

    switch (this.residuo) {
      case 0: this.signoChino = 'Mono'; this.imagenSigno = 'img/mono.png'; break;
      case 1: this.signoChino = 'Gallo'; this.imagenSigno = 'img/gallo.png'; break;
      case 2: this.signoChino = 'Perro'; this.imagenSigno = 'img/perro.png'; break;
      case 3: this.signoChino = 'Cerdo'; this.imagenSigno = 'img/cerdo.png'; break;
      case 4: this.signoChino = 'Rata'; this.imagenSigno = 'img/rata.png'; break;
      case 5: this.signoChino = 'Buey'; this.imagenSigno = 'img/buey.png'; break;
      case 6: this.signoChino = 'Tigre'; this.imagenSigno = 'img/tigre.png'; break;
      case 7: this.signoChino = 'Conejo'; this.imagenSigno = 'img/conejo.png'; break;
      case 8: this.signoChino = 'Dragón'; this.imagenSigno = 'img/dragon.png'; break;
      case 9: this.signoChino = 'Serpiente'; this.imagenSigno = 'img/serpiente.png'; break;
      case 10: this.signoChino = 'Caballo'; this.imagenSigno = 'img/caballo.png'; break;
      case 11: this.signoChino = 'Cabra'; this.imagenSigno = 'img/cabra.png'; break;
    }

    const nuevoRegistro: IZodiacoRegistro = {
      nombreCompleto: this.nombreCompleto,
      edad: this.edad,
      signoChino: this.signoChino,
      nombre: this.formulario.value.nombre,
      aPaterno: this.formulario.value.aPaterno,
      aMaterno: this.formulario.value.aMaterno,
      dia: diaIngresado,
      mes: mesIngresado,
      anio: anioIngresado,
      sexo: this.sexo
    };

    this.registros.push(nuevoRegistro);
    localStorage.setItem('registrosZodiaco', JSON.stringify(this.registros));
  }

  cargarRegistros(): void {
    const datos = localStorage.getItem('registrosZodiaco');
    if (datos) {
      this.registros = JSON.parse(datos);
    }
  }
}