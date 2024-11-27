import { NgClass } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { CountriesService } from '../../../../shared/services/countries/countries.service';
import { ProfileService } from '../../../services/profile/profile.service';
import { passwordValidator } from '../../../../shared/validators/password.validator';
import { RolesService } from '../../../services/roles/roles.service';

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
  // roleId: number,
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
  userId = input<any>();

  edit!: Profile;
  
  form!: FormGroup;

  isPasswordVisible: boolean = false;
  isPasswordFocused: boolean = false;

  passwordCriteria = {
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
    hasNumber: false,
    isValidLength: false
  };

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
  rolesOptions: any[] = [];

  constructor (
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private profileService: ProfileService,
    private countriesService: CountriesService,
    private rolesService: RolesService,
  ) {
    this.getCountries();
  }

  ngOnInit(): void {
    this.createForm();

    if (this.userId() == null)
      this.getProfile();
    else if (this.userId() > 0){
      this.getRoles();
      this.getProfileFromSuperAdmin();
    } else if (this.userId() == 0)
      this.getRoles();
    
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

      password: [data?.password || '', (this.userId() == 0 ) ? [ Validators.required, passwordValidator() ] : [ ]],
      roleId: [data?.roleId || '', (this.userId() >= 0 ) ? [ Validators.required, Validators.minLength(1) ] : []],
    });
  }

  onSubmitForm() {
    var body = this.form.value;

    body.name_2 = (body.name_2 == '') ? null : body.name_2;
    body.lastname_2 = (body.lastname_2 == '') ? null : body.lastname_2;

    if (this.form.valid && body) {
      if (this.userId() == null)
        this.updateProfile(body);
      else if (this.userId() > 0)
        this.updateProfileFromSuperAdmin(body);
      else if (this.userId() == 0)
        console.log('Petición de crear formulario');
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

  updateProfile(body: any) {
    this.profileService.updateProfile(body).subscribe({
      next: () => {
        this.getProfile();
      }
    })
  }

  getProfileFromSuperAdmin() {
    this.profileService.get(this.userId()).subscribe({
      next: (response: Profile) => {
        this.edit = {
          ...response,
          dniType: response.dniType === null ? '' : response.dniType,
          prefix: response.prefix === null ? '' : response.prefix,
        };
        this.form.patchValue(this.edit)
      }
    });
  }

  updateProfileFromSuperAdmin(body: any) {
    this.profileService.update(this.userId(), body).subscribe({
      next: () => {
        this.getProfileFromSuperAdmin();
      }
    })
  }

  getCountries() {
    this.countriesService.getCountries().subscribe(
      response => {
        this.prefixOptions = response;
      }
    );
  }

  getRoles() {
    this.rolesService.getRolesSmall().subscribe(
      response => {
        this.rolesOptions = response;
      }
    );
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onPasswordFocus(): void {
    this.isPasswordFocused = true;
  }

  onPasswordBlur(): void {
    this.isPasswordFocused = false;
  }

  checkPasswordCriteria(password: string): void {
    const criteria = {
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasNumber: /\d/.test(password),
      isValidLength: password.length >= 8 && password.length <= 20,
    };

    this.passwordCriteria = criteria;
  }

  onPasswordChange(event: Event): void {
    const password = (event.target as HTMLInputElement).value;
    this.checkPasswordCriteria(password);
  }
}
