import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Apollo, gql } from "apollo-angular";
import { map } from "rxjs/operators";
import { Ship, ShipData, ShipDetails, ShipDetailsData } from "../types/ship.type";

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private apollo: Apollo) { }

  public getShips(): Observable<Ship[]> {

    const query = gql`
      query getShips {
        ships {
          home_port
          type
          name
          id
        }
      }
    `;

    return this.apollo
      .watchQuery<ShipData>({
        query,
        // variables: {
        //   findName: options.filter.text,
        //   findType: options.filter.radio
        // }
      }).valueChanges.pipe(map(value => value.data.ships))
  }

  public getShipDetails(id: string): Observable<ShipDetails> {
    const query = gql`
      query getShipById($findStr: ID!) {
        ships(find: {id: $findStr}) {
          name
          type
          home_port
          weight_kg
          year_built
          missions {
            name
          }
        }
      }
    `;

    return this.apollo.watchQuery<ShipDetailsData>({
      query,
      variables: {
        findStr: id
      }
    }).valueChanges.pipe(
      map(item => item.data.ships[0])
    );
  }
}
