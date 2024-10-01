import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees!: Employee[];
  filteredEmployees: Employee[] = [];
  dataSource!: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['firstName', 'lastName', 'emailId', 'actions'];

  // Pagination properties
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSize = 5; // Default page size
  pageSizeOptions: number[] = [5, 10, 20];

  constructor(
    private service: EmployeeService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.activeRoute.queryParamMap.subscribe((params) => {
      const searchTerm = params.get('search') || '';
      this.applyFilter(searchTerm);
    });
  }

  getEmployees(): void {
    this.service.getEmployeesList().subscribe((employees) => {
      this.employees = employees;
      this.dataSource = new MatTableDataSource(this.employees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Function to handle sorting and pagination
  changePage(): void {
    this.dataSource.paginator = this.paginator;
  }

  changePageSize(): void {
    this.paginator.pageSize = this.pageSize;
    this.changePage();
  }

  // Actions
  editEmployee(id: number): void {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number): void {
    this.service.deleteEmployee(id).subscribe(() => this.getEmployees());
  }

  viewEmployee(id: number): void {
    this.router.navigate(['employee-details', id]);
  }
}
