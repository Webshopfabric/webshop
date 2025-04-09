import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private dogApiUrl = 'https://dog.ceo/api/breeds/image/random/50';
  private catApiUrl = 'https://api.thecatapi.com/v1/images/search?limit=50';

  constructor(private http: HttpClient) {}


  getDogImages(): Observable<any> {
    return this.http.get<any>(this.dogApiUrl);
  }


  getCatImages(): Observable<any> {
    return this.http.get<any>(this.catApiUrl);
  }
}
