import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { DataService } from "../../../services/data.service";


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public selectedPorts: string[] = [];
  public disablePorts: boolean = false;
  public smallLabel: boolean = false;
  public filterName: FormControl = new FormControl();
  public filterPort: FormControl = new FormControl([]);
  public filterType: FormControl = new FormControl();
  public filterForm: FormGroup = new FormGroup({
    name: this.filterName,
    port: this.filterPort,
    type: this.filterType,
  });
  public ports: string[] = ['Port Canaveral', 'Port of Los Angeles', 'Fort Lauderdale'];
  public types: string[] = ['Barge', 'Cargo', 'High Speed Craft', 'Tug'];


  constructor(private dataService: DataService) { }

  public ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(options => {
      options.name ? this.smallLabel = true : this.smallLabel = false;
      this.dataService.setOptions(options);
    })
  }

  public clickPort(port: string): void {
    if (this.selectedPorts.length === 0 || !this.selectedPorts.some(el => el === port)) {
      this.selectedPorts.push(port);
    } else {
      this.selectedPorts.splice(this.selectedPorts.indexOf(port), 1);
    }
    this.filterPort.setValue(this.selectedPorts);
  }

  public togglePort($event: any): void {
    this.disablePorts = !this.disablePorts;
  }
}
