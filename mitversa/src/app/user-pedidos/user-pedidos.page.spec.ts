import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPedidosPage } from './user-pedidos.page';

describe('UserPedidosPage', () => {
  let component: UserPedidosPage;
  let fixture: ComponentFixture<UserPedidosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
