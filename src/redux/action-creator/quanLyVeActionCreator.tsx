import { Dispatch } from 'redux'
import { baseService } from '../../service/BaseService'
import { TicketManagerType } from '../types/quanLyVeType'
import { FilterTicket } from '../../model/ticketManagement/FilterTicket'
import { hideLoadingActionCreator, showLoadingActionCreator } from './loadingActionCreator'
import { modalVisibleActionCreator } from './modalFilterTicketActionCreator'
import { STATUS_CODE } from '../../util/config'

export const getTicketListActionCreator = () => {
    return async (dispatch: Dispatch) => {

        dispatch(showLoadingActionCreator())
        try {
            const { lst, status } = await baseService.get('danhSachVe')
            console.log('lst', lst)

            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: TicketManagerType.GET_TICKET_LIST,
                    payload: lst
                })

            }
        } catch (error) {
           console.log('error', error)
        }
        dispatch(hideLoadingActionCreator())


    }
}
export const searchByTicketNumberActionCreator = (soVe: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const { lst, status } = await baseService.searchByTicketNumber('danhSachVe', soVe)
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: TicketManagerType.GET_TICKET_LIST,
                    payload: lst
                })
            }
        } catch (error) {
            console.log('error', error)
        }

    }
}

export const getCheckInGateListActionCreator = () => {
    return async (dispatch: Dispatch) => {

        try {
            const { lst, status } = await baseService.get('congCheckIn')
            if (status === 200) {
                dispatch({
                    type: TicketManagerType.GET_CHECKIN_GATE_LIST,
                    payload: lst
                })
            }
        } catch (error) {
            console.log('error', error)
        }

    }
}

export const filterTickerActionCreator = (values: any) => {

    return async (dispatch: Dispatch<any>) => {


        await dispatch(showLoadingActionCreator())
        await dispatch(getTicketListActionCreator())
        await dispatch({
            type: TicketManagerType.SET_FILTER_TICKET,
            payload: values
        })
        await dispatch(hideLoadingActionCreator())
        await dispatch(modalVisibleActionCreator(false))
    }
}
export const  geTicketStatusActionCreator = (month:number)=>{
    console.log('dis',month)
    return  async (dispatch: Dispatch<any>)=>{
        await dispatch(getTicketListActionCreator())
        dispatch({
            type: TicketManagerType.SET_TICKET_STATUS,
            payload:month
        })
    }
}
