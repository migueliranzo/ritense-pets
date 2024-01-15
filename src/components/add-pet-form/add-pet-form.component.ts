import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { pet, petStatus } from '../../models/pet.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-pet-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './add-pet-form.component.html',
  styleUrl: './add-pet-form.component.scss'
})
export class AddPetFormComponent {

  addPetForm: FormGroup;
  petStatusOptions = Object.values(petStatus);

  constructor(private fb: FormBuilder) {
    this.addPetForm = this.fb.group({
      name: ['', Validators.required],
      id: [],
      category: this.fb.group({
        id: [''],
        name: ['']
      }),
      photoUrls: ['', Validators.required],
      tags: [''],
      status: ['available'] 
    });
  }

  submitForm(){
    let formValue = this.addPetForm.value;

    if (formValue.tags) {
      formValue.tags = formValue.tags.split(',').map((tag:string, id:number) => ({id: id+1, name: tag.trim()}));
    }else{
      formValue.tags = [];
    }

    formValue.id = this.getRandomID();

    formValue.photoUrls = formValue.photoUrls.split(',').map((url:string)=> url.trim());
    console.log(formValue);
  }

  getRandomID(): number {
    return Math.floor(Math.random() * 1000000);
  }

}
