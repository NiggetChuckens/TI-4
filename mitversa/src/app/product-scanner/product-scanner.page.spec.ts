import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductScannerPage } from './product-scanner.page';

describe('ProductScannerPage', () => {
  let component: ProductScannerPage;
  let fixture: ComponentFixture<ProductScannerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductScannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
