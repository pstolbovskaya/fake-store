import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCountryDropdown } from './app-country-dropdown';

describe('AppCountryDropdown', () => {
  let component: AppCountryDropdown;
  let fixture: ComponentFixture<AppCountryDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCountryDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCountryDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
