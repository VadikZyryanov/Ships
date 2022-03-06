import {PaginatorAction, paginatorActionsType} from "./pagination.actions";

export const PAGINATION_PAGE_KEY = 'pagination'

export interface PaginatorState {
  page: number;
}

const initialState: PaginatorState = {
  page: 1,
}

export const paginatorReducer = (state:PaginatorState = initialState, action: PaginatorAction) => {
  switch (action.type) {
    case paginatorActionsType.type:
      return {
        ...state,
        page: action.page,
      };
    default: {
      return state;
    }
  }
};
