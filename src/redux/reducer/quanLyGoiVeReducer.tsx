import { InfoTicketPack, TicketPack } from "../../model/ticketPackageManagement/TicketPack"
import { TickPackManagerAction } from '../action/quanLyGoiVeAction'
import { TicketPackManagerType } from "../types/quanLyGoiVeType"

const initialState = {
    ticketPackList: Array<TicketPack>(),
    isUpdateModalVisible: false,
    isAddModalVisible: false,
    infoTicketPack: new InfoTicketPack()
}

const ticketPackManagerReducer = (state = initialState, action: TickPackManagerAction) => {
    switch (action.type) {

        case TicketPackManagerType.GET_TICKET_PACK_LIST:
            return { ...state,ticketPackList: action.payload }
        case TicketPackManagerType.SET_EDIT_MODAL_VISIBLE:
            return {...state, isUpdateModalVisible: action.payload}
        case TicketPackManagerType.GET_INFO_TICKET_PACK:
            return {...state, infoTicketPack: action.payload}
        case TicketPackManagerType.SET_ADD_MODAL_VISIBLE:
            return {...state, isAddModalVisible: action.payload}

        default:
            return state
    }
}
export default ticketPackManagerReducer
