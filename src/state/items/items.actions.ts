import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { actionType } from "./items.actionTypes";
import axios from "axios";

interface paramsProps {
  id?: string | null;
  page?: string | null;
  perPage?: string | null;
}

export const fetchItems =
  (params: paramsProps): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({
      type: actionType.FETCH_ITEMS_START,
    });
    try {
      let url = "https://reqres.in/api/products";
      if (params.id || params.page || params.perPage) {
        url += "?";
        if (params.id) url += `id=${params.id}&`;
        if (params.page) url += `page=${params.page}&`;
        if (params.perPage) url += `per_page=${params.perPage}&`;
        url = url.slice(0, url.length - 1);
      }

      const items = await axios.get(url);

      console.log(items);
      dispatch({
        type: actionType.FETCH_ITEMS_COMPLATE,
        payload: items!.data,
      });
    } catch (error) {
      dispatch({
        type: actionType.FETCH_ITEMS_ERROR,
      });
    }
  };
