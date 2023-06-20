import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  registerState: boolean = false;

  constructor() {}

  ngOnInit(): void {
    sessionStorage.clear();
  }

  toggleForms(boolState: boolean): void {
    this.registerState = boolState;
  }
}
