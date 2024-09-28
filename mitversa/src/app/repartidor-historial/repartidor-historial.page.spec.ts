import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepartidorHistorialPage } from './repartidor-historial.page';

describe('RepartidorHistorialPage', () => {
  let component: RepartidorHistorialPage;
  let fixture: ComponentFixture<RepartidorHistorialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RepartidorHistorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
