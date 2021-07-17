import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { QueryService } from 'src/app/shared/services/query/query.service';
//
import {v4 as uuidv4} from "uuid";
@Component({
  selector: 'app-ask-question-dialog',
  templateUrl: './ask-question-dialog.component.html',
  styleUrls: ['./ask-question-dialog.component.css']
})

export class AskQuestionDialogComponent implements OnInit  {
  keywords = new Set(['angular', 'html', 'css']);
  formControl = new FormControl(['angular']);
  userID:any;
  myForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private queryService: QueryService,
    private authService: AuthService,
  ) { }
  ngOnInit(): void {

    this.myForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3),]],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });
    this.authService.userID.subscribe( res=> {
      this.userID = res;
    });

  }


  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }
  submit() {
    const uid = uuidv4();
    let taskData = {
      title: this.myForm.value.title,
      description:  this.myForm.value.description,
      tags: this.formControl.value,
      questionID: uid,
      userID: this.userID
    }
    //  console.log( taskData);
     this.queryService.createQuery(taskData).subscribe();
  }


  addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.keywords.add(event.value);
      // event.chipInput!.clear();
    }
  }

  removeKeyword(keyword: string) {
    this.keywords.delete(keyword);
  }


}

