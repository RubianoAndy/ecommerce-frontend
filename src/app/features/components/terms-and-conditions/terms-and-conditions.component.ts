import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TermsAndConditionsInformationComponent } from './terms-and-conditions-information/terms-and-conditions-information.component';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [
    HeaderComponent,
    TermsAndConditionsInformationComponent,
  ],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss'
})
export default class TermsAndConditionsComponent {

}
