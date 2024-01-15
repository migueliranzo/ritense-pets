import { Component, EventEmitter, Input, Output } from '@angular/core';
import { pet } from '../../models/pet.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-list.component.html',
  styleUrl: './pet-list.component.scss'
})
export class PetListComponent {
  @Input() petList: pet[] | null = [];
  @Output() openImg = new EventEmitter<pet>();
}
