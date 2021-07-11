import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Discipline } from './../domain/discipline';

import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DisciplineService {

    apiUrl = '/assets/demo/data/disciplines.json';
    disciplines: Discipline[] = [];

    constructor(private http: HttpClient) { }

    getDisciplines() {
        return this.http.get(this.apiUrl).pipe(map((response: any) => {
            this.disciplines = response.disciplines;
            return this.disciplines;
        }));
    }

}