import { FilterActions, filterActionsType } from './filter.actions';

export const FILTER_KEY = 'filter'

export interface FilterState {
  name: string;
  ports: string[];
  type: string;
}

const initialState: FilterState = {
  name: '',
  ports: [],
  type: '',
}

export const filterReducer = (state: FilterState = initialState, action: FilterActions) => {
  switch (action.type) {
    case filterActionsType.name:
      return{
        ...state,
        name: action.options
      };
    case filterActionsType.ports:
      return {
        ...state,
        ports: action.options
      };
    case filterActionsType.type:
      return {
        ...state,
        type: action.options
      };
    default: {
      return state;
    }
  }
};
