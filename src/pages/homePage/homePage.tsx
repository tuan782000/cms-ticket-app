import React from 'react'
import { Area } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getRevenueDataByMonthActionCreator, getRevenueDataByWeekActionCreator } from '../../redux/action-creator/dashboardActionCreator';
import { State } from '../../redux/configStore'
import { Empty } from 'antd';
import DatePicker from '../../component/DatePicker';
import DonutChart from '../../component/DonutChart';
import { geTicketStatusActionCreator } from '../../redux/action-creator/quanLyVeActionCreator';
const  formatNumber = (num:number)=>{
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export default function TrangChu() {
  const dispatch = useDispatch();
  const { revenueData, totalRevenue, title, tickCount } = useSelector((state: State) => state.dashboardReducer)
  const {ticketStatusOfFA, ticketStatusOfEV, usedTicketFA,unusedTicketFA,usedTicketEV,unusedTicketEV} =  useSelector((state:State)=>state.quanLyVeReducer)
  const hanleOnChange = (value: Date, options: Array<Date>) => {
    console.log('value', value)
    if (options.length === 0) {

      dispatch(getRevenueDataByMonthActionCreator(value))
    } else {
      dispatch(getRevenueDataByWeekActionCreator(options))
    }

  }
const onChange = (value:Date)=>{
    const month = value.getMonth()
    dispatch(geTicketStatusActionCreator(month))
}


  const config = {
    data: revenueData,
    xField: "date",
    yField: "doanhThu",
    xAxis: {
      // type: 'timeCat',
      tickCount: tickCount,
    },
    color: '#FFA654',
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#FAA05F 1:#FFFFFF',
      };
    },

  };

  useEffect(() => {
    dispatch(getRevenueDataByMonthActionCreator(new Date()))
    dispatch(geTicketStatusActionCreator(new Date().getMonth()))

  }, [])
  return (
    <div id='tranChu'>
      <h1 className='text-3xl font-bold' style={{ color: " #1E0D03" }}>Thống kê</h1>
      <div className='flex items-center justify-between'>
        <h2 className='font-semibold' style={{ lineHeight: '28px', fontSize: '18px' }}>Doanh thu</h2>
        <DatePicker size='md' defaultValue={new Date()} format='[Tháng] MM,YYYY' onChange={hanleOnChange} />
      </div>
      {revenueData.length === 0 ? <Empty></Empty> : ''}
      <Area {...config} />
      <div className='mt-6 mb-14'>
        <h2 className='text-sm font-medium' style={{ color: " #1E0D03", opacity: '0.5' }}>{title}</h2>
        <p className='text-2xl font-bold' style={{ color: "#1E0D03" }}>{formatNumber(totalRevenue)}<span className='text-sm font-medium ml-1'>đồng</span></p>
      </div>
      <div className='flex'>
        <DatePicker size='md' defaultValue={new Date()} format='[Tháng] MM,YYYY' onChange={onChange} />
        <div className='flex'>
          <div>
            <h2 className='text-center'>Gói gia đình</h2>
            {ticketStatusOfFA.length === 0 ? <Empty></Empty>:  <DonutChart label = {[usedTicketFA,unusedTicketFA]} name = "FA"  propData = {ticketStatusOfFA}></DonutChart>}
          </div>
          <div>
            <h2 className='text-center'>Gói sự kiện</h2>
            {ticketStatusOfEV.length === 0 ? <Empty></Empty>:  <DonutChart label = {[usedTicketEV,unusedTicketEV]} name = "EV"  propData = {ticketStatusOfEV}></DonutChart>}
          
          </div>
          <div style={{ position: "relative", top: "92px", right: "-55px" }}>
            <div className='flex'>
              <div className='rounded mr-3' style={{ height: '22px', width: '44px', backgroundColor: '#4F75FF' }}></div>
              <p>Đã sử dụng</p>
            </div>
            <div className='flex'>
              <div className='rounded mr-3' style={{ height: '22px', width: '44px', backgroundColor: '#FF8A48' }}></div>
              <p>Chưa sử dụng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
