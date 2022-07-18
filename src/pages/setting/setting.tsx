import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputSearch from '../../component/InputSearch'
import { getTicketPackListActionCreator, editModalVisibleActionCreator, getInfoTicketPackActionCreator, addModalVisibleActionCreator } from '../../redux/action-creator/quanLyGoiVeActionCreator'
import { State } from '../../redux/configStore'
import { Table, Tag } from 'antd'
import { FormOutlined } from '@ant-design/icons';
import { TicketPack } from '../../model/ticketPackageManagement/TicketPack'
import moment from 'moment'
import history from '../../util/history'
import { downloadCSV } from '../../util/settings'



export default function CaiDat() {
  const { ticketPackList } = useSelector((state: State) => state.ticketPackManagerReducer)
  const lst = ticketPackList.map((ticketPack: TicketPack, index: number) => {
    return { ...ticketPack, key: index }
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTicketPackListActionCreator())
  }, [])
  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key'

    },
    {
      title: 'Mã gói',
      dataIndex: 'maGoi',
      key: "maGoi"
    },
    {
      title: 'Tên gói vé',
      dataIndex: 'tenGoi',
      key: 'tenGoi'
    },
    {
      title: 'Ngày áp dụng',
      dataIndex: 'ngayApDung',
      key: 'ngayApDung',
      render: (text: any) => {

        return <span>{moment(text.toDate()).format('DD/MM/YYYY')}</span>
      }
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'ngayHetHan',
      key: 'ngayHetHan',
      render: (text: any) => {
        return <span>{moment(text.toDate()).format('DD/MM/YYYY')}</span>
      }
    },
    {
      title: 'Giá vé (VND/VÉ)',
      dataIndex: 'giaVe',
      key: 'giaVe',
      render: (text: any) => {
        return <span>{text}</span>
      }
    },
    {
      title: 'Giá combo (VND/combo)',
      dataIndex: 'giaCombo',
      key: 'giaCombo',
      render: (text: TicketPack['giaCombo']) => {

        return <>
          {text?.giaVe ? <span>{`${text.giaVe}/ ${text.soVe}`}</span> : <span></span>}
        </>

      }
    },
    {
      title: 'Tình trạng',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (text: any) => {
        return <>
          {text ? <Tag className='flex items-center' color={'green'}><p className='h-1 w-1 mb-0 inline-block rounded bg-green-500'></p> <p className='inline-block mb-0'>Đang sử dụng</p></Tag>
            : <Tag className='flex items-center' color={'red'}><p className='h-1 mb-0 inline-block w-1 rounded bg-red-500'></p><p className='mb-0 inline-block'>Tắt</p></Tag>}
        </>
      }
    },
    {
      title: '',
      key: 'capNhat',
      render: (record: any) => {

        return <div onClick={() => {
          dispatch(editModalVisibleActionCreator(true))
          dispatch(getInfoTicketPackActionCreator({ ...record }))
        }} className='flex items-center cursor-pointer'><FormOutlined style={{ color: '#FF993C' }} className='mr-2' /><span style={{ color: '#FF993C' }} className='whitespace-nowrap'>Cập nhật</span></div>
      }
    },
  ]
  const data = lst
  const csvContent = ticketPackList.map((ticketPack: TicketPack, index: number) => {
    return {
      "STT": index,
      "Mã Gói": ticketPack.maGoi,
      "Tên Gói Vé": ticketPack.tenGoi,
      "Ngày Áp Dụng": moment(ticketPack.ngayApDung.toDate()).format("DD / MM / YYYY"),
      "Ngày Hết Hạn": moment(ticketPack.ngayHetHan.toDate()).format("DD / MM / YYYY"),
      "Giá Vé": ticketPack.giaVe,
      "Giá Vé Combo": ticketPack.giaCombo?.giaVe ? `${ticketPack.giaCombo.giaVe} / ${ticketPack.giaCombo.soVe}` : "",
      "Tình Trạng": ticketPack.trangThai ? "Đang sử dụng" : "Chưa sử dụng"
    }
  })
  return (
    <div id='caiDat'>
      <h1 className='font-black text-3xl mb-6' style={{ lineHeight: "54px", color: "#1E0D03" }}>Danh Sách Gói Vé</h1>
      <div className='flex justify-between items-center'>
        {/* input search  */}
        <InputSearch size='base' placeholder='Tìm bằng số vé'></InputSearch>


        {/* filter ticket  and export file  */}
        <div className='flex justify-between items-center'>
          <button onClick={() => {
            downloadCSV(csvContent, 'DanhSachGoiVe')
          }} className='button--white mr-3'>
            Xuất file (.csv)
          </button>
          <button className='button--orange' onClick={() => {
            dispatch(addModalVisibleActionCreator(true))
          }}>Thêm gói vé</button>
        </div>
      </div>
      <div>
        <Table className='mt-6 ' columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }} />
      </div>

    </div>
  )
}
