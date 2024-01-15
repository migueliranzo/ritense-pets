import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  httpClient = inject(HttpClient);

  getPetsByCriteria(tags: string [], status: string): Observable<pet[]>{
    if(tags[0] != ''){
      return this.getPetsByTags(tags);
    }else{
      return this.getPetsByStatus(status);
    }
  }

  getPetsByStatus(status:string = 'available'): Observable<pet[]>{
    return this.httpClient.get('https://petstore3.swagger.io/api/v3/pet/findByStatus', {params: {status}}) as Observable<pet[]>
  }

  getPetsByTags(tags:string[]): Observable<pet[]>{
    return this.httpClient.get('https://petstore3.swagger.io/api/v3/pet/findByTags', {params: {tags}}) as Observable<pet[]>
  }

  createNewPet(body: any){
    return this.httpClient.post('https://petstore3.swagger.io/api/v3/pet', body);
  }

}
