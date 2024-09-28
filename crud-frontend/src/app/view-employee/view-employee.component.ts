import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css',
})
export class ViewEmployeeComponent implements OnInit {
  id!: number;
  employee: Employee = new Employee();
  constructor(
    private route: ActivatedRoute,
    private service: EmployeeService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    // fetch employee data from the API using the employee id
    // this.employee = fetchEmployeeById(this.id);
    this.service.getEmployeeById(this.id).subscribe((employee: Employee) => {
      this.employee = employee;
    });
  }
}
