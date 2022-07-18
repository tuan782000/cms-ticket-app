import {combineReducers} from 'redux'
import loadingReducer from './reducer/loadingReducer'
import quanLyVeReducer from './reducer/quanLyVeReducer'
import modalFilterTicketReducer from './reducer/ModalFilterTicketReducer'
import checkTicketReducer from './reducer/doiSoatVeReducer'
import ticketPackManagerReducer from './reducer/quanLyGoiVeReducer'
import dashboardReducer from './reducer/dashboardReducer'
const rootReducer = combineReducers({
    loadingReducer,
    quanLyVeReducer,
    modalFilterTicketReducer,
    checkTicketReducer,
    ticketPackManagerReducer,
    dashboardReducer

})

export default rootReducer
export type State = ReturnType<typeof rootReducer>