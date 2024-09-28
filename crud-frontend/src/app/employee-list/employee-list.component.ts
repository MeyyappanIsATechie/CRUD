import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  employees!: Employee[];
  filteredEmployees: Employee[] = [];
  searchTerm!: string;

  constructor(
    private service: EmployeeService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getEmployees();
    this.activeRoute.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('search') || '';
      this.filterEmployees();
    });
  }

  filterEmployees(): void {
    if (this.searchTerm) {
      const lowerSearchTerm = this.searchTerm.toLowerCase();
      this.filteredEmployees = this.employees.filter((employee) =>
        (
          employee.firstName.toLowerCase() +
          ' ' +
          employee.lastName.toLowerCase()
        ).includes(lowerSearchTerm)
      );
    } else {
      // Reset if search term is cleared
      this.filteredEmployees = [...this.employees];
    }
  }

  getEmployees(): void {
    this.service.getEmployeesList().subscribe((employees) => {
      this.employees = employees; // Store the fetched employees
      this.filteredEmployees = [...this.employees]; // Initialize filteredEmployees
    });
  }

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
