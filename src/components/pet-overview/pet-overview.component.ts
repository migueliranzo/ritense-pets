import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, debounceTime, filter, startWith, switchMap } from 'rxjs';
import { pet, petStatus } from '../../models/pet.model';
import { PetService } from '../../services/pet.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppModal } from '../modal/app-modal.component';
import { AddPetFormComponent } from '../add-pet-form/add-pet-form.component';

@Component({
  selector: 'app-pet-overview',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AppModal, AddPetFormComponent],
  templateUrl: './pet-overview.component.html',
  styleUrl: './pet-overview.component.scss'
})
export class PetOverviewComponent implements OnInit{

  statusControl = new FormControl('available');
  petService = inject(PetService);  
  petList$: Observable<pet[]> | undefined;
  petStatusOptions = Object.values(petStatus);

  ngOnInit(): void {

    let statusChanges$ = this.statusControl.valueChanges.pipe(
      startWith('available'), 
      debounceTime(100),
    );

    this.petList$ =  statusChanges$.pipe(
      filter((status): status is string => status !== null && status !== undefined),
      switchMap((status)=>  this.petService.getPetsByStatus(status))
    );
  }

  createPet(event: any){
    console.log(event);
  }

}
