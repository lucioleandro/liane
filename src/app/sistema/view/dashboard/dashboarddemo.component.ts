import {Component, OnInit} from '@angular/core';
import { DisciplineService } from '../../service/discipline.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Schedule } from '../../domain/schedule';
import { Discipline } from '../../domain/discipline';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardDemoComponent implements OnInit {

    originalList: Discipline[];
    sourceList: Discipline[];
    targetList: Discipline[];

    message: string;
    detailMessage: string;

    constructor(private service: DisciplineService,
                private notificationService: NotificationService) { }

    ngOnInit() {
        this.service.getDisciplines().subscribe(lista => {
            this.originalList = lista;
            this.sourceList = lista;
        });
        this.targetList = [];
    }

    movedToTarget(list) {
        if(this.hasRequiredDisciplines(list.items[0]) || this.thereIsTimeShock(list.items[0])) {
            this.sourceList.push(list.items[0]);
            this.targetList.pop();
            this.notificationService.showErrorMessage(this.message, this.detailMessage);
            return;
        }
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

    private setMessage(message: string, detail: string) {
        this.message = message;
        this.detailMessage = detail;
    }
}
