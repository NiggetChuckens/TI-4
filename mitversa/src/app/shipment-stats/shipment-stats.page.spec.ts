import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipmentStatsPage } from './shipment-stats.page';

describe('ShipmentStatsPage', () => {
  let component: ShipmentStatsPage;
  let fixture: ComponentFixture<ShipmentStatsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
