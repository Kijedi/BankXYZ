import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountsViewComponent } from './transactions.component';

describe('UserAccountsViewComponent', () => {
  let component: UserAccountsViewComponent;
  let fixture: ComponentFixture<UserAccountsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccountsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAccountsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
