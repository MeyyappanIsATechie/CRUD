import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  employees!: Employee[];

  constructor(private service: EmployeeService, private router: Router) {}
  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.service
      .getEmployeesList()
      .subscribe((employees) => (this.employees = employees));
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
