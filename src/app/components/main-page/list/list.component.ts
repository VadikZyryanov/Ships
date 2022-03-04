import { Component, OnDestroy, OnInit } from '@angular/core';
import {DataService} from "../../../services/data.service";
import { Ship } from "../../../types/ship.type";
import { FilterOptions } from "../../../types/filter.type";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public ships: Ship[] = [];
  public shipsAll: Ship[] = [];
  public numberStr: number = 1;
  public maxStr: number = 1;
  public countItems: number = 0;
  public step: number = 5;
  public disabledPrev: boolean = true;
  public disabledNext: boolean = false;
  public options: FilterOptions = {};

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private dataService: DataService) { }

  public ngOnInit(): void {
    this.getShips(this.options);
    this.dataService.optionsSubscriber()
      .pipe(takeUntil(this.destroy$))
      .subscribe(options => {
        this.getShips(options);
      })
  }

  public ngOnDestroy() {
    this.destroy$.next();
  }

  public getShips(options: any) {
    this.dataService.getShips(options)
      .pipe(takeUntil(this.destroy$))
      .subscribe((ships: Ship[]) => {
        this.ships = ships.slice(0, this.step);
        this.shipsAll = ships;
        this.maxStr = Math.ceil(ships.length / this.step);
      })
  }

  public prevStr(): void {
    if (this.numberStr !== 1) {
      this.countItems -= this.step;
      this.numberStr -= 1;
      this.numberStr === 1 ? this.disabledPrev = true : this.disabledPrev = false;
      this.ships = this.shipsAll.slice(this.countItems, this.countItems + this.step);
    }
    this.disabledNext = false;
  }

  public nextStr(): void {
    if (this.numberStr !== this.maxStr) {
      this.countItems += this.step;
      this.numberStr += 1;
      this.numberStr === this.maxStr ? this.disabledNext = true : this.disabledNext = false;
      this.ships = this.shipsAll.slice(this.countItems, this.countItems + this.step)
    }
    this.disabledPrev = false;
  }
}
