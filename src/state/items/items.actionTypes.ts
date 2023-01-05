export enum actionType {
  FETCH_ITEMS_START = "fetchItemsStart",
  FETCH_ITEMS_COMPLATE = "fetchItemsComplate",
  FETCH_ITEMS_ERROR = "fetchItemsError",
}

export interface FetchItemsStart {
  type: typeof actionType.FETCH_ITEMS_START;
}

export interface FetchItemsComplate {
  type: typeof actionType.FETCH_ITEMS_COMPLATE;
  payload: any;
}

export interface FetchItemsError {
  type: typeof actionType.FETCH_ITEMS_ERROR;
  error: string;
}

export type itemsDispatchTypes =
  | FetchItemsStart
  | FetchItemsComplate
  | FetchItemsError;
