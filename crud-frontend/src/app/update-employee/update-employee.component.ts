import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css',
})
export class UpdateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  id!: number;
  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getEmployeeById(this.id).subscribe(
      (data: Employee) => {
        this.employee = data;
      },
      (error) => console.error(error)
    );
  }

  onSubmit(): void {
    this.service.updateEmployee(this.id, this.employee).subscribe(
      (response) => {
        console.log(response);
        this.employee = new Employee();
        this.goBack();
      },
      (error) => console.error(error)
    );
  }

  goBack(): void {
    window.history.back();
  }
}
