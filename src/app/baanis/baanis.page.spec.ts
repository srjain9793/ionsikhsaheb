import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BaanisPage } from './baanis.page';

describe('BaanisPage', () => {
  let component: BaanisPage;
  let fixture: ComponentFixture<BaanisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaanisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BaanisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
