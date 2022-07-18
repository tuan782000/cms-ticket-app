import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { State } from '../../redux/configStore';
import InputSearch from '../../component/InputSearch'
import { Table, Tag, Space, Select, Radio, RadioChangeEvent } from 'antd';
import { useFormik } from 'formik';
import { FilterTicket } from '../../model/ticketManagement/FilterTicket';
import { filterTickerActionCreator, getTicketListActionCreator } from '../../redux/action-creator/quanLyVeActionCreator';
import { getEventListActionCreator } from '../../redux/action-creator/doiSoatVeActionCreator'
import { Event } from '../../model/redemTicket/Events';
import { TicketList } from '../../model/ticketManagement/TicketList';
import { downloadCSV } from '../../util/settings';
import DatePicker from '../../component/DatePicker';

export default function DoiSoatVe() {

    const { ticketList } = useSelector((state: State) => state.quanLyVeReducer)
    console.log('tickerlist', ticketList)
    const { eventList } = useSelector((state: State) => state.checkTicketReducer)
    const [visibleButton, setVisibleButton] = useState(false)
    const dispatch = useDispatch()
    const lst = ticketList.map((ve: any, index: number) => {
        return { ...ve, key: index }
    })


    const options = eventList.map((event: Event, index: number) => {
        return { label: event.tenSuKien, value: event.maSuKien }
    })

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: "stt"
        },
        {
            title: 'Số vé',
            dataIndex: 'soVe',
            key: "soVe"
        },
        {
            title: 'Tên sự kiện',
            dataIndex: 'tenSuKien',
            key: 'tenSuKien'
        },
        {
            title: 'Ngày sử dụng',
            dataIndex: 'ngaySuDung',
            key: "ngaySuDung",
            render: (text: any) => {
                return <span>{moment(text).format('DD/MM/YYYY')}</span>
            }
        },
        {
            title: "Tên loại vé",
            dataIndex: 'loaiVe',
            key: 'loaiVe'
        },
        {
            title: 'Cổng check-in',
            dataIndex: 'congCheckIn',
            key: 'congCheckIn'
        },
        {
            titlle: '',
            dataIndex: 'tinhTrangDoiSoat',
            render: (text: any) => {
                if (text) {
                    return <span className='italic text-red-500 font-medium text-sm'>Đã đổi soát</span>
                }
                return <span className='italic text-gray-400 font-medium text-sm'>Chưa đổi soát</span>
            }
        }
    ];

    const data = lst

    const initialValues: FilterTicket = {
        maSuKien: "CEC2021",

    }

    const handleSelectChangeValue = (value: string) => {
        formik.setFieldValue('maSuKien', value)
    }
    const [value, setValue] = useState('')
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values) => {
            dispatch(filterTickerActionCreator(values))
        }

    })

    const handleRadioChangeValue = (e: RadioChangeEvent) => {
        const { value } = e.target
        if (value) {
            setVisibleButton(true)
        } else {
            setVisibleButton(false)
        }
        setValue(value)
        formik.setFieldValue('tinhTrangDoiSoat', value)

    }
    const handleOnChange = (value: any, name: string) => {
        formik.setFieldValue(name, value)
    }

    useEffect(() => {
        dispatch(getTicketListActionCreator())
        dispatch(getEventListActionCreator())
        dispatch(filterTickerActionCreator(initialValues))
    }, [])

    const csvContent = lst.map((ele: TicketList, index: number) => {
        return {
            "STT": index,
            "Số Vé": ele.soVe,
            "Tên Sự Kiện": ele.tenSuKien,
            "Ngày Sử Dụng": moment(ele.ngaySuDung).format('DD/MM/YYYY'),
            "Ngày Hết Hạn": moment(ele.ngayHetHan).format('DD/MM/YYYY'),
            "Cổng CheckIn": ele.congCheckIn,
            "Tình Trạng Đối Soát": ele.tinhTrangDoiSoat ? 'Đã đối soát' : "Chưa đối Soát"
        }
    })
    return (
        <div className='flex'>
            <div className='mr-5 bg-white p-6 rounded-3xl w-full'>
                {/* input search */}
                <h1 className='font-black text-3xl mb-6' style={{ lineHeight: "54px", color: "#1E0D03" }}>Đối soát vé</h1>
                <div className='flex justify-between items-center'>
                    <InputSearch size='small' placeholder='Tìm bằng số vé'></InputSearch>
                    {visibleButton ? <button onClick={() => {
                        downloadCSV(csvContent,'DoiSoatVe')
                    }} className='button--white'>Xuất file(.csv)</button> : <button className='button--orange'>Chốt đối soát</button>}
                </div>
                <Table className='mt-6 ' columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }} />
            </div>

            <div className='rounded-3xl bg-white p-6' style={{ width: '320px' }}>
                <form onSubmit={formik.handleSubmit} className='block h-full'>
                    <h3 className='font-bold text-2xl' style={{ marginBottom: '29px' }}>Lọc Vé</h3>
                    <Select options={options} defaultValue='CEC2021' onChange={handleSelectChangeValue} style={{ width: '280px', background: '#F1F4F8', borderRadius: '8px', marginBottom: '24px' }}>

                    </Select>
                    <div className='flex justify-between mb-6'>
                        <p className='whitespace-nowrap mb-0 font-semibold text-base'>tình trạng đối soát</p>
                        <Radio.Group name='tinhTrangDoiSoat' style={{ flexBasis: '110px' }} onChange={handleRadioChangeValue} value={value}>
                            <Space direction="vertical">
                                <Radio value={''}>tất cả</Radio>
                                <Radio value={true}>đã đổi soát</Radio>
                                <Radio className='whitespace-nowrap' value={false}>chưa đối soát</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                    <div className='flex justify-between mb-6'>
                        <p className='mb-0 font-semibold text-base'>loại vé</p>
                        <p className='mb-0' style={{ flexBasis: '110px' }}>vé cổng</p>
                    </div>
                    <div className='flex justify-between items-center mb-6'>
                        <p className='mb-0 font-semibold text-base'>từ ngày</p>
                        <DatePicker format='DD/MM/YYYY' name='startTime' onChange={handleOnChange}></DatePicker>

                    </div>
                    <div className='flex justify-between items-center mb-6'>
                        <p className='mb-0 font-semibold text-base'>đến ngày</p>
                        <DatePicker format='DD/MM/YYYY' name='endTime' onChange={handleOnChange}></DatePicker>
                    </div>
                    <div className='text-center'>
                        <button type='submit' className='button--white w-40 h-12'>Lọc</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
