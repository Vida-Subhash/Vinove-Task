import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/modals/user.modal';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
//
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm!: FormGroup;
  userModal!: User;
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private toastr: ToastrService,
    private router: Router) {}

  ngOnInit(): void {
    this.reactiveForm();
    this.authService.getUser().subscribe( res=> {
      console.log(res);
    })
  }

  /* Reactive form */
  reactiveForm() {
    this.myForm = this.fb.group({
      UID:[''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
     password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  submitForm() {
    const uid = uuidv4();
    this.myForm.value.UID = uid;
    console.log(this.myForm.value.UID );
   this.authService.postUser(this.myForm.value).subscribe( res => {
          this.toastr.info("Sucessfully registered..")
          console.log(res);
          this.myForm.reset();
          this.router.navigateByUrl('login');
});


}
registeredUser() {
  this.router.navigateByUrl('login');
}

}
