import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GerenteHomePage } from './gerente-home.page';

describe('GerenteHomePage', () => {
  let component: GerenteHomePage;
  let fixture: ComponentFixture<GerenteHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenteHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
