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

  public getShips(options: any): Observable<Ship[]> {

    const query = gql`
      query getShips($findName: String, $findType: String) {
        ships(find: {name: $findName, type: $findType}) {
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
        variables: {
          findName: options.name,
          findType: options.type,
        }
      }).valueChanges.pipe(map(value => value.data.ships))
  }

  public getShipDetails(id: string): Observable<ShipDetails> {
    const query = gql`
      query getShipById($findID: ID!) {
        ships(find: {id: $findID}) {
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
        findID: id,
      }
    }).valueChanges.pipe(
      map(value => value.data.ships[0]),
    );
  }
}
