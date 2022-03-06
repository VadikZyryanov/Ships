import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from "../../../services/data.service";
import { ShipDetails } from "../../../types/ship.type";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  public id: string = '';
  public shipDetails: ShipDetails | undefined;
  public shipMissions: string = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private dataService: DataService,
  ) { }

  public ngOnInit(): void {
    this.activateRoute.params
      .subscribe(params => {
        this.id = params.id;
      })

    this.dataService.getShipDetails(this.id)
      .subscribe((shipDetails: ShipDetails) => {
        this.shipDetails = shipDetails;
        this.shipMissions = shipDetails.missions.map(mission => mission.name).join(', ');
      })
  }

}
