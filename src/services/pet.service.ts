import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  httpClient = inject(HttpClient);

  getPetsByStatus(status:string = 'available'): Observable<pet[]>{
    return this.httpClient.get('https://petstore3.swagger.io/api/v3/pet/findByStatus', {params: {status}}) as Observable<pet[]>
  }

  createNewPet(body: any){
    return this.httpClient.post('https://petstore3.swagger.io/api/v3/pet', body);
  }

}
