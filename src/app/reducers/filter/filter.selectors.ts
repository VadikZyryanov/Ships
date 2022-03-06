import { createFeatureSelector, createSelector } from '@ngrx/store';
import {FILTER_KEY, FilterState} from "./filter.reducers";

export const featureFilterSelector = createFeatureSelector<FilterState>(FILTER_KEY);

export const filterSelector = createSelector(
  featureFilterSelector,
  (state: FilterState): FilterState => state
);
