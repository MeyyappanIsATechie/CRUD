import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isDarkMode = false;
  searchTerm: string = '';
  title = 'Employee CRUD';
  constructor(private router: Router, private renderer: Renderer2) {}
  ngOnInit(): void {
    const themePreference = localStorage.getItem('theme');
    if (themePreference === 'dark') {
      this.isDarkMode = true;
      this.renderer.addClass(document.body, 'dark-theme');
    }
  }
  onSearch(): void {
    this.router.navigate(['/employees'], {
      queryParams: { search: this.searchTerm },
    });
    this.searchTerm = '';
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
