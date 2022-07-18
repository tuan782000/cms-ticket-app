import { LoadingAction } from "../action/loadingAction";
import { LoadingType } from "../types/LoadingType";

const initialState = {
        display: 'none'
};

const loadingReducer =  (state = initialState, action:LoadingAction) => {
  switch (action.type) {
    case LoadingType.HIDE_LOADING:
      return { ...state,display:action.payload};
    case LoadingType.SHOW_LOADING: 
    
        return {...state, display: action.payload}

    default:
      return {...state};
  }
};
export default loadingReducer
