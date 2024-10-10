import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditRepartidorPage } from './edit-repartidor.page';

describe('EditRepartidorPage', () => {
  let component: EditRepartidorPage;
  let fixture: ComponentFixture<EditRepartidorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRepartidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
