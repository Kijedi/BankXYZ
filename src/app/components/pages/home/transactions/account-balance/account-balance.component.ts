import { Component, Input, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/models/accountModel';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
})
export class AccountBalanceComponent implements OnInit {
  
  @Input()
  balance: any;

  constructor() {}

  ngOnInit(): void {}
}
