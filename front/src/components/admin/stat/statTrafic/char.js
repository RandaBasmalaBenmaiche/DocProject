import React, { Component } from "react";
import Chart from "react-apexcharts";

const Charts = ({ vst }) => {
    let stat = vst;
    console.log(vst)
    let label = [];
    let val1 = [];
    let val2 = [];
    let val3 = [];

    for (let i = 0; i < stat.length; i++) {
        label.push(stat[i].date);
    }
    for (let i = 0; i < stat.length; i++) {
        val1.push(stat[i].visitor);
    }

    let state = {
        series: [

            {
                name: 'visitor',
                type: 'area',
                data: val1
            },

        ],
        options: {
            chart: {
                type: "area",
                foreColor: "black",
                stacked: false,
                toolbar: {
                    autoSelected: "pan",
                    show: true
                },
                zoom: {
                    autoScaleYaxis: false
                }


            },
            colors: ['green'],
            stroke: {
                curve: 'smooth',
                width: 3
            },
            grid: {
                borderColor: "",
                clipMarkers: false,
                yaxis: {
                    lines: {
                        show: false
                    }
                },

            },
            dataLabels: {
                enabled: false,

            },
            fill: {
                type: 'gradient',
                gradient: {

                    shadeIntensity: -250,
                    opacityFrom: 0.05,
                    opacityTo: 0.2,
                    stops: [0, 100]
                }
            },
            markers: {
                size: 3,
                style: 'hollow',
            },


            xaxis: {
                type: "datetime",

            },
            yaxis: {
                min: 0,
                tickAmount: 4
            },
            xaxis: {
                categories: label
            }
        },

    };



    return (
        <div className="app">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={state.options}
                        series={state.series}

                        width="100%"
                    />
                </div>
            </div>
        </div>
    );

}

export default Charts;