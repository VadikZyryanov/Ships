import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { DataService } from "../../../services/data.service";


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public filterName: FormControl = new FormControl();
  public filterPort: FormControl = new FormControl();
  public filterType: FormControl = new FormControl();
  public filterForm: FormGroup = new FormGroup({
    name: this.filterName,
    port: this.filterPort,
    type: this.filterType,
  });
  public ports: string[] = ['Port Canaveral', 'Port of Los Angeles', 'Fort Lauderdale'];
  public types: string[] = ['Barge', 'Cargo', 'High Speed Craft', 'Tug'];


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(options => {
      this.dataService.setOptions(options);
    })
  }
}
