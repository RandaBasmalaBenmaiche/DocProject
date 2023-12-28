import React, { Component } from "react";
import Chart from "react-apexcharts";

const Charts = ({ stattt }) => {
    console.log("stattt")
    console.log(stattt)
    let stat = stattt;
    let label = [];
    let val1 = [];
    let val2 = [];
    let val3 = [];

    for (let i = 0; i < stat.length; i++) {
        const one = stat[i].date[0];
        const tue = stat[i].date[1];
        const day = one+''+tue;
        label.push(day);
    }
    for (let i = 0; i < stat.length; i++) {
        const val11 = stat[i].quizFau;
        const val22 = stat[i].quizCorrect;
        const val33 = stat[i].quizPasRep;
        const valfin= val11+val22+val33;
        val1.push(valfin);
    }

    console.log('label');
    console.log(label);
    console.log('val1');
    console.log(val1);
    

    let state = {
        series: [
            {
                name: 'question',
                type: 'area',
                data: val1
            },
        ],
        options: {
            chart: {
                type: "area",
                foreColor: "white",
                stacked: false,
                toolbar: {
                    autoSelected: "pan",
                    show: false,
                },
                zoom: {
                    autoScaleYaxis: false,
                }
            },
            colors: ['white'],
            stroke: {
                curve: 'smooth',
                width: 2
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