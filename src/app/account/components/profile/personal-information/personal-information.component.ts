import { Component, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountriesService } from '../../../../shared/services/countries/countries.service';
import { NgClass } from '@angular/common';
import { ProfileService } from '../../../services/profile/profile.service';

interface Profile {
  id: number,
  name_1: string,
  name_2: string,
  lastname_1: string,
  lastname_2: string,
  dniType: string,
  dni: string,
  prefix: string,
  mobile: string,
  email: string,
  roleId: number,
}

@Component({
  selector: 'app-personal-information',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss'
})
export class PersonalInformationComponent implements OnInit {
  id = input<any>();

  edit!: Profile;
  
  form!: FormGroup;

  loading: boolean = false;

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

  disabledFields = [
    'name_1',
    'name_2',
    'lastname_1',
    'lastname_2',
    'dniType',
    'dni',
    'email',
  ];

  prefixOptions: any[] = [];

  constructor (
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private countriesService: CountriesService,
  ) {
    this.getCountries();
  }

  ngOnInit(): void {
    this.createForm();

    if (this.id() > 0)
      console.log('Petición para traer la información de un candidato ya creado y llenar el formulario'); // Acá va la petición para traer el formulario si id > 0
    else
      this.getProfile();
  }

  createForm(data: any = null) {
    this.form = this.formBuilder.group({
      name_1: [data?.name_1 || '', [ Validators.required, Validators.minLength(2), Validators.maxLength(20) ]],
      name_2: [data?.name_2 || '', [ Validators.minLength(2), Validators.maxLength(20) ]],
      lastname_1: [data?.lastname_1 || '', [ Validators.required, Validators.minLength(2), Validators.maxLength(20) ]],
      lastname_2: [data?.lastname_2 || '', [ Validators.minLength(2), Validators.maxLength(20) ]],
      dniType: [data?.dniType || '', [ Validators.required, Validators.minLength(2) ]],
      dni: [data?.dni || '', [ Validators.required, Validators.minLength(5), Validators.maxLength(30) ]],
      email: [data?.email || '', [ Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.email ]],

      prefix: [data?.prefix || '', [ Validators.required, Validators.minLength(1) ]],
      mobile: [data?.mobile || '', [ Validators.required, Validators.minLength(7), Validators.maxLength(30), Validators.pattern('^[0-9]*$') ]],
    });
  }

  onSubmitForm() {
    var body = this.form.value;

    if (this.form.valid && body) {
      if (this.id() == 0)
        console.log('Petición de crear formulario');
      else if (this.id() > 0)
        console.log('Petición de editar formulario');
      else
        console.log('Petición de editar formulario usando token del interceptor, se considera que lo hace desde la parte del menú perfil');
    }
  }

  getProfile() {
    this.profileService.getProfile().subscribe({
      next: (response: Profile) => {
        this.edit = {
          ...response,
          dniType: response.dniType === null ? '' : response.dniType,
          prefix: response.prefix === null ? '' : response.prefix,
        };
        this.form.patchValue(this.edit);

        this.disabledFields.forEach(field => {
          const formField = this.form.get(field);
          if (formField && formField.value)
            formField.disable();
        });
      }
    });
  }

  getCountries() {
    this.countriesService.getCountries().subscribe(
      response => {
        this.prefixOptions = response;
      }
    );
  }
}
