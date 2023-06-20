import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { DatabaseConnectionService } from 'src/app/services/database-connection.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';

  errorMessage: string = '';

  constructor(private dbService: DatabaseConnectionService, private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void { }

  @Output()
  newViewEvent = new EventEmitter<boolean>();

  toggleEventForm(value: boolean) {
    this.newViewEvent.emit(value);
  }

  registerNewUser() {
    const regUser: RegisterModel = new RegisterModel(
      this.firstName,
      this.lastName,
      this.email
    );

    this.dbService.registerUser(regUser).subscribe(
      (data) => {
        // toast and redirect        
        this.showSuccess(data.customerId, data.customerPIN)
          
          // redirect to login
          this.newViewEvent.emit(false);
      },
      (error) => {
        this.errorMessage = 'Unable to register account.';
      }
    );
  }

  showSuccess(custId: String, PIN: string) {
    this.toastr.success('Account created', `You customer ID is ${custId} and your PIN is ${PIN}. Kindly remember them as they will not be displayed again.`,
    {
      timeOut: 120000
    });
  }
}
