import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { DataService } from "../../../services/data.service";
import { select, Store } from "@ngrx/store";
import { filterSelector } from "../../../reducers/filter/filter.selectors";
import { Observable } from "rxjs";
import { FilterOptions } from "../../../types/filter.type";
import { NameAction, TypeAction } from "../../../reducers/filter/filter.actions";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public selectedPorts: string[] = [];
  public disablePorts: boolean = false;
  public smallLabel: boolean = false;
  public filterName: FormControl = new FormControl('');
  public filterPort: FormControl = new FormControl([]);
  public filterType: FormControl = new FormControl('');
  public filterForm: FormGroup = new FormGroup({
    name: this.filterName,
    ports: this.filterPort,
    type: this.filterType,
  });
  public ports: string[] = ['Port Canaveral', 'Port of Los Angeles', 'Fort Lauderdale'];
  public types: string[] = ['Barge', 'Cargo', 'High Speed Craft', 'Tug'];

  private filterSelector$: Observable<FilterOptions> = this.store.pipe(select(filterSelector));

  constructor(
    private dataService: DataService,
    private store: Store,
  ) { }

  public ngOnInit(): void {
    this.filterSelector$.subscribe(options => {
      this.setName(options.name);
      this.setType(options.type);
    })
  }

  public togglePort(): void {
    this.disablePorts = !this.disablePorts;
  }

  public clickPort(port: string): void {
    // if (this.selectedPorts.length === 0 || !this.selectedPorts.some(el => el === port)) {
    //   this.selectedPorts.push(port);
    // } else {
    //   this.selectedPorts.splice(this.selectedPorts.indexOf(port), 1);
    // }
    // this.store.dispatch(new PortsAction(this.selectedPorts))
  }

  public setName(name: string): void {
    name ? this.smallLabel = true : this.smallLabel = false;
    this.filterName.setValue(name);
  }

  public changeName(): void {
    const name = this.filterName.value;
    this.store.dispatch(new NameAction(name));
  }

  public setType(type: string): void {
    this.filterType.setValue(type);
  }

  public changeType(type: string): void {
    this.store.dispatch(new TypeAction(type));
  }
}
