import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subject, catchError, debounceTime, filter, map, merge, of, startWith, switchMap } from 'rxjs';
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
  private refreshPetsSubject = new Subject<void>();
  petList$: Observable<pet[]> | undefined;
  petStatusOptions = Object.values(petStatus);
  clickedPetImgs: string[] = [""];
  currentImgIndex = 0;

  ngOnInit(): void {

    let statusChanges$ = this.statusControl.valueChanges.pipe(
      startWith('available'), 
      debounceTime(100),
    );

    let refreshes$ = this.refreshPetsSubject.pipe(
      map(() => this.statusControl.value),
    );

    this.petList$ = merge(statusChanges$, refreshes$).pipe(
      filter((status): status is string => status !== null && status !== undefined),
      switchMap(status => this.petService.getPetsByStatus(status)),
      catchError(error => {
        console.error(error);
        return of([]);
      })
    );
  }

  handleFormSubmit(requestBody: pet, addModal: AppModal) {
    this.petService.createNewPet(requestBody).subscribe({
      next: () => {
        this.refreshPetsSubject.next();
        addModal.closeModal();
      },
      error: (error) => console.error(error)
    });
  }

  openImgModel(imgModal: AppModal, selectedPet: pet){
    this.clickedPetImgs = selectedPet.photoUrls;
    this.currentImgIndex = 0;
    imgModal.title = selectedPet.name;
    imgModal.openModal();
  }

}
