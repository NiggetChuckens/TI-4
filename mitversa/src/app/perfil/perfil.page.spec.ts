import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { perfilPage } from './perfil.page';

describe('perfilPage', () => {
  let component: perfilPage;
  let fixture: ComponentFixture<perfilPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [perfilPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(perfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
