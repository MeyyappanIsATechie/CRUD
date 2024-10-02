import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css',
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  constructor(
    private service: EmployeeService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}

  saveEmployee() {
    this.service.createEmployee(this.employee).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success('Employee created successfully');
        this.gotToEmployeeList();
      },
      (error) => {
        console.log(error);
        this.toastr.error('Failed to create employee');
      }
    );
  }

  gotToEmployeeList() {
    this.router.navigate(['/employees']); // Redirect to employee list page after creating a new employee.  Replace '/employees' with the actual route path to your employee list page.  This assumes you have a routing setup for the employee list page.  If not, you would need to add a route to the 'app-routing.module.ts' file.  For example: { path: 'employees', component: EmployeeListComponent }.  Replace 'EmployeeListComponent' with the actual component name for your employee list page.  This assumes you have a 'EmployeeListComponent' defined in your 'app.module.ts' file.  If not, you would need to import the EmployeeListComponent and add it to the declarations array in the 'app.module.ts' file.  For example: declarations: [AppComponent, EmployeeListComponent].  This assumes you have a 'EmployeeListComponent' defined in your 'app.component.ts' file
  }

  onSubmit() {
    console.log(this.employee);
    // Call the API to create the employee here
    // Assuming the API endpoint is '/api/employees'
    // this.http.post<Employee>('/api/employees', this.employee).subscribe((data) => {
    //   console.log(data);
    // });
    alert('Employee created successfully');
    this.saveEmployee(); // Redirect to employee list page after creating a new employee.  Replace '/employees' with the actual route path to your employee list page.  This assumes you have a routing setup for the employee list page.  If not, you would need to add a route to the 'app-routing.module.ts' file.  For example: { path: 'employees', component: EmployeeListComponent }.  Replace 'EmployeeListComponent' with the actual component
    this.employee = new Employee(); // Clear the form after successful creation
  }
}
