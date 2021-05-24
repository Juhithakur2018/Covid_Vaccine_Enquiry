import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  constructor(private http: HttpClient) { }

  getAllStates(): Observable<any> {
    return this.http.get('https://cdn-api.co-vin.in/api/v2/admin/location/states');
  }

  getAllDistricts(stateId:number): Observable<any> {
    return this.http.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`);
  }
}
