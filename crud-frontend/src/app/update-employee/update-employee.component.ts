import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.getEmployeeById(this.id).subscribe(
      (data: Employee) => {
        this.employee = data;
      },
      (error) => {
        console.error(error);
        this.toastr.error('Error retrieving employee data');
      }
    );
  }

  onSubmit(): void {
    this.service.updateEmployee(this.id, this.employee).subscribe(
      (response) => {
        console.log(response);
        this.employee = new Employee();
        alert('updated employee successfully');
        this.toastr.success('Employee updated successfully');
        this.goBack();
      },
      (error) => {
        console.error(error);
        this.toastr.error('Error updating employee');
      }
    );
  }

  goBack(): void {
    window.history.back();
  }
}
