import { Modal, Button, Input, TimePicker, Checkbox, Select } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addModalVisibleActionCreator, addTicketPackActionCreator, updateTicketPackActionCreator } from '../../../redux/action-creator/quanLyGoiVeActionCreator';
import { State } from '../../../redux/configStore';
import { useFormik } from 'formik';
import { TicketPack } from '../../../model/ticketPackageManagement/TicketPack'
import moment from 'moment';
import firebase from "firebase";
import { InfoTicketPack } from '../../../model/ticketPackageManagement/TicketPack'
import { Value } from 'sass';
import DatePicker from '../../../component/DatePicker';

const { Option } = Select;
export default function AddTicketPack() {

    const { isAddModalVisible, infoTicketPack } = useSelector((state: State) => state.ticketPackManagerReducer)
    const [disibleInputAnt, setdisibleInputAnt] = useState({
        elementTicketPrice: true,
        elementComboTicketPrice: true

    })
    const dispatch = useDispatch()
    const handleOk = () => {
        dispatch(addModalVisibleActionCreator(false))
    };
    const handleCancel = () => {
        dispatch(addModalVisibleActionCreator(false))
    };
    const initialValues = new InfoTicketPack()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: (values: TicketPack) => {
            const { maGoi, docId, ...data } = values;
            dispatch(addTicketPackActionCreator(data))

        }
    })

    const handleOnChangeDatePicker = (value: Date, name: string) => {
        console.log('value: date', value)
        const day = value.getDate()
        const month = value.getMonth()
        const year = value.getFullYear()
        console.log('day, month, year', day, month, year)
        let hour = formik.values.ngayApDung?.toDate().getHours()
        let minute = formik.values.ngayApDung?.toDate().getMinutes()
        let second = formik.values.ngayApDung?.toDate().getSeconds()
        if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
            hour = 0
            minute = 0
            second = 0
        }
        const timestamp = firebase.firestore.Timestamp.fromDate(new Date(year, month, day, hour, minute, second))
        formik.setFieldValue(name, timestamp)

    }
    const handleOnChangeTimePicker = (name: string, date: Date) => {

        return (value: any) => {
            const timePicker = new Date(moment(value).format())

            const day = date.getDate()
            const month = date.getMonth()
            const year = date.getFullYear()
            const hour = timePicker.getHours()
            const minute = timePicker.getMinutes()
            const second = timePicker.getSeconds()
            const timestamp = firebase.firestore.Timestamp.fromDate(new Date(year, month, day, hour, minute, second))

            formik.setFieldValue(name, timestamp)
        }
    }


    return (
        <>
            <Modal width={570} title="Th??m g??i v??" visible={isAddModalVisible} onOk={handleOk} onCancel={handleCancel}>

                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-5'>
                        <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>T??n G??i V??<span style={{ color: '#FD5959' }}>*</span></p>
                        <Input name='tenGoi' onChange={formik.handleChange} style={{ width: '367px', height: '40px', borderRadius: '8px' }} placeholder="Nh???p t??n g??i v??" />
                    </div>
                    <div className='flex items-center justify-between mb-5'>
                        <div className='mr-5'>
                            <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Ng??y ??p d???ng</p>
                            <div className='flex items-center'>
                                <DatePicker format='DD/MM/YYYY' onChange={handleOnChangeDatePicker} name='ngayApDung' ></DatePicker>
                                <TimePicker placeholder='hh:mm:ss' style={{ marginLeft: '12px', height: '40px', borderRadius: '8px' }} onChange={handleOnChangeTimePicker('ngayApDung', formik.values.ngayApDung?.toDate())}></TimePicker>
                            </div>
                        </div>
                        <div>
                            <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Ng??y h???t h???n</p>
                            <div className='flex items-center'>
                                <DatePicker format='DD/MM/YYYY' onChange={handleOnChangeDatePicker} name='ngayHetHan' ></DatePicker>
                                <TimePicker placeholder='hh:mm:ss' style={{ marginLeft: '12px', height: '40px', borderRadius: '8px' }} onChange={handleOnChangeTimePicker('ngayHetHan', formik.values.ngayHetHan?.toDate())}></TimePicker>
                            </div>

                        </div>
                    </div>
                    <div className='mb-5'>
                        <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>Gi?? v?? ??p d???ng</p>
                        <div className='mb-3'>
                            <Checkbox className=' font-medium' style={{ color: '#1E0D03', lineHeight: '20px', opacity: '0.7', fontSize: '16px' }} onChange={(e) => {
                                const { checked } = e.target;
                                if (checked) {
                                    setdisibleInputAnt({
                                        ...disibleInputAnt,
                                        elementTicketPrice: false
                                    })
                                } else {
                                    setdisibleInputAnt({
                                        ...disibleInputAnt,
                                        elementTicketPrice: true
                                    })
                                }
                            }} >V?? l??? (vn??/v??) v???i gi??</Checkbox>
                            <Input disabled={disibleInputAnt.elementTicketPrice} name='giaVe' onChange={formik.handleChange} className='rounded-lg ' style={{ width: '148px', height: '40px' }} placeholder='Gi?? v??' />
                            <span className='text-base font-medium opacity-70 inline-block mx-2' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>/</span>
                            <span className='text-base font-medium opacity-70 inline-block' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>V??</span>
                        </div>
                        <div>
                            <Checkbox className=' font-medium' style={{ color: '#1E0D03', lineHeight: '20px', opacity: '0.7', fontSize: '16px' }} onChange={(e) => {

                                const { checked } = e.target;
                                if (checked) {
                                    setdisibleInputAnt({
                                        ...disibleInputAnt,
                                        elementComboTicketPrice: false
                                    })
                                } else {
                                    setdisibleInputAnt({
                                        ...disibleInputAnt,
                                        elementComboTicketPrice: true
                                    })
                                }
                            }} >Combo v???i gi?? v??</Checkbox>
                            <Input disabled={disibleInputAnt.elementComboTicketPrice} name='giaCombo' onChange={(e) => {
                                const { value } = e.target
                                formik.setFieldValue('giaCombo', { ...formik.values.giaCombo, giaVe: value })
                            }} className='rounded-lg ' style={{ width: '148px', height: '40px' }} placeholder='Gi?? v??' />
                            <span className='text-base font-medium opacity-70 inline-block mx-2' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>/</span>
                            <Input disabled={disibleInputAnt.elementComboTicketPrice} name='giaCombo' onChange={(e) => {
                                const { value } = e.target
                                formik.setFieldValue('giaCombo', { ...formik.values.giaCombo, soVe: value })
                            }} className='rounded-lg mr-2 ' style={{ width: '148px', height: '40px' }} placeholder='S??? v??' />
                            <span className='text-base font-medium opacity-70 inline-block' style={{ color: '#1E0D03', lineHeight: '20px', fontSize: '16px' }}>V??</span>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <p className='mb-2 font-semibold text-base opacity-70' style={{ color: ' #1E0D03' }}>T??nh tr???ng</p>
                        <Select style={{ height: '40px', borderRadius: '8px', width: '176px' }} defaultValue={false} onChange={(value) => {
                            formik.setFieldValue('trangThai', value)
                        }}>
                            <Option value={true}>??ang s??? d???ng</Option>
                            <Option value={false}>Ch??a s??? d???ng</Option>

                        </Select>

                    </div>
                    <p className='text-xs italic'>
                        <span className='font-semibold' style={{ color: '#FD5959' }}>*</span>
                        <span style={{ color: '#1E0D03', opacity: '0.4' }}>    l?? th??ng tin b???t bu???c</span>
                    </p>
                    <div className='text-center'>
                        <button type='button' onClick={() => {
                            dispatch(addModalVisibleActionCreator(false))
                        }} className='button--white mr-5' style={{ width: '132px' }}>H???y</button>
                        <button type='submit' className='button--orange' style={{ width: '132px' }}>L??u</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}