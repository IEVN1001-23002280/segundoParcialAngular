import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

interface IZodiacoRegistro {
  nombreCompleto: string;
  edad: number;
  signoChino: string;
  nombre?: string;
  aPaterno?: string;
  aMaterno?: string;
  sexo?: string;
}

@Component({
  selector: 'app-registro',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro implements OnInit {
  registros: IZodiacoRegistro[] = [];
  formularioEdicion!: FormGroup;
  indiceEdicion: number = -1;

  ngOnInit(): void {
    this.cargarRegistros();

    this.formularioEdicion = new FormGroup({
      nombre: new FormControl(''),
      aPaterno: new FormControl(''),
      aMaterno: new FormControl(''),
      edad: new FormControl(''),
      sexo: new FormControl('Masculino'),
    });
  }

  cargarRegistros(): void {
    const datos = localStorage.getItem('registrosZodiaco');
    if (datos) {
      this.registros = JSON.parse(datos);
    }
  }

  editarRegistro(index: number): void {
    this.indiceEdicion = index;
    const reg = this.registros[index];

    this.formularioEdicion.patchValue({
      nombre: reg.nombre || '',
      aPaterno: reg.aPaterno || '',
      aMaterno: reg.aMaterno || '',
      edad: reg.edad || '',
      sexo: reg.sexo || 'Masculino'
    });
  }

  guardarEdicion(): void {
    if (this.indiceEdicion === -1) {
      return;
    }

    const val = this.formularioEdicion.value;
    const nombreCompleto = `${val.nombre} ${val.aPaterno} ${val.aMaterno}`;
    const edad = Number(val.edad);
    const signoActual = this.registros[this.indiceEdicion].signoChino;

    this.registros[this.indiceEdicion] = {
      nombreCompleto,
      edad,
      signoChino: signoActual,
      nombre: val.nombre,
      aPaterno: val.aPaterno,
      aMaterno: val.aMaterno,
      sexo: val.sexo
    };

    localStorage.setItem('registrosZodiaco', JSON.stringify(this.registros));

    this.indiceEdicion = -1;
    this.formularioEdicion.reset({ sexo: 'Masculino' });
  }

  eliminarRegistro(index: number): void {
    this.registros.splice(index, 1);
    localStorage.setItem('registrosZodiaco', JSON.stringify(this.registros));
    if (this.indiceEdicion === index) {
      this.indiceEdicion = -1;
      this.formularioEdicion.reset({ sexo: 'Masculino' });
    }
  }
}