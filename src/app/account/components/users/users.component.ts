import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../features/services/users/users.service';
import { DatePipe } from '@angular/common';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export default class UsersComponent implements OnInit {
  tableFileds: string[] = ['Id', 'Nombre', 'Email', 'Rol', 'Estado', 'Fecha de creación', 'Acciones'];
  usersRecords: any[] = [];

  page = 1;
  pageSize = 10;
  totalPages = 1;
  totalRecords = 0;
  
  filters = [];

  startRecord = 0;
  endRecord = 0;

  constructor (
    private usersService: UsersService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers () {
    var alertBody = null;

    this.usersService.getUsers(this.page + 1, this.pageSize, this.filters).subscribe({
      next: (response) => {
        this.usersRecords = response.users;
        this.page = response.page;
        this.pageSize = response.pageSize;
        this.totalPages = response.totalPages;
        this.totalRecords = response.totalUsers;

        this.startRecord = (this.page - 1) * this.pageSize + 1;
        this.endRecord = Math.min(this.page * this.pageSize, this.totalRecords);
        
        alertBody = {
          type: 'okay',
          title: '¡Felicidades!',
          message: response.message,
        }

        this.alertService.showAlert(alertBody);
      },
      error: (response) => {
        alertBody = {
          type: 'error',
          title: '¡Error!',
          message: response.error.message,
        }

        this.alertService.showAlert(alertBody);
      }
    })
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
}
