import {Component, OnInit} from '@angular/core';
import { DisciplineService } from './../service/discipline.service';
import { NotificationService } from './../../core/services/notification.service';
import { Schedule } from './../domain/schedule';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardDemoComponent implements OnInit {

    sourceList: any[];
    targetList: any[];

    constructor(private service: DisciplineService,
                private notificationService: NotificationService) { }

    ngOnInit() {
        this.sourceList = this.service.getDisciplines();
        this.targetList = [];
    }

    movedToTarget(list) {
        if(this.thereIsTimeShock(list.items[0])) {
            this.sourceList.push(list.items[0]);
            this.targetList.pop();
            this.notificationService.showErrorMessage("Time Shock", "It's not possible include the discipline because there are times shock")
            return;
        }
    }

    private thereIsTimeShock(items) {
        let newSchedules = items.schedules;
        for (let i = 0; i < this.targetList.length - 1; i++) {
            let schedules = this.targetList[i].schedules;
            for (let j = 0; j < schedules.length; j++) {
                for (let k = 0; k < newSchedules.length; k++) {
                    if(this.isSchedulesIqual(schedules[j], newSchedules[k])) {
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
}
