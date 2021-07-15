import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  @Input() public parentData!: number;
  userName!: string;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe( res=> {
      console.log(res);
      this.isLoggedIn =res;
    });
    this.authService.userName.subscribe( res=> {
      this.userName = res;
    })
    this.parentData = 2;
  }


  login() {
      this.router.navigateByUrl('login');
  }
  register() {
    this.router.navigateByUrl('register');
  }
  logout() {
    this.router.navigateByUrl('query');
    this.authService.isLoggedIn.next(false);
  }
}
