import { Dispatch } from 'redux'
import { InfoTicketPack, TicketPack } from '../../model/ticketPackageManagement/TicketPack'
import { TickPackManagerAction } from '../../redux/action/quanLyGoiVeAction'
import { TicketPackManagerType } from '../../redux/types/quanLyGoiVeType'
import { baseService } from '../../service/BaseService'
import { STATUS_CODE } from '../../util/config'
import { LoadingAction } from '../action/loadingAction'

import { hideLoadingActionCreator, showLoadingActionCreator } from './loadingActionCreator'
export const getTicketPackListActionCreator = () => {
    return async (dispatch: Dispatch) => {
        dispatch(showLoadingActionCreator())
        try {
            const { lst, status } = await baseService.get('danhSachGoi')
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: TicketPackManagerType.GET_TICKET_PACK_LIST,
                    payload: lst
                })
            }

        } catch (error) {
            console.log('error', error)
        }
        dispatch(hideLoadingActionCreator())
    }
}
export const editModalVisibleActionCreator = (isEditModalVisible: boolean) => {
    return {
        type: TicketPackManagerType.SET_EDIT_MODAL_VISIBLE,
        payload: isEditModalVisible
    }
}
export const addModalVisibleActionCreator = (isAddModalVisible: boolean) => {
    return {
        type: TicketPackManagerType.SET_ADD_MODAL_VISIBLE,
        payload: isAddModalVisible
    }
}



export const getInfoTicketPackActionCreator = (infoTicketPack: TicketPack) => {
    return {
        type: TicketPackManagerType.GET_INFO_TICKET_PACK,
        payload: infoTicketPack
    }
}

export const updateTicketPackActionCreator = (values: TicketPack) => {

    return async (dispatch: Dispatch<any>) => {

        try {
            const { status } = await baseService.updateTicketPack(values)
            if (status === STATUS_CODE.SUCCESS) {
                dispatch(getTicketPackListActionCreator())
            }

        } catch (error) {
            console.log('error', error)
        }

    }

}
export const addTicketPackActionCreator = (values: any) => {
    console.log('values them', values)
    return async (dispatch: Dispatch<any>) => {
        try {
            const { status } = await baseService.addTicketPack(values)
            if (status === STATUS_CODE.SUCCESS) {
                dispatch(getTicketPackListActionCreator())
            }

        } catch (error) {
            console.log('error', error)
        }
    }
}