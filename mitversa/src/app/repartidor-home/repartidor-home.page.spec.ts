import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepartidorHomePage } from './repartidor-home.page';

describe('RepartidorHomePage', () => {
  let component: RepartidorHomePage;
  let fixture: ComponentFixture<RepartidorHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RepartidorHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
