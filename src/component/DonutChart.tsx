import React from 'react'
import { useState } from 'react'
const strokes = ['#FF8A48', '#4F75FF']
interface propDonutChart {
    propData: number[],
    name: string,
    label: number[]

}
export default function DonutChart(props: propDonutChart) {
    const { propData, name, label } = props
    let chart_style = ""
    let radius = 20
    const renderDonutChart = (perArr: number[]) => {
        console.log('perarr', perArr)
        let perimeter = 2 * radius * Math.PI
        let rate = perimeter / 100
        let stroke_dasharray = ""
        let offset = 0
        let chartItems = perArr.map((per, idx) => {
            let per_o = per * rate
            stroke_dasharray = stroke_dasharray ? `0,${offset},${per_o},${perimeter - offset - per_o}` : `${per_o},${perimeter - per_o},0,0`
            offset += per_o
            chart_style += `
           .donut${idx + 1}_${name} {
             stroke: ${strokes[idx]};
             transform-origin: center;
             animation: donut${idx + 1}_${name} 2s ease both;
             &:hover{
                 fill: 'red'
             }
           }
           @keyframes donut${idx + 1}_${name} {
             50%, 100% {stroke-dasharray: ${stroke_dasharray};}
             0% { transform: scale(0.5, 0.5); }
             50% { transform: scale(1, 1); }
           }
        `
            return (
                <circle key={idx} className={`donut${idx + 1}_${name}`} cx={`${2 * radius}`} cy={`${2 * radius}`} r={`${radius}`} strokeWidth={`${radius - 5}`} fill="transparent" strokeDashoffset={`${25 * rate}`} strokeDasharray={`0,0,0,${perimeter}`} />
            )
        })
        return <>
            <style>{chart_style}</style>
            <svg viewBox={`0 0 ${4 * radius} ${4 * radius}`}>
                {chartItems}
            </svg>
            {label[0] !== 0 ? <span className={`label1_${name} absolute`}>{label[0]}</span> : ''}
            {label[1] !== 0 ? <span className={`label2_${name} absolute`}>{label[1]}</span> : ''}


        </>

    }
    return (
        <div className='donut-chart relative' style={{ height: 300, width: 300 }}>
            {renderDonutChart([...propData])}
        </div>
    )
}
