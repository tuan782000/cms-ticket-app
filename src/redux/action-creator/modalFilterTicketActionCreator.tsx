import { ModalFilterTicketType } from "../types/modalFilterTicketType";

export const modalVisibleActionCreator = (modalVisible: boolean) => {
    return {
        type: ModalFilterTicketType.SET_MODAL_VISIBLE,
        payload: modalVisible
    }
}

