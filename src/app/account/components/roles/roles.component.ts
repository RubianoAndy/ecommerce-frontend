import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles/roles.service';

@Component({
  selector: 'app-roles',
  imports: [
    DatePipe,
    NgClass,
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export default class RolesComponent implements OnInit {
  tableFileds: string[] = ['Id', 'Rol', 'Fecha de creación', 'Fecha de actualización', 'Acciones'];
  rolesRecords: any[] = [];

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

  constructor (
    private rolesService: RolesService,
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles () {
    this.rolesService.getRoles(this.page, this.pageSize, this.filters).subscribe({
      next: (response) => {
        this.rolesRecords = response.roles;
        this.page = response.page;
        this.pageSize = response.pageSize;
        this.totalPages = response.totalPages;
        this.totalRecords = response.totalRoles;

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
      this.getRoles();
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.getRoles();
    }
  }
  
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getRoles();
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

  openDeleteModal(userId: any) {
    // this.userSelected = userId;
    this.deleteModal = true;
  }

  closeDeleteModal() {
    // this.userSelected = null;
    this.deleteModal = false;
  }
}
