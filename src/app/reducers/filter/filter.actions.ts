import { Action } from '@ngrx/store';

export enum filterActionsType {
  name = `[filter] name`,
  ports = `[filter] ports`,
  type = `[filter] type`,
}

export class NameAction implements Action {
  readonly type = filterActionsType.name;
  constructor(public options: string) {}
}

export class PortsAction implements Action {
  readonly type = filterActionsType.ports;
  constructor(public options: string[]) {}
}

export class TypeAction implements Action {
  readonly type = filterActionsType.type;
  constructor(public options: string) {}
}

export type FilterActions = NameAction | PortsAction | TypeAction;
