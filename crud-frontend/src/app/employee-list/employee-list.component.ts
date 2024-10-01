import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';

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

  firstNameFilter: string = '';
  lastNameFilter: string = '';
  emailFilter: string = '';

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
    // this.activeRoute.queryParamMap.subscribe((params) => {
    //   const searchTerm = params.get('search') || '';
    //   this.applyFilter(searchTerm);
    // });
  }

  getEmployees(): void {
    this.service.getEmployeesList().subscribe((employees) => {
      this.employees = employees;
      this.dataSource = new MatTableDataSource(this.employees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(): void {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
    this.dataSource.filterPredicate = (data: Employee, filter: string) => {
      const matchFilter = [];
      const filters = filter.split('|');
      const firstNameMatch = filters[0]
        ? data.firstName.toLowerCase().includes(filters[0])
        : true;
      const lastNameMatch = filters[1]
        ? data.lastName.toLowerCase().includes(filters[1])
        : true;
      const emailMatch = filters[2]
        ? data.emailId.toLowerCase().includes(filters[2])
        : true;

      return firstNameMatch && lastNameMatch && emailMatch;
    };

    this.dataSource.filter = `${this.firstNameFilter}|${this.lastNameFilter}|${this.emailFilter}`;

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

  // Export to Excel
  exportAsXLSX(): void {
    const data = this.dataSource.filteredData.map((emp, i) => ({
      'Sl.No': i + 1,
      'First Name': emp.firstName,
      'Last Name': emp.lastName,
      'Email ID': emp.emailId,
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
    XLSX.writeFile(workbook, 'employees.xlsx');
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
