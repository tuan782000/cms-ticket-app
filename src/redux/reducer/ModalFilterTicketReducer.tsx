import { ModalFilterTicketAction } from "../action/modalFilterAction";
import { ModalFilterTicketType } from "../types/modalFilterTicketType";

const initialState = {
    modalVisible: false,
};

const modalFilterTicketReducer = (state = initialState, action: ModalFilterTicketAction) => {
  switch (action.type) {
    case  ModalFilterTicketType.SET_MODAL_VISIBLE:
      return { ...state, modalVisible: action.payload};

    default:
      return {...state};
  }
};
export default modalFilterTicketReducer
