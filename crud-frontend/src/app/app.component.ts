import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  searchTerm: string = '';
  title = 'Employee CRUD';
  constructor(private router: Router) {}
  onSearch(): void {
    this.router.navigate(['/employees'], {
      queryParams: { search: this.searchTerm },
    });
    this.searchTerm = '';
  }
}
