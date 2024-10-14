import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignarPedidoPage } from './asignar-pedido.page';

describe('AsignarPedidoPage', () => {
  let component: AsignarPedidoPage;
  let fixture: ComponentFixture<AsignarPedidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
