import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRatesComponent } from './header-rates.component';

describe('HeaderRatesComponent', () => {
  let component: HeaderRatesComponent;
  let fixture: ComponentFixture<HeaderRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderRatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
