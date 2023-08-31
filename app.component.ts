import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { EmployeeService } from './Employee.service';
import { EmployeeDetails } from './employee.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  employeesDetails: EmployeeDetails[] = [];
  newEmployee = new EmployeeDetails();
  selectedPerson: EmployeeDetails | null = null;
  isAddUserModalOpen: boolean = false;
  displayDetailsDialog: boolean = false;
  formMode: string = 'ADD';
  updateEmployeeDetails = new EmployeeDetails();
  constructor(
    private employeeService: EmployeeService,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    this.getingEmployeeData();
  }

  getingEmployeeData() {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employeesDetails = data;

        console.log(this.employeesDetails);
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  onView(person: EmployeeDetails): void {
    this.getingEmployeeData();
    this.employeeService.getEmployeeById(person.id).subscribe(
      (data) => {
        this.selectedPerson = data;
        console.log(this.selectedPerson);
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
    this.displayDetailsDialog = true;
  }
  closeDetails() {
    this.displayDetailsDialog = false;
  }

  submitAddUser() {
    if (this.newEmployee.name != '') {
      this.employeeService.addEmployee(this.newEmployee).subscribe(
        (response) => {
          console.log('Employee added successfully', response);

          this.newEmployee = new EmployeeDetails(); // Clear the form fields

          // Manually remove the modal backdrop
          const modalBackdrop = document.querySelector('.modal-backdrop');
          if (modalBackdrop) {
            this.renderer.removeChild(document.body, modalBackdrop);
          }
        },
        (error) => {
          console.error('Error adding employee', error);
          // Handle error scenarios here
        }
      );
      this.isAddUserModalOpen = false;
      this.getingEmployeeData();
    } else {
      console.log('error');
    }
  }
  showAddDialog() {
    this.isAddUserModalOpen = true;
    this.formMode = 'ADD';
    this.newEmployee = new EmployeeDetails();
  }
  closeAddUserModal() {
    this.isAddUserModalOpen = false;
    this.newEmployee = new EmployeeDetails();
  }
  updateView(person: EmployeeDetails) {
    this.newEmployee = { ...person };
    this.isAddUserModalOpen = true;
    this.formMode = 'update';
  }
  updateUserdetails(editDetails: EmployeeDetails) {
    this.employeeService.editEmployee(editDetails).subscribe(
      (response) => {
        console.log('Employee edited successfully:', response);

        alert('Details are updated');
      },
      (error) => {
        console.error('Error editing employee:', error);
      }
    );
    this.getingEmployeeData();
  }
  updateUser() {
    this.updateEmployeeDetails = this.newEmployee;
    this.updateUserdetails(this.updateEmployeeDetails);

    this.isAddUserModalOpen = false;
    this.newEmployee = new EmployeeDetails();
  }
  deleteEmployee(employee: EmployeeDetails) {
    this.isAddUserModalOpen = true;
    this.newEmployee = employee;
    this.formMode = 'delete';
  }
  deleteUser(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      () => {
        alert('employee deleted succesfully');
      },
      (error) => {
        // Error: Handle error scenario, e.g., display an error message
        console.error('Error deleting employee', error);
      }
    );
    this.getingEmployeeData();

    this.isAddUserModalOpen = false;
    this.newEmployee = new EmployeeDetails();
  }
}
