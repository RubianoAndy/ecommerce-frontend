import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountriesService } from '../../../../shared/services/countries/countries.service';
import { DepartmentsService } from '../../../../shared/services/departments/departments.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-shipping-information',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './shipping-information.component.html',
  styleUrl: './shipping-information.component.scss'
})
export class ShippingInformationComponent implements OnInit {
  form!: FormGroup;

  loading: boolean = false;

  countriesOptions: any[] = [];
  departmentsOptions: any[] = [];

  constructor (
    private formBuilder: FormBuilder,
    private countriesService: CountriesService,
    private departmentsService: DepartmentsService,
  ) {
    this.getCountries();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(data: any = null) {
    this.form = this.formBuilder.group({
      countryId: [data?.countryId || '', [ Validators.required, Validators.minLength(1) ]],
      departmentId: [data?.departmentId || '', [ Validators.required, Validators.minLength(1) ]],
      city: [data?.city || '', [ Validators.required, Validators.minLength(2), Validators.maxLength(50) ]],
      zipCode: [data?.zipCode || '', [ Validators.required, Validators.minLength(5), Validators.maxLength(8), Validators.pattern('^[0-9]*$') ]],
      address: [data?.address || '', [ Validators.required, Validators.minLength(5), Validators.maxLength(80) ]],
      observations: [data?.observations || '', [ Validators.minLength(5), Validators.maxLength(500) ]],
    });
  }

  onSubmitForm() {

  }

  getCountries() {
    this.countriesService.getCountries().subscribe(
      response => {
        this.countriesOptions = response;
      }
    );
  }

  getDepartments(countryId:string) {
    this.departmentsService.getDepartments(countryId).subscribe(response => this.departmentsOptions = response);
  }

  changeCountry() {
    const countryIdSelected = this.form.get('countryId')?.value;
    this.getDepartments(countryIdSelected);
    this.form.get('departmentId')?.setValue('');
  }
}
