import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserModel } from '../models/UserModel';
import { LoginCredentialModel } from '../models/loginCredentialModel';
import { RegisterModel } from '../models/registerModel';
import { AccountModel } from '../models/accountModel';
import { TransactionModel } from '../models/TransactionModel';
import { ProfileModel } from '../models/profileModel';
import { TransferModel } from '../models/TransferModel';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root',
})
export class DatabaseConnectionService {
  constructor(private httpClient: HttpClient) { }

  attemptLogin(credentials: LoginCredentialModel): Observable<any> {
    let body = JSON.stringify({ "username": credentials.customerId, "password": credentials.pin });
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });

    return this.httpClient
      .post<any>('http://localhost:8080/user/login', body, {
        headers,
        observe: 'response',
        withCredentials: false,
      })
      .pipe(catchError(this.handleError));
  }

  registerUser(userReg: RegisterModel): Observable<any> {
    let body = JSON.stringify(userReg);
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });


    return this.httpClient
      .post('http://localhost:8080/user/register', body, { headers })
      .pipe(catchError(this.handleError));
  }

  retrieveAccounts(): Observable<AccountModel[]> {
    return this.httpClient.get<AccountModel[]>(
      'http://localhost:8080/transaction/statement',
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem("token")}`),
        withCredentials: false
      }
    );
  }

  retrieveTransactions(): Observable<any[]> {
    let url = 'http://localhost:8080/transaction/statement';

    return this.httpClient.get<TransactionModel[]>(url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem("token")}`),
      withCredentials: false,
    });
  }

  retrieveUserInfo(): Observable<any> {
    return this.httpClient.get(
      'http://localhost:8080/user',
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem("token")}`),
        withCredentials: false,
      }
    );
  }


  getBalance(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/account/balance', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem("token")}`),
      withCredentials: false
    })
  }


  deposit(amount: number): Observable<any> {
    return this.httpClient.post('http://localhost:8080/transaction/deposit', { amount }, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem("token")}`),
      withCredentials: false
    })
  }

  withdraw(amount: number): Observable<any> {
    return this.httpClient.post('http://localhost:8080/transaction/withdrawal', { amount }, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem("token")}`),
      withCredentials: false
    })
  }


  transfer(transferModel: TransferModel): Observable<any> {
    let body = {"toAccount": transferModel.recipient, "amount": transferModel.amount};
    return this.httpClient
      .post<any>('http://localhost:8080/transaction/transfer', body, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem("token")}`),
        observe: 'response',
        withCredentials: false,
      })
      .pipe(catchError(this.handleError));
  }

  addAccount(account: AccountModel): Observable<any> {
    let body = JSON.stringify(account);

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });

    return this.httpClient
      .post<any>('http://localhost:8080/Accounts/Add', body, {
        headers,
        observe: 'response',
        withCredentials: false,
      })
      .pipe(catchError(this.handleError));
  }

  changeEmail(email: string): Observable<any> {
    let emailobject = {
      "newEmail": email
    }

    let body = JSON.stringify(emailobject);

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });

    return this.httpClient
      .put<any>('http://localhost:8080/email', body, {
        headers,
        observe: 'response',
        withCredentials: false,
      })
      .pipe(catchError(this.handleError));
  }

  changePassword(password: string): Observable<any> {
    let emailobject = {
      "newPassword": password
    }

    let body = JSON.stringify(emailobject);

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });

    return this.httpClient
      .put<any>('http://localhost:8080/password', body, {
        headers,
        observe: 'response',
        withCredentials: false,
      })
      .pipe(catchError(this.handleError));
  }

  logOut(): Observable<any> {
    let body = {}

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });

    return this.httpClient
      .post<any>('http://localhost:8080/logOut', body, {
        headers,
        observe: 'response',
        withCredentials: false,
      })
      .pipe(catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}


