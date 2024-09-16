import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserHomePage } from './user-home.page';

describe('UserHomePage', () => {
  let component: UserHomePage;
  let fixture: ComponentFixture<UserHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
