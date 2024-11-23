import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountriesService } from '../../../shared/services/countries/countries.service';

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export default class ProfileComponent implements OnInit {
  form!: FormGroup;

  loading: boolean = false;

  prefixOptions: any[] = []

  dniOptions = [
    { label: 'Cédula de ciudadanía (DNI)', value: 'Cédula de ciudadanía (DNI)' },
    { label: 'Cédula de extranjería', value: 'Cédula de extranjería' },
    { label: 'Tarjeta de identidad', value: 'Tarjeta de identidad' },
    { label: 'Tarjeta profesional', value: 'Tarjeta profesional' },
    { label: 'Permiso de Protección Temporal', value: 'Permiso de Protección Temporal' },
    { label: 'Identificación diplomática', value: 'Identificación diplomática' },
    { label: 'Pasaporte', value: 'Pasaporte' },
    { label: 'Otro', value: 'Otro' },
  ];

  constructor (
    private formBuilder: FormBuilder,
    private countriesService: CountriesService,
  ) {
    this.getCountries()
  }
  ngOnInit(): void {
    this.createForm();
  }

  createForm(data: any = null) {
    this.form = this.formBuilder.group({
      name_1: [data?.name_1 || '', [ Validators.required, Validators.minLength(2), Validators.maxLength(20) ]],
      name_2: [data?.name_2 || '', [ Validators.minLength(2), Validators.maxLength(20) ]],
      lastname_1: [data?.lastname_1 || '', [ Validators.required, Validators.minLength(2), Validators.maxLength(20) ]],
      lastname_2: [data?.lastname_2 || '', [ Validators.minLength(2), Validators.maxLength(20) ]],
      dniType: [data?.dniType || '', [ Validators.required, Validators.minLength(2) ]],
      dni: [data?.dni || '', [ Validators.required, Validators.minLength(2), Validators.maxLength(30) ]],
      email: [data?.email || '', [ Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.email ]],

      prefix: [data?.prefix || '', [ Validators.required, Validators.minLength(2) ]],
    });
  }

  onSubmit() {

  }

  getCountries() {
    this.countriesService.getAllCountries().subscribe(
      response => this.prefixOptions = response
    );
  }
}
