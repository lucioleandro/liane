import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private service: MessageService) { }

  showErrorMessage(message: string, detail: string) {
    this.service.add({severity:'error', summary: message, detail: detail, life: 5000});
  }

}
