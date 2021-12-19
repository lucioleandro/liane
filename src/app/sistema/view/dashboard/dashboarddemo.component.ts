import {Component, OnInit} from '@angular/core';
import { DisciplineService } from '../../service/discipline.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Schedule } from '../../domain/schedule';
import { Discipline } from '../../domain/discipline';
import { DisciplineGrade } from './disciplines-grade/domain/disciplene-grade';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardDemoComponent implements OnInit {

    originalList: Discipline[];
    sourceList: Discipline[];
    targetList: Discipline[];

    message: string;
    detailMessage: string;

    disciplinesGradeList: DisciplineGrade[];

    constructor(private service: DisciplineService,
                private notificationService: NotificationService) { }

    ngOnInit() {
        this.service.getDisciplines().subscribe(lista => {
            this.originalList = lista;
            this.sourceList = lista;
        });
        this.targetList = [];
        this.buildDisciplinesgradeList();
    }

    movedToSource(list) {
        this.removeDisciplineFromGrade(list);
    }

    private removeDisciplineFromGrade(list: any) {
        list.items[0].schedules.forEach(element => {
            switch (element.periodTime) {
                case 1:
                    this.disciplinesGradeList[0][element.day] = '';
                    break;
                case 2:
                    this.disciplinesGradeList[1][element.day] = '';
                    break;
                case 3:
                    this.disciplinesGradeList[2][element.day] = '';
                    break;
                default:
                    break;
            }
        });
    }

    movedToTarget(list) {
        if(this.hasRequiredDisciplines(list.items[0]) || this.thereIsTimeShock(list.items[0])) {
            this.sourceList.push(list.items[0]);
            this.targetList.pop();
            this.notificationService.showErrorMessage(this.message, this.detailMessage);
            return;
        }
        this.setDisciplineToGrade(list);
    }

    private hasRequiredDisciplines(item: Discipline) {
        let requiredDisciplines = item.requiredDisciplines;

        for (let index = 0; index < requiredDisciplines.length; index++) {
            let rd = requiredDisciplines[index];
            let flag = false;

            this.originalList.forEach(el => {
                if(el.code === rd.code) {
                    flag = el.status !== 'APROVED';
                    return;
                }
            });
            if(flag) {
                this.setMessage('Discipline not allowed', 'There are required disciplines');
            }
            return flag;
        }
        return false;
    }

    private thereIsTimeShock(item: Discipline) {
        let newSchedules = item.schedules;
        for (let i = 0; i < this.targetList.length - 1; i++) {
            let schedules = this.targetList[i].schedules;
            for (let j = 0; j < schedules.length; j++) {
                for (let k = 0; k < newSchedules.length; k++) {
                    if(this.isSchedulesIqual(schedules[j], newSchedules[k])) {
                        this.setMessage('Time Shock', 'It\'s not possible include the discipline because there are times shock');
                        return true;
                    }
                }
            }
        }
        return false;
    }

    private isSchedulesIqual(scheduleA: Schedule, scheduleB: Schedule) {
        return scheduleA.day === scheduleB.day && scheduleA.periodTime === scheduleB.periodTime;
    }

    private setDisciplineToGrade(list: any) {
        list.items[0].schedules.forEach(element => {
            switch (element.periodTime) {
                case 1:
                    this.disciplinesGradeList[0][element.day] = list.items[0].name;
                    break;
                case 2:
                    this.disciplinesGradeList[1][element.day] = list.items[0].name;
                    break;
                case 3:
                    this.disciplinesGradeList[2][element.day] = list.items[0].name;
                    break;
                default:
                    break;
            }
        });
    }

    private setMessage(message: string, detail: string) {
        this.message = message;
        this.detailMessage = detail;
    }

    private buildDisciplinesgradeList() {
        this.disciplinesGradeList = [{time: 1}, {time: 2}, {time: 3}];
    }
    
}
