import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PetOverviewComponent } from '../components/pet-overview/pet-overview.component';
import { AddPetFormComponent } from '../components/add-pet-form/add-pet-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PetOverviewComponent, AddPetFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ritense-pets';
}
