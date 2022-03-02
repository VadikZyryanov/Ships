import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly url: string = 'https://api.spacex.land/graphql/'

  constructor() { }

}
