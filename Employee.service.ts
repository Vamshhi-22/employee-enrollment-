import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeDetails } from './employee.module';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8090'; // Your API endpoint URL here

  constructor(private http: HttpClient) {}

  getEmployeeById(id: number): Observable<any> {
    const url = `${this.apiUrl}/get/${id}`;
    return this.http.get(url);
  }
  getEmployees(): Observable<EmployeeDetails[]> {
    return this.http.get<EmployeeDetails[]>(this.apiUrl + '/get');
  }
  addEmployee(employeeData: any): Observable<any> {
    const url = `${this.apiUrl}/add`;
    return this.http.post(url, employeeData);
  }
  editEmployee(employee: EmployeeDetails): Observable<any> {
    const url = `${this.apiUrl}/edit`;
    return this.http.patch(url, employee);
  }
  // Delete an employee by employeeId through the API
  deleteEmployee(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/delete/${employeeId}`;
    return this.http.delete(url);
  }
}
