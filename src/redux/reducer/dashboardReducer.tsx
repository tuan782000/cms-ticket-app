import moment from 'moment'
import { baseService } from '../../service/BaseService'
import { getRevenueActionCreator } from '../action-creator/dashboardActionCreator'
import { DashboardAction } from '../action/dashboardAction'
import { DashboardType } from '../types/DashboardType'

const initialState = {
    revenueData: new Array<any>(),
    revenueDataByMonth: new Array<any>(),
    revenueDataByWeek: new Array<any>(),
    totalRevenue: 0,
    modifiedRevenueData: new Array<any>(),
    title: '',
    tickCount: 0

}

const dashboardReducer = (state = initialState, action: DashboardAction) => {
    switch (action.type) {

        case DashboardType.GET_REVENUE:
            const { payload } = action;

            const modifiedData = payload.map((ele: any) => {
                return { date: ele.date.toDate(), doanhThu: ele.doanhThu }
            }).sort((o1: any, o2: any) => {
                return o1.date - o2.date
            })
            return { ...state, revenueData: [...modifiedData] }
        case DashboardType.GET_REVENUE_BY_MONTH: {
            const { payload } = action // payload: date
            console.log('payload', payload)
            console.log('revenudata', state.revenueData)
            const coppyRevenueDate = [...state.revenueData];
            console.log('coppyRevenueDate', coppyRevenueDate)
            const getFilterRevenueData = coppyRevenueDate.filter((ele) => {
                return ele.date.getMonth() === payload.getMonth() && ele.date.getFullYear() === payload.getFullYear()
            }).map((ele) => {
                return { date: moment(ele.date).format('DD/MM/YYYY'), doanhThu: ele.doanhThu }
            })
            state.totalRevenue = getFilterRevenueData.reduce((total, ele) => {
                return total + ele.doanhThu
            }, 0)
            console.log('filterRevenueData', getFilterRevenueData)
            return { ...state, revenueData: [...getFilterRevenueData],title:'Tổng doanh Thu theo tháng',tickCount: 7 }
        }
        case DashboardType.GET_REVENUE_BY_WEEK: {
            const { payload } = action;
            const mod = payload.map((e)=>{
                return moment(e).format('DD/MM/YYYY')
            })
            console.log('paypload', payload)
            let getfilterRevenueData = [...state.revenueData]
            getfilterRevenueData = getfilterRevenueData.filter((ele) => {
                return mod.includes(moment(ele.date).format('DD/MM/YYYY'))
            }).map((ele) => {
                if(ele.date.getDay() ===0){ //0:chủ nhật
                    return { date: `Chủ nhật`, doanhThu: ele.doanhThu }
                }
                return { date: `Thứ ${ele.date.getDay() + 1}`, doanhThu: ele.doanhThu }
            })
            const totalRevenue = getfilterRevenueData.reduce((total,ele)=>{
                return total + ele.doanhThu
            },0)
            
            return { ...state, revenueData: [...getfilterRevenueData],totalRevenue: totalRevenue,  title: 'Tổng doanh Thu theo tuần',ticketCount:1}
        }
        default:
            return { ...state }
    }
}
export default dashboardReducer;
