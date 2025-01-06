import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private auth = inject(AngularFireAuth);
  private isLoggedIn = false;

  constructor() {}

  async login(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password);
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
