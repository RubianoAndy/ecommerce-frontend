import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { PrivacyPolicyInformationComponent } from './privacy-policy-information/privacy-policy-information.component';
import { FooterComponent } from "../../../shared/components/footer/footer.component";

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [
    HeaderComponent,
    PrivacyPolicyInformationComponent,
    FooterComponent,
],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export default class PrivacyPolicyComponent {

}
