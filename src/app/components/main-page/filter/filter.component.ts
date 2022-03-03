import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { FilterOptions } from "../../../types/filter.type";


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public filterName: FormControl = new FormControl()
  public filterForm: FormGroup = new FormGroup({
    name: this.filterName,
  });
  public filterOptions: any;

  constructor() { }

  ngOnInit(): void {
    this.filterName.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

  public changeName($event: any) {
    console.log($event)
  }

}
