import { checkTicketType } from "../types/doiSoatVeType";
import { Event } from "../../model/redemTicket/Events";
interface GetEventListAction {
    type: checkTicketType.GET_EVENT_LIST,
    payLoad: any
}

export type CheckTicketAction = GetEventListAction