import React from 'react';
import './App.scss'
import TrangChu from './pages/homePage/homePage';
import QuanLyVe from './pages/ticketManagement/ticketManagement';
import HomeTemPlate from './template/homeTemplate/HomeTemPlate'
import CaiDat from './pages/setting/setting'
import DoiSoatVe from './pages/redemTicket/redemTicket'
import { Router, Switch } from "react-router-dom"
import history from './util/history'
import ModalFilterTicket from './component/modal/ModalFilterTicket'
import Loading from './component/loading/Loading'
import UpdateTicketPack from './pages/setting/components/UpdateTicketPack'
import AddTicketPack from './pages/setting/components/AddTicketPack';
import '../src/sass/Base/customize.scss'
import '../src/sass/Layouts/ticketManagement.scss'
import '../src/sass/Layouts/homeTemplate.scss'
import '../src/sass/Components/calendar.scss'
import '../src/sass/Components/datepicker.scss'
import '../src/sass/Components/inputSearch.scss'
import '../src/sass/Components/button.scss'
import '../src/sass/Components/donutChart.scss'


function App() {

  return (
    <Router history={history}>
      <Loading />
      <ModalFilterTicket />
      <UpdateTicketPack />
      <AddTicketPack />
      <Switch>
        <HomeTemPlate padding='24px' background='white' title='Thống kê' exact path='/' Component={TrangChu}></HomeTemPlate>
        <HomeTemPlate padding='24px' background='white' title='Thống kê' exact path='/trangchu' Component={TrangChu}></HomeTemPlate>
        <HomeTemPlate padding='24px' background='white' title='Danh Sách gói vé' exact path='/caidat' Component={CaiDat}></HomeTemPlate>
        <HomeTemPlate padding='24px' background='white' title='Danh sách vé' exact path='/quanlyve' Component={QuanLyVe}></HomeTemPlate>
        <HomeTemPlate padding='0' background='#F9F6F4' title='Đối soát vé' exact path='/doisoatve' Component={DoiSoatVe}></HomeTemPlate>
      </Switch>

    </Router>
  );
}

export default App;
