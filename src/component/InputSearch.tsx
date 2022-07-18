import React from 'react';
import { SearchOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux';
import { searchByTicketNumberActionCreator } from '../redux/action-creator/quanLyVeActionCreator';
export default function InputSearch(props: any) {

    const dispatch = useDispatch()
    const { placeholder, size } = props
    return <div className= {`input-group-${size}`}>
        <input className= {`input-control-${size}`} placeholder={placeholder} onChange={(e) => {

            dispatch(searchByTicketNumberActionCreator(e.target.value))
        }}></input>
        <SearchOutlined className='icon-control' />
    </div>
}
