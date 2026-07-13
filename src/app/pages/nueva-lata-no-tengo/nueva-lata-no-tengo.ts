import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';
import { LataNoTengoService } from '../../services/lata-no-tengo.service';

@Component({
  selector: 'app-nueva-lata-no-tengo',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './nueva-lata-no-tengo.html',
  styleUrl: './nueva-lata-no-tengo.css'
})
export class NuevaLataNoTengo implements OnInit {
  // formulario registro lata
  formRegLata!: FormGroup;
  // Variables para almacenar la foto y hacer un preview
  foto1File: File | null = null;
  previewFoto1: string | null = null;
  @ViewChild('fileInput1') fileInput1!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private lataNoTengoService: LataNoTengoService
  ) { }

  ngOnInit(): void {
    this.formRegLata = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      estado: ['', Validators.required]
    });
  }

  onFileSelected(event: any, numeroFoto: number): void {
    const file: File = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (numeroFoto === 1) {
        this.foto1File = file;
        this.previewFoto1 = reader.result as string;
      }
    };
    reader.readAsDataURL(file);
  }

  removerFoto(numeroFoto: number): void {
    if (numeroFoto === 1) { this.foto1File = null; this.previewFoto1 = null; }
  }

  async submitLata(): Promise<void> {
    if (this.formRegLata.invalid) {
      window.alert('Por favor, completa el nombre y el estado de la lata.');
      return;
    }

    if (!this.foto1File) {
      window.alert('Por favor, selecciona una foto de la lata que te falta.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.formRegLata.get('nombre')?.value);
    formData.append('estado', this.formRegLata.get('estado')?.value);

    formData.append('foto', this.foto1File);

    this.lataNoTengoService.registrarLataNoTengo(formData).subscribe({
      next: () => {
        window.alert('¡Lata que no tienes registrada con éxito!');

        this.formRegLata.reset({ estado: '' });
        this.removerFoto(1);

        if (this.fileInput1) {
          this.fileInput1.nativeElement.value = '';
        }
      },
      error: (err: any) => {
        console.error('Error al guardar la lata:', err);
        window.alert('Hubo un error en el servidor al intentar guardar la lata.');
      }
    });
  }
}
