import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/models/accountModel';
import { TransactionModel } from 'src/app/models/TransactionModel';
import { TransferModel } from 'src/app/models/TransferModel';
import { DatabaseConnectionService } from 'src/app/services/database-connection.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
})
export class UserAccountsViewComponent implements OnInit {
  transactionList: TransactionModel[] = [];
  currentTransactionList: TransactionModel[] = [];
  accountList: AccountModel[] = [];
  activeAccount: AccountModel = new AccountModel(0, 0, '', 0, '');
  tableName: string = 'All Transactions';


  balance: number = 0;
  withdrawAmount: number = 0;
  depositAmount: number = 0;
  errorDisplay: string = '';
  depositError: string = '';

  recipient: string = '';
  transferAmount: number = 0;

  searchTerm: string = '';

  constructor(private dbService: DatabaseConnectionService) { }

  ngOnInit(): void {
    this.changeAllTransactionsbtnStyle();

    this.updateBalance();

    this.dbService.retrieveAccounts().subscribe((data) => {
      this.accountList = data;

      if (data.length) {
        this.accountList = data;
        this.activeAccount = data[0];
        this.dbService
          .retrieveTransactions()
          .subscribe((data) => {
            if (data.length) {
              this.transactionList = data.sort(this.sortTransactions);
              this.currentTransactionList = data;
            }
          });

          console.log(this.transactionList)
      }
    });
  }
  updateBalance() {
    this.dbService.getBalance().subscribe(data => {
      this.balance = data
    });
  }

  withdrawAmountOnChange(withdrawAmount: number) {
    this.withdrawAmount = parseFloat(withdrawAmount.toFixed(2));
    // this.dbService.withdraw(this.withdrawAmount).subscribe(data => {
    //   this.updateBalance();
    // })
  }

  depositAmountOnChange(deposit: number) {
    this.depositAmount = parseFloat(deposit.toFixed(2));    
  }

  transferAmountOnChange(amount: number) {
    this.transferAmount = parseFloat(amount.toFixed(2));    
  }

  accountOnChange(account: string){
    this.recipient = account;
  }

  updateActiveAccount(account: AccountModel) {
    this.activeAccount = account;
    this.dbService
      .retrieveTransactions()
      .subscribe((data) => {
        if (data.length) {
          this.transactionList = data.sort(this.sortTransactions);
          this.currentTransactionList = data.sort(this.sortTransactions);
        }
      });
  }

  updateTable = (table: TransactionModel[]) => {
    this.currentTransactionList = table;
  };

  updateAccountList = () => {
    this.dbService.retrieveAccounts().subscribe((data) => {
      this.accountList = data;
      if (data.length) {
        this.accountList = data;
        this.refreshActiveAccounts();
        this.updateActiveAccount(this.activeAccount);
        this.changeAllTransactionsbtnStyle();
      }
    });
  };

  refreshActiveAccounts = () => {
    let selectedAccount = this.accountList.find(
      (account) => account.account_number == this.activeAccount.account_number
    );
    if (selectedAccount) {
      this.activeAccount = selectedAccount;
    }
  };

  setExpenses() {
    document.getElementById("action-container")?.classList.add("hidden")
    this.tableName = 'Withdrawals';
    let debitList = this.transactionList.filter(
      (transaction: TransactionModel) => transaction.transactionType == 'Debit'
    );
    if (debitList.length) {
      this.currentTransactionList = debitList;
    }
  }

  updateSearchTerm(event: any) {
    this.searchTerm = event.target.value;
    this.search(this.searchTerm);
  }

  search(term: string) {
    document.getElementById("action-container")?.classList.add("hidden")
    this.tableName = `Searching for: ${this.searchTerm}`;
    let debitList = this.transactionList.filter(
      (transaction: TransactionModel) => transaction.transactionId.includes(this.searchTerm.toLocaleLowerCase())
    );

    this.currentTransactionList = debitList;

  }

  setDeposits() {
    document.getElementById("action-container")?.classList.add("hidden")
    this.tableName = 'Deposits';
    let creditList = this.transactionList.filter(
      (transaction: TransactionModel) => transaction.transactionType == 'Credit'
    );
    if (creditList.length) {
      this.currentTransactionList = creditList;
    }
  }

  setAllTransactions() {
    document.getElementById("action-container")?.classList.add("hidden")
    this.tableName = 'All Transactions';
    this.currentTransactionList = this.transactionList;
  }

  changeAllTransactionsbtnStyle() {
  }

  changeExpensesbtnStyle() {
  }

  changeDepositsbtnStyle() {
  }

  // action-container

  displayDeposit() {
    document.getElementById("action-container")?.classList.remove("hidden")
    document.getElementById("deposit-container")?.classList.remove("hidden")
    document.getElementById("withdraw-container")?.classList.add("hidden")
    document.getElementById("transfer-container")?.classList.add("hidden")
  }


  displayWithdraw() {
    document.getElementById("action-container")?.classList.remove("hidden")
    document.getElementById("deposit-container")?.classList.add("hidden")
    document.getElementById("withdraw-container")?.classList.remove("hidden")
    document.getElementById("transfer-container")?.classList.add("hidden")
  }


  displayTransfer() {
    document.getElementById("action-container")?.classList.remove("hidden")
    document.getElementById("deposit-container")?.classList.add("hidden")
    document.getElementById("withdraw-container")?.classList.add("hidden")
    document.getElementById("transfer-container")?.classList.remove("hidden")
  }

  sortTransactions = (txA: TransactionModel, txB: TransactionModel) => {
    return txB.id - txA.id;
  };

  withdrawFunds() {
    this.dbService.withdraw(this.withdrawAmount).subscribe(data => {
      this.updateBalance();
      this.reloadTransactions();
    })
  }

  depositFunds() {
    this.dbService.deposit(this.depositAmount).subscribe(data => {
      this.updateBalance();
      this.reloadTransactions();
    })
  }

  transferFunds() {
    const transfer = new TransferModel(this.recipient, this.transferAmount);
    this.dbService.transfer(transfer).subscribe(data => {
      this.updateBalance();
      this.reloadTransactions();
    })
  }

  reloadTransactions(){
    this.dbService
    .retrieveTransactions()
    .subscribe((data) => {
      if (data.length) {
        this.transactionList = data.sort(this.sortTransactions);
        this.currentTransactionList = data.sort(this.sortTransactions);
      }
    });
  }
}
