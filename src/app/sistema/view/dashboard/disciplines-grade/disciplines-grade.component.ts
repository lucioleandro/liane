import { Component, Input, OnInit } from '@angular/core';
import { DisciplineGrade } from './domain/disciplene-grade';

@Component({
  selector: 'app-disciplines-grade',
  templateUrl: './disciplines-grade.component.html',
  styleUrls: ['./disciplines-grade.component.scss']
})
export class DisciplinesGradeComponent implements OnInit {

  @Input()
  disciplinesGradeList: DisciplineGrade[];

  constructor() { }

  ngOnInit(): void {
  }

}
