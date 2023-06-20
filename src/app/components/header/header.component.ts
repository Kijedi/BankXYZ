import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class HeaderComponent implements OnInit {
  
  bankName:string = "XYZ Bank";
  isLoggedIn: boolean = false;
  
  constructor(private route: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.isLoggedIn = true;
    }
  }

  logout(){
    this.isLoggedIn = false;
    sessionStorage.clear();
    this.route.navigate(["/"])

  }

}
