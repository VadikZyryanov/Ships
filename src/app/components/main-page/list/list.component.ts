import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from "../../../services/data.service";
import { Ship } from "../../../types/ship.type";
import { FilterOptions } from "../../../types/filter.type";
import { takeUntil } from "rxjs/operators";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { select, Store } from "@ngrx/store";
import { filterSelector } from "../../../reducers/filter/filter.selectors";
import { PaginatorPageAction } from "../../../reducers/pagination/pagination.actions";
import { paginatorSelector } from "../../../reducers/pagination/pagination.selectors";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnDestroy {

  public shipsList: Ship[] = [];
  public shipsAll: Ship[] = [];
  public page: number = 1;
  public maxPage: number = 1;
  public startSlice: number = 0;
  public step: number = 5;
  public disabledPrev: boolean = true;
  public disabledNext: boolean = false;
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private destroy$: Subject<void> = new Subject<void>();
  private page$: Observable<number> = this.store.pipe(select(paginatorSelector));
  private filterSelector$: Observable<FilterOptions> = this.store.pipe(select(filterSelector));

  constructor(
    private dataService: DataService,
    private store: Store,
  ) { }

  public ngOnInit(): void {
    this.filterSelector$
      .pipe(takeUntil(this.destroy$))
      .subscribe(filterOptions => {
        this.getShips(filterOptions);
      })

    this.page$
      .pipe(takeUntil(this.destroy$))
      .subscribe(page => {
        this.page = page;
        page === 1
          ? this.startSlice = 0
          : this.startSlice = page * this.step - this.step;
      })
  }
  public ngOnDestroy() {
    this.destroy$.next();
  }

  public getShips(options: FilterOptions): void {
    this.loading$.next(true);
    this.dataService.getShips(options)
      .pipe(takeUntil(this.destroy$))
      .subscribe((ships: Ship[]) => {
        this.maxPage = Math.ceil(ships.length / this.step);
        if (this.page > this.maxPage || this.page === 1) {
          this.page = 1;
          this.startSlice = 0;
          this.disabledPrev = true;
          this.disabledNext = false;
        }
        if (this.page > 1 && this.page < this.maxPage) {
          this.disabledPrev = false;
          this.disabledNext = false;
        }
        if (this.page === this.maxPage) {
          this.disabledPrev = false;
          this.disabledNext = true;
        }
        this.shipsList = ships.slice(this.startSlice, this.startSlice + this.step);
        this.shipsAll = ships;
        this.loading$.next(false);
      })
  }

  public prevPage(): void {
    if (this.page !== 1) {
      this.startSlice -= this.step;
      this.page -= 1;
      this.page === 1 ? this.disabledPrev = true : this.disabledPrev = false;
      this.shipsList = this.shipsAll.slice(this.startSlice, this.startSlice + this.step);
      this.store.dispatch(new PaginatorPageAction(this.page));
    }
    this.disabledNext = false;
  }

  public nextPage(): void {
    if (this.page !== this.maxPage) {
      this.startSlice += this.step;
      this.page += 1;
      this.page === this.maxPage ? this.disabledNext = true : this.disabledNext = false;
      this.shipsList = this.shipsAll.slice(this.startSlice, this.startSlice + this.step);
      this.store.dispatch(new PaginatorPageAction(this.page));
    }
    this.disabledPrev = false;
  }
}
