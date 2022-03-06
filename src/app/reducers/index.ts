import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { FILTER_KEY, filterReducer, FilterState } from "./filter/filter.reducers";
import { PAGINATION_PAGE_KEY, paginatorReducer, PaginatorState } from "./pagination/pagination.reducers";


export interface State {
  filter: FilterState,
  pagination: PaginatorState,
}

export const reducers: ActionReducerMap<State, any> = {
  [FILTER_KEY]: filterReducer,
  [PAGINATION_PAGE_KEY]: paginatorReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
