import moment from 'moment'
import { Dispatch } from 'redux'
import { baseService } from '../../service/BaseService'
import { STATUS_CODE } from '../../util/config'
import { DashboardType } from '../types/DashboardType'
export const getRevenueActionCreator = () => {
    return async (dispatch: Dispatch) => {
        try {
            const { lst, status } = await baseService.get('doanhThu')

            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: DashboardType.GET_REVENUE,
                    payload: lst
                })
            }

        } catch (error) {
            console.log('error', error)
        }
    }

}

export const getRevenueDataByMonthActionCreator = (date: Date) => {
    return async (dispatch: Dispatch<any>) => {
        await dispatch(getRevenueActionCreator())
        await dispatch(
            {
                type: DashboardType.GET_REVENUE_BY_MONTH,
                payload: date
            })
    }

}
export const getRevenueDataByWeekActionCreator = (dates: Date[]) => {
    return async (dispatch: Dispatch<any>) => {
        await dispatch(getRevenueActionCreator())
        await dispatch(
            {
                type: DashboardType.GET_REVENUE_BY_WEEK,
                payload: dates
            })
    }
}
