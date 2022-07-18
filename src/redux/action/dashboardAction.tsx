import dashboardReducer from "../reducer/dashboardReducer";
import { DashboardType } from "../types/DashboardType";

interface GetRevenue{
    type: DashboardType.GET_REVENUE,
    payload: any  
}
interface GetRevenueByMonth{
    type: DashboardType.GET_REVENUE_BY_MONTH,
    payload:Date
}

interface GetRevenueByWeek {
    type: DashboardType.GET_REVENUE_BY_WEEK,
    payload: Date []
}
interface GetTicketSold{
    type: DashboardType.GET_TICKET_SOLD,
    payload: {
        daSuDung: number,
        chuaSuDung:number
    }
}
export type DashboardAction = GetRevenue | GetRevenueByMonth | GetRevenueByWeek | GetTicketSold