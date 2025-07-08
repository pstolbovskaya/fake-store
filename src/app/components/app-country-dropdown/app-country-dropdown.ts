import {Component, computed, ElementRef, HostListener, inject, signal, WritableSignal} from '@angular/core';
import {Country, CountryService} from '../../pages/products-page/services/country.service';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {TranslatePipe} from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-country-dropdown',
  imports: [
    CommonModule,
    ReactiveFormsModule, // Важно для FormControl
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    TranslatePipe,
    TranslateModule,
    FormsModule
  ],
  templateUrl: './app-country-dropdown.html',
  styleUrl: './app-country-dropdown.css'
})
export class CountryDropdownComponent {
  public countryControl = new FormControl('');
  public isDropdownVisible: boolean = false;
  private countryService: CountryService = inject(CountryService);
  private elementRef: ElementRef = inject(ElementRef);
  private countries: Country[] = this.countryService.getCountries();
  public selectedLanguage: string = 'en';
  private translateService: TranslateService = inject(TranslateService);

  public filterValue = signal<string>('');
  public filteredCountries = computed(() => {
    const filter = this.filterValue().toLowerCase();
    if (!filter) {
      return this.countries; // Показываем все страны, если поле пустое
    }
    return this.countries.filter(country =>
      country.nameKey.toLowerCase().includes(filter)
    );
  });

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

  onLanguageChange() {
      this.translateService.use(this.selectedLanguage)
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value !== this.filterValue()) {
      console.log(input.value);
      this.filterValue.set(input.value);
    }
  }
}
