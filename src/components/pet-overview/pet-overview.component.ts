import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { pet } from '../../models/pet.model';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-pet-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-overview.component.html',
  styleUrl: './pet-overview.component.scss'
})
export class PetOverviewComponent implements OnInit{

  
  petService = inject(PetService);
  
  petList$: Observable<pet[]> | undefined;

  ngOnInit(): void {
    this.petList$ =  this.petService.getPetsByStatus();
  }

  

}
