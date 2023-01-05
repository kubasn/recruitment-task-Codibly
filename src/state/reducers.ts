import { combineReducers } from "redux";
import itemsReducer from "./items/items.reducer";

const reducer = combineReducers({
  items: itemsReducer,
});

export default reducer;
