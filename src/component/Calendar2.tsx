import React from 'react'
import { useState, useRef, useEffect } from 'react'
import moment from 'moment'
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Radio, RadioChangeEvent } from 'antd';
import DatePicker from './DatePicker';
const getDay = (date: Date) => {
    if (date.getDay() === 0) {
        return 7;
    }
    return date.getDay()
}
let count = 0;
export default function Calendar2(props: any) {
    const { setValueProps, visibleProps, setOptionProps } = props

    const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
    const today = new Date();
    const [date, setDate] = useState(today)
    console.log('date', date)
    const [radioValue, setRadioValue] = useState(1)
    const year = date.getFullYear()
    const month = date.getMonth()
    const startDayInMonth = getDay(new Date(year, month, 1))
    const lastDayInMonth = getDay(new Date(year, month + 1, 0))
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()

    const dates: any = []

    const handleOnChange = (e: RadioChangeEvent) => {
        const { value } = e.target;
        setRadioValue(value)
    }
    const ref = useRef<any>(null);
    useEffect(() => {
        setOptionProps(dates)
    }, [date])
    useEffect(() => {
        setOptionProps(dates)
    }, [radioValue == 2])

    return (

        <div ref={ref} className="calendar" style={{ display: `${visibleProps ? 'block' : 'none'}` }}>
            <div className='header flex items-center'>
                <LeftOutlined onClick={() => {
                    setDate(new Date(year, month - 1, date.getDate()))
                    setValueProps(new Date(year, month - 1, date.getDate()))
                }} />
                <p className='mb-0 px-2'>{`Tháng ${month + 1}, ${year}`}</p>
                <RightOutlined onClick={() => {
                    setDate(new Date(year, month + 1, date.getDate()))
                    setValueProps(new Date(year, month + 1, date.getDate()))
                }
                } />
            </div>
            <Radio.Group className='radio-group' onChange={handleOnChange} value={radioValue}>
                <Radio value={1}>Theo tháng</Radio>
                <Radio value={2}>Theo tuần</Radio>
            </Radio.Group>
            <div className='week-container'>
                {DAYS.map((day, index) => {
                    return <div className='week-cell' key={index}>
                        {day}
                    </div>
                })}
            </div>
            <div className='day-container'>
                {/* render ngày trong tháng trc đó nhưng nằm trong tuần của tháng hiện tại */}
                {Array(startDayInMonth - 1).fill(0).map((_, index) => {
                    const day = daysInPrevMonth - startDayInMonth + 2 + index
                    return <div onClick={() => {
                        setDate(new Date(year, month - 1, day))
                        setValueProps(new Date(year, month - 1, day))
                    }} key={index} className="day-cell day-cell-prev-month">
                        {day}
                    </div>
                })}
                {/* render ngày trong tháng hiện tại*/}
                {Array(daysInMonth).fill(0).map((_, index) => {
                    let style = '';

                    if (radioValue === 2) {

                        let range = index
                        console.log('date.getDate(), startOf', date.getDate(), startDayInMonth)
                        // ta mất  startDayInMonth = number cột cho tháng trc đó -> cần 7- number  = colums thuộc row = 0
                        // do  0 - 6 = sunday -monday mà giao diên là monday -sunday => số columns  =  startDayInMonth - 1
                        // date.getDate() bắt đầu từ  0 -> ... => row = date.getDate() + startDayInMonth - 2) / 7 (voi 7 tương ứng với 7 phần tử trên 1 row)
                        const row: number = Math.floor((date.getDate() + startDayInMonth - 2) / 7)
                        const rowIndex = Math.floor((range + startDayInMonth - 1) / 7)

                        if (row === rowIndex) {
                            if (index === 0) { // row === 0
                                style = 'day-cell-first'
                                dates.push(new Date(year, month, index + 1))

                            } else if (index === row * 7 - (startDayInMonth - 1)) {
                                style = ' day-cell-first'
                                dates.push(new Date(year, month, index + 1))
                            } else if (index === (row * 7 + 7 - startDayInMonth)) {
                                style = 'day-cell-last'
                                dates.push(new Date(year, month, index + 1))

                            } else if (row === 4) {
                                console.log('row === ', index)
                                if (index === (row * 7 + 7 - startDayInMonth - (6 - lastDayInMonth) - 1)) {
                                    style = 'day-cell-last'
                                    dates.push(new Date(year, month, index + 1))

                                } else {
                                    style = 'day-cell-center'
                                    dates.push(new Date(year, month, index + 1))

                                }
                            } else {
                                style = 'day-cell-center'
                                dates.push(new Date(year, month, index + 1))

                            }
                        }
                    }

                    return <div onClick={() => {
                        setDate(new Date(year, month, index + 1))
                        setValueProps(new Date(year, month, index + 1))


                    }} key={index} className={`day-cell day-cell-in-month ${style}
                        ${index + 1 === today.getDate() &&
                            month === today.getMonth() &&
                            year === today.getFullYear() &&
                            today.getDate() === date.getDate() ? 'day-cell-today' : ''
                        }
                        ${index + 1 === date.getDate() &&
                            month === date.getMonth() &&
                            year === date.getFullYear() ? 'day-cell-selected' : ''
                        }
                    
                        `}

                    >
                        {index + 1}
                    </div>
                })}
                {/* render ngày trong tháng kế tiếp nhưng thuộc trong tuần của tháng hiện tại  */}
                {Array(42 - daysInMonth - startDayInMonth + 1).fill(0).map((_, index) => {
                    return <div key={index} className="day-cell day-cell-next-month " onClick={() => {
                        setDate(new Date(year, month + 1, index + 1))
                        setValueProps(new Date(year, month + 1, index + 1))
                    }} >
                        {index + 1}
                    </div>
                })}
            </div>
        </div>


    )
}
