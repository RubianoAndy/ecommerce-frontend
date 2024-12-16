import { Component } from '@angular/core';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ShippingInformationComponent } from './shipping-information/shipping-information.component';
import { NgClass } from '@angular/common';
import { ProfileService } from '../../services/profile/profile.service';
import { AlertService } from '../../../shared/services/alert/alert.service';

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
  isUploadAvatar: boolean = false;
  isDragOver: boolean = false;
  selectedFile: File | null = null;
  errorFileMessage: string = '';
  allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  maxSizeFile = 3 * 1024 * 1024;
  
  isAccordion1Open: boolean = false;
  isAccordion2Open: boolean = false;
  
  constructor (
    private profileService: ProfileService,
    private alertService: AlertService,
  ) { }

  toggleAccordion(form: string): void {
    const accordionSection: any = {
      accordion_1: () => { this.isAccordion1Open = !this.isAccordion1Open; },
      accordion_2: () => { this.isAccordion2Open = !this.isAccordion2Open; },
    };

    if (accordionSection[form])
      accordionSection[form]();
  }

  toggleProfilePhoto() {
    this.isUploadAvatar = !this.isUploadAvatar;
    this.errorFileMessage = '';
  }

  processFile(file: File) {
    this.errorFileMessage = '';
    
    if (!this.allowedTypes.includes(file.type)) {
      this.errorFileMessage = 'Solo se permiten archivos de imagen (PNG, JPEG, JPG, WEBP)';
      return;
    }

    if (file.size > this.maxSizeFile) {
      this.errorFileMessage = 'El archivo no debe superar los 3MB';
      return;
    }

    this.selectedFile = file;
    this.uploadFile();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file)
      this.processFile(file);
  }

  uploadFile() {
    var alertBody = null;

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('profileImage', this.selectedFile, this.selectedFile.name);

      this.profileService.uploadAvatar(formData).subscribe({
        next: (response) => {
          console.log('Imagen de perfil cargada exitosamente', response);

          // Actualizar la imagen de perfil en la interfaz
          this.toggleProfilePhoto();

          alertBody = {
            type: 'okay',
            title: '¡Felicidades!',
            message: response.message,
          };
  
          this.alertService.showAlert(alertBody);
        },
        error: (response) => {
          alertBody = {
            type: 'error',
            title: '¡Error!',
            message: response.message,
          };
  
          this.alertService.showAlert(alertBody);
        }
      })
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    
    let file = null;
    if (files && files?.length == 1) {
      file = files[0];
      if (file)
        this.processFile(file);
    } else if (files && files.length > 1) {
      this.errorFileMessage = 'Solo se permite subir un archivo';
      return;
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }
}
