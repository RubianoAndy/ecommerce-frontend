import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountryService } from '../../services/country/country.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-select-countries',
  imports: [
    NgClass,
  ],
  templateUrl: './select-countries.component.html',
  styleUrl: './select-countries.component.scss'
})
export class SelectCountriesComponent implements OnInit {
  @Input() selectedCountryId: number | null = null;
  @Output() countrySelected = new EventEmitter<number>();

  countryForm!: FormGroup;
  countries: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
  ) { }

  ngOnInit(): void {
    this.countryForm = this.formBuilder.group({
      country: ['']
    });

    this.getCountries();
  }

  getCountries() {
    this.countryService.getAllCountries().subscribe({
      next: (response) => {
        this.countries = response;

        if (this.selectedCountryId)
          this.countryForm.patchValue({ country: this.selectedCountryId });
      }
    });
  }

  onCountrySelected(event: any) {
    this.countrySelected.emit(event);
  }
}
