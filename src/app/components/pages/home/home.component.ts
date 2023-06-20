import { Component, OnInit } from '@angular/core';
import {Inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  
  constructor(public dialogRef: MatDialog, private route: Router) {}

  ngOnInit(): void {
    console.log(sessionStorage.getItem("token"))
    if(sessionStorage.getItem("token") == undefined || sessionStorage.getItem("token") == null){
      this.route.navigate(["/"])
    }
  }
  changeViewState(){
    
  }
}
