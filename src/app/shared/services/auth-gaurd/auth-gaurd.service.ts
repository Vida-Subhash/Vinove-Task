import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
  logged: boolean = false;
    constructor(
      private authService: AuthService,
      private router: Router
    ) {
      this.authService.isLoggedIn.subscribe(res => {
      this.logged = res;
      console.log(this.logged);
      })
    }
    canActivate(): boolean {
      if(this.logged) {
        return true
      } else {
        this.router.navigateByUrl('query');
        return false
      }
    }
  }
