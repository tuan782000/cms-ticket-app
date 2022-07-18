import { ModalFilterTicketType } from "../types/modalFilterTicketType";


interface ModalVisibleAction{
    type: ModalFilterTicketType
    payload: boolean
}



export type ModalFilterTicketAction = ModalVisibleAction 