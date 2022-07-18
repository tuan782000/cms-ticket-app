
import { CheckTicketAction } from "../action/doiSoatVeAction"
import { checkTicketType } from "../types/doiSoatVeType"

const initialState = {
    eventList: []
}
const checkTicketReducer = (state = initialState, action: CheckTicketAction) => {
    switch (action.type) {

        case checkTicketType.GET_EVENT_LIST:
            return { ...state, eventList: action.payLoad }

        default:
            return { ...state }
    }
}

export default checkTicketReducer
