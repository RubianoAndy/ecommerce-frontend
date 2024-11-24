import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountriesService } from '../../../shared/services/countries/countries.service';
import { passwordValidator } from '../../../shared/validators/password.validator';

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
  form1!: FormGroup;
  form2!: FormGroup;
  form3!: FormGroup;

  isAccordionForm1Open: boolean = true;
  isAccordionForm2Open: boolean = false;
  isAccordionForm3Open: boolean = false;

  isCurrentPasswordVisible: boolean = false;
  isNewPasswordVisible: boolean = false;

  isCurrentPasswordFocused: boolean = false;
  isNewPasswordFocused: boolean = false;

  currentPasswordCriteria = {
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
    hasNumber: false,
    isValidLength: false
  };

  newPasswordCriteria = {
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
    hasNumber: false,
    isValidLength: false
  };

  loading: boolean = false;

  prefixOptions: any[] = [];
  countriesOptions: any[] = [];

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
    this.createForm1();
    this.createForm2();
    this.createForm3();
  }

  createForm1(data: any = null) {
    this.form1 = this.formBuilder.group({
      name_1: [data?.name_1 || '', [ Validators.required, Validators.minLength(2), Validators.maxLength(20) ]],
      name_2: [data?.name_2 || '', [ Validators.minLength(2), Validators.maxLength(20) ]],
      lastname_1: [data?.lastname_1 || '', [ Validators.required, Validators.minLength(2), Validators.maxLength(20) ]],
      lastname_2: [data?.lastname_2 || '', [ Validators.minLength(2), Validators.maxLength(20) ]],
      dniType: [data?.dniType || '', [ Validators.required, Validators.minLength(2) ]],
      dni: [data?.dni || '', [ Validators.required, Validators.minLength(2), Validators.maxLength(30) ]],
      email: [data?.email || '', [ Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.email ]],

      prefix: [data?.prefix || '', [ Validators.required, Validators.minLength(2) ]],
      mobile: [data?.mobile || '', [ Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('^[0-9]*$') ]],
    });
  }

  createForm2(data: any = null) {
    this.form2 = this.formBuilder.group({
      currentPassword: [data?.currentPassword || '', [ Validators.required, passwordValidator() ]],
      newPassword: [data?.newPassword || '', [ Validators.required, passwordValidator() ]],
    });
  }

  createForm3(data: any = null) {
    this.form3 = this.formBuilder.group({
      countryId: [data?.countryId || '', [ Validators.required, Validators.minLength(2) ]],
      departmentId: [data?.departmentId || '', [ Validators.required, Validators.minLength(2) ]],
      city: [data?.city || '', [ Validators.required, Validators.minLength(5), Validators.maxLength(50) ]],
      zipCode: [data?.zipCode || '', [ Validators.required, Validators.minLength(5), Validators.maxLength(8), Validators.pattern('^[0-9]*$') ]],
      address: [data?.address || '', [ Validators.required, Validators.minLength(5), Validators.maxLength(80) ]],
      addressObservations: [data?.addressObservations || '', [ Validators.required, Validators.minLength(5), Validators.maxLength(100) ]],
    });
  }

  onSubmitForm1() {

  }

  onSubmitForm2() {

  }

  onSubmitForm3() {

  }

  getCountries() {
    this.countriesService.getAllCountries().subscribe(
      response => {
        this.prefixOptions = response;
        this.countriesOptions = response;
      }
    );
  }

  togglePasswordVisibility(formName: string): void {
    const visibilityMap: any = {
      currentPassword: () => { this.isCurrentPasswordVisible = !this.isCurrentPasswordVisible; },
      newPassword: () => { this.isNewPasswordVisible = !this.isNewPasswordVisible; }
    };

    if (visibilityMap[formName])
      visibilityMap[formName]();
    // else
    //   console.warn(`No se puede mostrar contraseña para ${formName}`);
  }

  onPasswordFocus(formName: string): void {
    if (formName === 'currentPassword')
      this.isCurrentPasswordFocused = true;
    else if (formName === 'newPassword')
      this.isNewPasswordFocused = true;
  }

  onPasswordBlur(formName: string): void {
    if (formName === 'currentPassword')
      this.isCurrentPasswordFocused = false;
    else if (formName === 'newPassword')
      this.isNewPasswordFocused = false;
  }

  checkPasswordCriteria(password: string, formName: string): void {
    const criteria = {
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasNumber: /\d/.test(password),
      isValidLength: password.length >= 8 && password.length <= 20,
    };

    if (formName === 'currentPassword')
      this.currentPasswordCriteria = criteria;
    else if (formName === 'newPassword')
      this.newPasswordCriteria = criteria;
  }

  onCurrentPasswordChange(event: Event): void {
    const password = (event.target as HTMLInputElement).value;
    this.checkPasswordCriteria(password, 'currentPassword');
  }

  onNewPasswordChange(event: Event): void {
    const password = (event.target as HTMLInputElement).value;
    this.checkPasswordCriteria(password, 'newPassword');
  }

  toggleAccordion(form: string): void {
    const accordionSection: any = {
      form1: () => { this.isAccordionForm1Open = !this.isAccordionForm1Open; },
      form2: () => { this.isAccordionForm2Open = !this.isAccordionForm2Open; },
      form3: () => { this.isAccordionForm3Open = !this.isAccordionForm3Open; },
    };

    if (accordionSection[form])
      accordionSection[form]();
  }

  changeCountry() {
    alert('Sí cambió el país');
  }
}
