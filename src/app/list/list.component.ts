import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public list: any = [
    {
      title: 'GO Ms Chief',
      type: 'High Speed Craft',
      port: 'Port Canaveral',
    },
    {
      title: 'GO Ms Chief',
      type: 'High Speed Craft',
      port: 'Port Canaveral',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
