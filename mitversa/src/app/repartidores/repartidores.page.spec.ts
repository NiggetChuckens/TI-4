import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepartidoresPage } from './repartidores.page';

describe('RepartidoresPage', () => {
  let component: RepartidoresPage;
  let fixture: ComponentFixture<RepartidoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RepartidoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
