import { Action } from '@ngrx/store';

export enum paginatorActionsType {
  type = `[paginator] options`,
}

export class PaginatorPageAction implements Action {
  readonly type = paginatorActionsType.type;
  constructor(public page: number) {}
}

export type PaginatorAction = PaginatorPageAction;
