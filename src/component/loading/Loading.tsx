import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../redux/configStore';
export default function Loading() {

    const {display} = useSelector((state:State)=> state.loadingReducer)
  
    return <div id='loading' className='fixed top-0 left-0 h-screen w-screen ' style={{
        backgroundColor: "rgb(239,247,247)",
        opacity: '0.6',
        zIndex: 9999,
        display: display
    }}>
        <img src={require('../../assets/img/loading/Curve-Loading.gif')} alt='icon-loading' className='absolute top-1/2 left-1/2  h-28 object-cover' style={{
            transform: 'translate(-50%,-50%)',
            height: '200px',
            objectFit: 'cover'
        }}></img>
    </div>;
}
