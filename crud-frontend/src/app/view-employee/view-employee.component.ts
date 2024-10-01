import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { jsPDF } from 'jspdf';

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

  exportAsPDF(): void {
    const doc = new jsPDF();
    doc.text('Employee Details', 10, 10);
    doc.text(`First Name: ${this.employee.firstName}`, 10, 20);
    doc.text(`Last Name: ${this.employee.lastName}`, 10, 30);
    doc.text(`Email: ${this.employee.emailId}`, 10, 40);
    const fileName = `${this.employee.firstName}_${this.employee.lastName}_details.pdf`;
    doc.save(fileName);
  }
}
