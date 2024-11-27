import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { DatePipe, NgClass } from '@angular/common';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { RolesService } from '../../services/roles/roles.service';

@Component({
    selector: 'app-users',
    imports: [
        FormsModule,
        DatePipe,
        NgClass,
    ],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export default class UsersComponent implements OnInit {
  avatar = 'assets/images/avatar/Avatar.png';

  roles: any[] = [];

  tableFileds: string[] = ['Nombre', 'Email', 'Rol', 'Estado', 'Fecha de creación', 'Acciones'];
  usersRecords: any[] = [];

  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  totalRecords: number = 0;
  
  filters: any[] = [];

  startRecord: number = 0;
  endRecord: number = 0;

  maxPageNumbers: number = 5;
  startPage: number = 0;
  endPage: number = 0;

  deleteModal: boolean = false;

  userSelected = null;

  activatedOptions = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false },
  ]

  constructor (
    private usersService: UsersService,
    private alertService: AlertService,
    private rolesService: RolesService,
  ) {
    this.getRoles();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  updateFilters(fieldName: string, event: Event) {
    const target = event.target as HTMLInputElement; // Asegura que el target es un HTMLInputElement
    const value = target.value;

    if (!value)
      this.filters = this.filters.filter(filter => filter.field !== fieldName);
    else {
      const index = this.filters.findIndex(filter => filter.field === fieldName);
      
      if (index > -1)
        this.filters[index].value = value;
      else
        this.filters.push({ field: fieldName, value });
    }

    this.getUsers();
  }

  getUsers () {
    this.usersService.getUsers(this.page, this.pageSize, this.filters).subscribe({
      next: (response) => {
        this.usersRecords = response.users;
        this.page = response.page;
        this.pageSize = response.pageSize;
        this.totalPages = response.totalPages;
        this.totalRecords = response.totalUsers;

        this.startRecord = (this.page - 1) * this.pageSize + 1;
        this.endRecord = Math.min(this.page * this.pageSize, this.totalRecords);

        this.calculatePageRange();
      },
      error: () => {
      }
    });
  }

  changePage(pageNumber: number) {
    if (pageNumber > 0 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.getUsers();
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.getUsers();
    }
  }
  
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getUsers();
    }
  }

  calculatePageRange() {
    if (this.totalPages <= this.maxPageNumbers) {
      this.startPage = 1;
      this.endPage = this.totalPages;
    } else {
      let half = Math.floor(this.maxPageNumbers / 2);
      
      if (this.page <= half) {
        this.startPage = 1;
        this.endPage = this.maxPageNumbers;
      } else if (this.page + half >= this.totalPages) {
        this.startPage = this.totalPages - this.maxPageNumbers + 1;
        this.endPage = this.totalPages;
      } else {
        this.startPage = this.page - half;
        this.endPage = this.page + half;
      }
    }
  }

  changeStatus(user: any) {
    var alertBody = null;

    var body = {
      userId: user.id,
      activated: user.activated,
    };

    this.usersService.changeStatus(body).subscribe({
      next: (response) => {
        alertBody = {
          type: 'okay',
          title: '¡Felicidades!',
          message: response.message,
        };

        this.getUsers();

        this.alertService.showAlert(alertBody);
      },
      error: (response) => {
        alertBody = {
          type: 'error',
          title: '¡Error!',
          message: response.message,
        };

        this.getUsers();

        this.alertService.showAlert(alertBody);
      }
    });
  }

  async getRoles() {
    var alertBody = null;

    await this.rolesService.getRolesSmall().subscribe({
      next: (response) => {
        this.roles = response;
      },

      error: (response) => {
        alertBody = {
          type: 'error',
          title: '¡Error!',
          message: response.message,
        };

        this.alertService.showAlert(alertBody);
      }
    });
  }

  /* openDeleteModal(userId: any) {
    this.userSelected = userId;
    this.deleteModal = true;
  }

  closeDeleteModal() {
    this.userSelected = null;
    this.deleteModal = false;
  } */

  /* deleteUser() {
    var alertBody = null;

    this.usersService.delete(this.userSelected).subscribe({
      next: (response: any) => {
        alertBody = {
          type: 'okay',
          title: '¡Listo!',
          message: response.message,
        };

        this.closeDeleteModal();
        this.getUsers();

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
    });

    this.getUsers();
  } */
}
