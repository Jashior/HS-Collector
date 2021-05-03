import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  value: string;

  constructor(private router: Router) {
    this.value = "api/v1/collection/?region=2&account_lo=15542146";
  }

  ngOnInit(): void {
  }

  loadCollection() {
    if (this.value == "")
      return;

    this.router.navigate(['/collection', { link: this.value }]);
  }
}