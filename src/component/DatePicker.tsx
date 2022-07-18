import React, { useState, useRef, useEffect } from 'react'
import { Input } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import Calendar2 from './Calendar2'
import moment from 'moment'

interface propsDatePicker {
    visibleProps?: boolean,
    name?: string,
    onChange?: any,
    defaultValue?: Date,
    format: string,
    size?: string,
    picker?: string

}

export default function DatePicker(props: propsDatePicker) {
    const { visibleProps, name, onChange, defaultValue, format, size } = props;
    const [visible, setVisible] = useState(visibleProps || false)
    const [value, setValue] = useState<any>()
    const [options, setOptions] = useState([])
  

    const ref = useRef<any>(null)
    useEffect(() => {
        if (value !== undefined && name !== undefined) {
            onChange(value, name)
        }

    }, [value])
    useEffect(() => {
        if(name === undefined &&  value !== undefined)
        onChange(value, options)
    }, [options])



    useEffect(() => {
        const checkIfClickedOutside = (e: any) => {

            if (visible && ref.current && !ref.current.contains(e.target)) {
                setVisible(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }

    }, [visible])

    return (
        <div ref={ref} className= {`datepicker-${size}`} >
            <div className='date-picker-control'>
                <Input value={value !== undefined ? moment(value).format(format) : defaultValue !== undefined ? moment(defaultValue).format(format) : ''}
                    onChange={(e) => {

                    }}
                    onFocus={() => { setVisible(true) }} className={`input-${size}`}
                />
                <CalendarOutlined className='icon-calendar cursor-pointer' onClick={() => {
                    setVisible((oldSate: boolean) => !oldSate)
                }} />

            </div>
            <Calendar2 setOptionProps={setOptions} setValueProps={setValue} visibleProps={visible} />
        </div>
    )
}
