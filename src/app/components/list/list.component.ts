import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public ships: Ship[] = [
    {
      type: 'High Speed Craft',
      yearBuilt: 2000,
      name: 'GO Ms Chief',
      homePort: 'Port Canaveral',
    },
    {
      type: 'High Speed Craft',
      yearBuilt: 2000,
      name: 'GO Ms Chief',
      homePort: 'Port Canaveral',
    },
  ];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

}

export interface Ship {
  type: string;
  yearBuilt: number;
  name: string;
  homePort: string;
}

