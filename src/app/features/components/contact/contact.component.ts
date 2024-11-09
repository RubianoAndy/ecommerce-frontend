import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AlertService } from '../../../shared/services/alert/alert.service';
import { NgClass } from '@angular/common';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export default class ContactComponent implements OnInit {
  form!: FormGroup;
  email = environment.email;

  constructor (
    private formBuilder: FormBuilder,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(data: any = null) {
    this.form = this.formBuilder.group({
      name: [data?.name || '', [ Validators.required, Validators.minLength(6), Validators.maxLength(80) ]],
      email: [data?.email || '', [ Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.email ]],
      subject: [data?.subject || '', [ Validators.required, Validators.minLength(6), Validators.maxLength(50) ]],
      message: [data?.message || '', [ Validators.required, Validators.minLength(20), Validators.maxLength(1000) ]],
    });
  }

  onSubmit() {
    var body = {
      name: this.toCapitalizeCase(this.form.value.name),
      email: this.form.value.email.toLowerCase(),
      subject: this.form.value.subject,
      message: this.form.value.message,
    }

    if (this.form.valid && body)
      this.sendContactForm(body);

  }

  sendContactForm (body: any) {

  }

  private toCapitalizeCase (text:string): string {
    if (!text)
      return text;

    return text
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
