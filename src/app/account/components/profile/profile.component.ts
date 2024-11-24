import { Component } from '@angular/core';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ShippingInformationComponent } from './shipping-information/shipping-information.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    PersonalInformationComponent,
    ChangePasswordComponent,
    ShippingInformationComponent,
    NgClass,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export default class ProfileComponent {
  isAccordionForm1Open: boolean = true;
  isAccordionForm2Open: boolean = false;
  isAccordionForm3Open: boolean = false;
  
  constructor () { }

  toggleAccordion(form: string): void {
    const accordionSection: any = {
      form1: () => { this.isAccordionForm1Open = !this.isAccordionForm1Open; },
      form2: () => { this.isAccordionForm2Open = !this.isAccordionForm2Open; },
      form3: () => { this.isAccordionForm3Open = !this.isAccordionForm3Open; },
    };

    if (accordionSection[form])
      accordionSection[form]();
  }
}
