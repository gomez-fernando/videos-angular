import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  public page_title: string;
  private location: Location;

  constructor() {
    this.page_title = 'ERROR 404';
  }

  ngOnInit(): void {}

  goBack() {
    // window.history.back();
    this.location.back();

    console.log('goBack()...');
  }
}
