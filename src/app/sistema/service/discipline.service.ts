import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Discipline } from './../domain/discipline';

const disciplines: Discipline[] = [
    {
        name: 'Lógica de Programação',
        code: 'inf027',
        semester: 1,
        requiredsDiscipline: [],
        status: 'APROVED',
        schedules: [
            {day: "Monday", periodTime: 1},
            {day: "Wednasday", periodTime: 1}
        ]
    },
    {
        name: 'Laboratório de Programação',
        code: 'inf028',
        semester: 2,
        requiredsDiscipline: [],
        status: 'APROVED',
        schedules: [
            {day: "Tuesday", periodTime: 1},
            {day: "Wednasday", periodTime: 2}
        ]
    },
    {
        name: 'Programação Orientada a Objetos',
        code: 'inf008',
        semester: 3,
        requiredsDiscipline: [],
        status: 'APROVED',
        schedules: [
            {day: "Monday", periodTime: 1},
            {day: "Wednasday", periodTime: 3}
        ]
    }

]

@Injectable({providedIn: 'root'})
export class DisciplineService {

    constructor(private http: HttpClient) { }

    getDisciplines() {
        return disciplines;
    }

}