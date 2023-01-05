import { actionType, itemsDispatchTypes } from "./items.actionTypes";

const initialState: any = [];

const itemsReducer = (state: [] = initialState, action: itemsDispatchTypes) => {
  switch (action.type) {
    case actionType.FETCH_ITEMS_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionType.FETCH_ITEMS_COMPLATE:
      return {
        ...state,
        isLoading: false,
        items: action.payload,
      };
    case actionType.FETCH_ITEMS_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default itemsReducer;
