import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private ngRedux: NgRedux<AppState>
    ) {}

    loginStatus: boolean = false;
    redirectUrl: string;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      console.log("AuthGuard on duty here!");


    //state of loginStatus, which is set to true if the users login is valid
    this.ngRedux.select(state => state.users).subscribe(res => {
      this.loginStatus = res.isLoggedIn;
    })



    // allow if loginStatus is true
    if (this.loginStatus) {
      return true;
    }


    
    this.redirectUrl = state.url;
    // else deny acces
    this.router.navigate(['/home/login']);
    return false;  // true => yes, you are allowed access, false means no!
  }
  
}
