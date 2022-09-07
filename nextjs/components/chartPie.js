import React from 'react'
import { Pie } from 'react-chartjs-2'

const ChartPie = ({chartData}) => {
    return (
        <Pie 
            data={chartData}
            options={
                {title: {
                    display: true,
                    text: "Power Consumption"
                },
                cutoutPercentage: 50}
            }
        />
    )
}

export default ChartPie