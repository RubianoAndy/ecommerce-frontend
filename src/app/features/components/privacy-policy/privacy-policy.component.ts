import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { PrivacyPolicyInformationComponent } from './privacy-policy-information/privacy-policy-information.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [
    HeaderComponent,
    PrivacyPolicyInformationComponent,
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export default class PrivacyPolicyComponent {

}
