import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subject, catchError, combineLatest, debounceTime, filter, map, of, startWith, switchMap } from 'rxjs';
import { pet, petStatus } from '../../models/pet.model';
import { PetService } from '../../services/pet.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppModal } from '../modal/app-modal.component';
import { AddPetFormComponent } from '../add-pet-form/add-pet-form.component';
import { PetListComponent } from '../pet-list/pet-list.component';

@Component({
  selector: 'app-pet-overview',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AppModal, AddPetFormComponent, PetListComponent],
  templateUrl: './pet-overview.component.html',
  styleUrl: './pet-overview.component.scss'
})
export class PetOverviewComponent implements OnInit{

  statusControl = new FormControl('available');
  tagControl = new FormControl<string>('');
  petService = inject(PetService);  
  petList$: Observable<pet[]> | undefined;
  petStatusOptions = Object.values(petStatus);
  clickedPetImgs: string[] = [""];
  currentImgIndex = 0;

  ngOnInit(): void {
    this.setUpPetListObservable();
  }

  setUpPetListObservable(){
    let statusChanges$ = this.statusControl.valueChanges.pipe(
      filter((status): status is string => status !== null && status !== undefined),
      startWith('available'), 
      debounceTime(100),
    );

    let tagChanges$ = this.tagControl.valueChanges.pipe(
      startWith(this.tagControl.value), 
      filter((tags): tags is string => tags !== null && tags !== undefined),
      debounceTime(300),
      map(value => value.split(',').map(tag => tag.trim())),
    );

    let combinedChanges$ = combineLatest([statusChanges$, tagChanges$]);

    this.petList$ = combinedChanges$.pipe(
      switchMap(([status, tags]) => 
        this.petService.getPetsByCriteria(tags, status)),
      catchError(error => {
        console.error(error);
        return of([]);
      })
    );  
    }

  handleFormSubmit(requestBody: pet, addModal: AppModal) {
    this.petService.createNewPet(requestBody).subscribe({
      next: () => {
        //To explain
        let currentStatus = this.statusControl.value;
        this.statusControl.setValue("");
        this.statusControl.setValue(currentStatus);
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
