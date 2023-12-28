import React, { Component } from "react";
import Chart from "react-apexcharts";

const Charts = ({ stattt }) => {
    let stat = stattt;
    let label = [];
    let val1 = [];
    let val2 = [];
    let val3 = [];

    for (let i = 0; i < stat.length; i++) {
        label.push(stat[i].date);
    }
    for (let i = 0; i < stat.length; i++) {
        val1.push(stat[i].quizFau);
    }
    for (let i = 0; i < stat.length; i++) {
        val2.push(stat[i].quizCorrect);
    }
    for (let i = 0; i < stat.length; i++) {
        val3.push(stat[i].quizPasRep);
    }
    console.log('label');
    console.log(label);
    console.log('val1');
    console.log(val1);
    console.log('val2');
    console.log(val2);
    console.log('val3');
    console.log(val3);

    let state = {
        series: [

            {
                name: 'false',
                type: 'area',
                data: val1
            },
            {
                name: 'true',
                type: 'area',
                data: val2
            },
            {
                name: 'zapé',
                type: 'area',
                data: val3
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
            colors: ['red', 'green', 'orange'],
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