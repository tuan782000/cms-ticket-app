import { FilterTicket } from "../../model/ticketManagement/FilterTicket";
import { TicketList } from "../../model/ticketManagement/TicketList";
import { CHUA_SU_DUNG, DA_SU_DUNG } from "../../util/config";
import { TicketManagerAction } from "../action/quanLyVeAction";
import { TicketManagerType } from "../types/quanLyVeType";
const initialState = {
  ticketList: Array<any>(),
  checkInGateList: Array<any>(),
  ticketStatusOfFA: Array<any>(),
  ticketStatusOfEV: Array<any>(),
  usedTicketFA: 0,
  unusedTicketFA: 0,
  usedTicketEV: 0,
  unusedTicketEV: 0

};

const quanLyVeReducer = (state = initialState, action: TicketManagerAction) => {
  switch (action.type) {

    case TicketManagerType.GET_TICKET_LIST: {
      const { payload } = action
      const lst = payload.map((ticketObj: TicketList, index: number) => {
        return { ...ticketObj, ngayApDung: ticketObj.ngayApDung.toDate(), ngaySuDung: ticketObj.ngaySuDung.toDate(), ngayHetHan: ticketObj.ngayHetHan.toDate() }
      })
      return { ...state, ticketList: [...lst] }
    }


    case TicketManagerType.GET_CHECKIN_GATE_LIST:
      return { ...state, checkInGateList: action.payload }

    case TicketManagerType.SET_FILTER_TICKET: {
      const { payload } = action;
      console.log('infro dispatch', action.payload)
      console.log('danhSachVe', state.ticketList)

      const keys = Object.keys(payload)
      const values = Object.values(payload)
      console.log('keys', keys)
      console.log('values', values)
      let updateTicketList = [...state.ticketList]
      const getFilterTicketList = (key: any, value: any, array: any) => {
        return array.filter((ticket: TicketList) => {
          if (value === '') {
            return ticket[key as keyof TicketList] !== value
          } else if (key === 'congCheckInId') {
            return value.includes(ticket[key as keyof TicketList])
          } else if (key === 'startTime') {
            return ticket['ngayApDung'].getTime() >= value.getTime()
          } else if (key === 'endTime') {
            return ticket['ngayApDung'].getTime() <= value.getTime()
          }
          return ticket[key as keyof TicketList] === value
        })
      }

      for (let i = 0; i < keys.length; i++) {
        updateTicketList = getFilterTicketList(keys[i], values[i], updateTicketList)
      }

      return { ...state, ticketList: updateTicketList }

    }

    case TicketManagerType.SET_TICKET_STATUS: {
      const  month  = action.payload

      const ticketStatusOfFA = []
      const ticketStatusOfEV = []
      const coppyTicketList = [...state.ticketList]
      const getFilterTicketList = (maGoi: string) => {
        return coppyTicketList.filter((ticket) => {
          return ticket.ngayApDung.getMonth() === month && ticket.maGoi === maGoi
        })
      }

      const usedTicketFA = getFilterTicketList('goiGiaDinh').reduce((total: number, ele: TicketList) => {
        if (ele.tinhTrangSuDung === DA_SU_DUNG) {
          total = total + 1
        }
        return total
      }, 0)

      const unusedTicketFA = getFilterTicketList('goiGiaDinh').reduce((total: number, ele: TicketList) => {
        if (ele.tinhTrangSuDung === CHUA_SU_DUNG) {
          total = total + 1
        }
        return total
      }, 0)
      const usedTicketEV = getFilterTicketList('goiSuKien').reduce((total: number, ele: TicketList) => {
        if (ele.tinhTrangSuDung === DA_SU_DUNG) {
          total = total + 1
        }
        return total
      }, 0)

      const unusedTicketEV = getFilterTicketList('goiSuKien').reduce((total: number, ele: TicketList) => {
        if (ele.tinhTrangSuDung === CHUA_SU_DUNG) {
          total = total + 1
        }
        return total
      }, 0)
      const totalFA =  usedTicketFA + unusedTicketFA
      const totalEV = usedTicketEV + unusedTicketEV
      ticketStatusOfFA.push(usedTicketFA / totalFA * 100, unusedTicketFA / totalFA * 100)
      ticketStatusOfEV.push(usedTicketEV / totalEV * 100, unusedTicketEV / totalEV * 100)
      state.usedTicketFA = usedTicketFA
      state.unusedTicketFA = unusedTicketFA
      state.usedTicketEV = usedTicketEV
      state.unusedTicketEV = unusedTicketEV
    
      return { ...state, ticketStatusOfFA: [...ticketStatusOfFA], ticketStatusOfEV: [...ticketStatusOfEV]}
    }
    default:
      return { ...state };
  }
};
export default quanLyVeReducer
