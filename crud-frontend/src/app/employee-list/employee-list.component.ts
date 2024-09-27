import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  employees!: Employee[];

  constructor(private service: EmployeeService) {}
  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.service
      .getEmployeesList()
      .subscribe((employees) => (this.employees = employees));
  }
}
