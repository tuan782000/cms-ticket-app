import { STATUS_CODES } from 'node:http'
import {Dispatch} from 'redux'
import { baseService } from '../../service/BaseService'
import { checkTicketType } from '../types/doiSoatVeType'
import {STATUS_CODE} from '../../util/config'
export const getEventListActionCreator = ()=>{
    return async (dispatch: Dispatch)=>{

        try {
            const {lst,status} = await baseService.get('danhSachSuKien')
          if(status === STATUS_CODE.SUCCESS){
            dispatch({
                type: checkTicketType.GET_EVENT_LIST,
                payLoad: lst
            })
          }
        } catch (error) {
            console.log('error', error)
        }
    }
}