import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-administracion',
  imports: [ButtonModule],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})

export class AdministracionComponent {
  categorias = ['Tecnología', 'Cocina', 'Salud', 'Deportes'];
}
