import { createFeatureSelector, createSelector } from '@ngrx/store';
import {PAGINATION_PAGE_KEY, PaginatorState} from "./pagination.reducers";

export const featurePaginatorSelector = createFeatureSelector<PaginatorState>(PAGINATION_PAGE_KEY);

export const paginatorSelector = createSelector(
  featurePaginatorSelector,
  (state: PaginatorState):number => state.page
);
