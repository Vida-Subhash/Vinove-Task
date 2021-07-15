import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { AskQuestionDialogComponent } from '../ask-question-dialog/ask-question-dialog.component';

import {v4 as uuidv4} from "uuid";
@Component({
  selector: 'app-create-query',
  templateUrl: './create-query.component.html',
  styleUrls: ['./create-query.component.css']
})
export class CreateQueryComponent implements OnInit {
  data:any[] =[];
  isLoggedIn!: boolean
  submittedAnswer = new FormControl(['']);
  answers:any;
  constructor(
    public dialog: MatDialog,
    private queryService: QueryService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.queryService.getAllQuestions().subscribe( res => {
      this.data =res;
      console.log(res);
    });
    this.queryService.getAllAnswers(4).subscribe( res => {

      this.answers = res;
      // this.answers.forEach(ele => console.log(ele.answerId))
      // console.log(res);
      console.log(res);
    });

    this.authService.isLoggedIn.subscribe( res=> {
      console.log(res);
      this.isLoggedIn =res;
    });

  }
  openDialog() {
    const dialogRef = this.dialog.open(AskQuestionDialogComponent, {
      height: '470px',
      width: '500px',
    });
  }
  submitAnswer(id:any) {
    const uid = uuidv4();
    let answerObj = {
      questionID: id,
      answerID: uid,
      answers: this.submittedAnswer.value,
      }
    this.queryService.AnswerSubmit(answerObj).subscribe( res => {
      // this.answer = res;
      console.log(res);
    });
      // console.log(id);
      // console.log(this.submittedAnswer.value);
  }
  addAnswer() {
    if(!this.isLoggedIn) {
      this.toastr.info('To add your answer you must Login..');
    }
  }

}
