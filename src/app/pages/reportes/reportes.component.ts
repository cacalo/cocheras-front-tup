import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataEstacionamientosService } from '../../services/data-estacionamientos.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {
  dataEstacionamientoService = inject(DataEstacionamientosService)
}
