import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginCredentialModel } from 'src/app/models/loginCredentialModel';
import { DatabaseConnectionService } from 'src/app/services/database-connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  email: string = '';
  pin: string = '';
  errorMessage: string = '';

  //router imported for nav pushing
  constructor(
    private dbService: DatabaseConnectionService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  @Output()
  newViewEvent = new EventEmitter<boolean>();

  toggleEventForm(value: boolean) {
    this.newViewEvent.emit(value);
  }

  submitLogin() {
    const loginCredentials: LoginCredentialModel = new LoginCredentialModel(
      this.email,
      this.pin
    );
    this.dbService.attemptLogin(loginCredentials).subscribe(
      (data) => {
        // var resp = data.json()
        console.log(data.body.token)
        sessionStorage.setItem("token", data.body.token)
        this.router.navigate(['/home']);
      },
      (err) => {
        console.log(err)
        this.errorMessage = 'login failed';
      }
    );
  }
}
