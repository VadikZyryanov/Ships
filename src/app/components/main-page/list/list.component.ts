import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../services/data.service";
import { Ship } from "../../../types/ship.type";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public ships: Ship[] = [];

  constructor(private dataService: DataService) { }

  public ngOnInit(): void {
    this.dataService.getShips()
      .subscribe((ships: Ship[]) => {
        this.ships = ships;
      })
  }
}
