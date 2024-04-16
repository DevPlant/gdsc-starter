import {inject, Injectable} from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@angular/fire/auth'
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private auth: Auth, private router: Router) { }

  async getIdToken() {
    await this.auth.authStateReady();
    if(this.auth.currentUser === null){
      this.router.navigate(['/login']);
      return null;
    }
    return this.auth.currentUser.getIdToken();
  }

  //login method
  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then(() => {
      this.router.navigate(['/manage-files']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  register(email: string, password: string) {
    //register method
    createUserWithEmailAndPassword(this.auth, email, password).then(() => {
      alert('User Registered Successfully');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  signout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  async isAuthenticated() {
    await this.auth.authStateReady()
    return this.auth.currentUser !== null;
  }
}
