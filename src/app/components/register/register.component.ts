import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/modals/user.modal';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm!: FormGroup;
  userModal: User = new User();
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.reactiveForm();
    // this.authService.getUser().subscribe( res=> {
    //   console.log(res);
    // })
  }

  /* Reactive form */
  reactiveForm() {
    this.myForm = this.fb.group({
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
//     this.userModal.name = this.myForm.value.name;
//     this.userModal.email = this.myForm.value.email;
//     this.userModal.password = this.myForm.value.password;
//     this.userModal.gender = this.myForm.value.gender;
//     let user  = {
//       name: this.myForm.value.name,
//       email: this.myForm.value.email,
//     }


}
registeredUser() {
  this.router.navigateByUrl('signin');
}

}
