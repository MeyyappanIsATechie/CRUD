import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private BASE_URL = 'http://localhost:8080/api/v1/employees';
  constructor(private httpClient: HttpClient) {}

  getEmployeesList(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.BASE_URL);
  }

  createEmployee(employee: Employee): Observable<Object> {
    return this.httpClient.post(this.BASE_URL, employee);
  }
}
