import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserRegistered = false;

  registerUser(): void {
    this.isUserRegistered = true;
  }
  isRegistered(): boolean {
    return this.isUserRegistered;
  }
}
