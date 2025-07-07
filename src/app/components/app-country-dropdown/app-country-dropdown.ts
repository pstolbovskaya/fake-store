import {Component, ElementRef, HostListener, inject, signal, WritableSignal} from '@angular/core';
import {Country, CountryService} from '../../pages/products-page/services/country.service';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-country-dropdown',
  imports:[
    CommonModule,
    ReactiveFormsModule, // Важно для FormControl
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  templateUrl: './app-country-dropdown.html',
  styleUrl: './app-country-dropdown.css'
})
export class CountryDropdownComponent {
  public countryControl = new FormControl('');
  public isDropdownVisible: boolean = false;
  private countryService: CountryService = inject(CountryService);
  private elementRef: ElementRef = inject(ElementRef);
  public filteredCountries: Country[] = this.countryService.getCountries();

  private filter(value: string): Country[] {
    const filterValue = value.toLowerCase();

    return this.countryService.getCountries().filter(country =>
      country.nameKey.toLowerCase().includes(filterValue)
    );
  }

  selectCountry(country: Country): void {
    this.countryControl.setValue(country.nameKey);
    this.isDropdownVisible = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownVisible = false;
    }
  }
}
