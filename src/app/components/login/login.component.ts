import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  userDetaisl: any[]=[];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.authService.getUser().subscribe( res => {
      this.userDetaisl = res;
    });
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }
  submitForm() {
    console.log(this.myForm.value);
    this.userDetaisl.filter(ele => {
      if(ele.email === this.myForm.value.email && ele.password === this.myForm.value.password) {
        console.log("user found", ele);
        this.toastr.success("Login Success.");
            this.authService.isLoggedIn.next(true);
            this.authService.userName.next(ele.name);
            console.log(ele.name);
            this.router.navigateByUrl('query');
          } else {
            this.toastr.error("Invalid Details");
          }
        });
  }

  registeredUser() {
    this.router.navigateByUrl('register');
  }

}
