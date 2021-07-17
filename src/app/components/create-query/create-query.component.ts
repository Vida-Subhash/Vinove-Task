import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { QueryService } from 'src/app/shared/services/query/query.service';
import { AskQuestionDialogComponent } from '../ask-question-dialog/ask-question-dialog.component';

import {v4 as uuidv4} from "uuid";
import { Answered } from 'src/app/shared/modals/user.modal';
@Component({
  selector: 'app-create-query',
  templateUrl: './create-query.component.html',
  styleUrls: ['./create-query.component.css']
})
export class CreateQueryComponent implements OnInit {
  data:any[] =[];
  isLoggedIn!: boolean
  submittedAnswer = new FormControl('',  Validators.compose(
                   [Validators.required,
                  Validators.minLength(2),
                  Validators.maxLength(500)]));
  answers:any;
  userID:any;
  answersed!: Answered;
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
      this.submittedAnswer.reset();
    });

    this.queryService.getAllAnswers(4).subscribe( res => {
      this.answers = res;
      console.log(res);
    });

    this.authService.isLoggedIn.subscribe( res=> {
      console.log(res);
      this.isLoggedIn =res;
    });

    this.authService.userID.subscribe( res=> {
      this.userID = res;
    });

  }
  openDialog() {
    const dialogRef = this.dialog.open(AskQuestionDialogComponent, {
      height: '470px',
      width: '500px',
    });
  }
  submitAnswer(value: any) {
    console.log(value);
    if(this.userID !== value.userID ){
      const uid = uuidv4();
    this.answersed = {
      quesid: value.questionID,
      question: value.title,
      userID: this.userID,
      Allansers: [
        {
        ansID: uid,
        answer: this.submittedAnswer.value,
        answeredUserID: this.userID
      }
      ]}
      this.queryService.AnswerSubmit(this.answersed).subscribe( res => {
        console.log(res);
      });
      this.submittedAnswer.reset();
    }else {
      this.toastr.warning("You are not allowed answer your own question..");
    }

  }
  addAnswer() {
    if(!this.isLoggedIn) {
      this.toastr.info('To add your answer you must Login..');
    }
  }

}
