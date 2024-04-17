'use client'
import React, { useEffect, useRef, useContext } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment';
import 'chartjs-adapter-moment';
import { LineChartDataInterface } from '../utility/sells';



const LineChart = (sellsData: LineChartDataInterface) => {
  // const chartRef = useRef(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  // const context= useContext(ProductContext);
  // const colorStr = (theme==="system")? userTheme()==='dark'?"#fff":"#000":(theme==='dark')?"#fff" :"#000";

  const colorStr = "#000";

  useEffect(() => {
    if (sellsData && sellsData.totalLength > 0) {
      const chartData = {
        labels: sellsData.sellsData.map((data) => moment(data.date).format('YYYY-MM-DD')),
        datasets: [
          {
            label: 'Total Price',
            data: sellsData.sellsData.map((data) => data.totalPrice),
            fill: true, // show color in area
            // borderColor: 'rgb(75, 192, 192)',
            // borderColor: '#000',
            tension: 0.1,
            font: {
              size: 25,
              color: 'yellow'
            },
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)', // Change row colors
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)', // Change row border colors
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },

        ],
      };

      const chartOptions = {

        plugins: {
          title: {
            display: true,
            text: 'Sales Line Chart',
            color: colorStr, // Set color
            font: {
              size: 25,
            },
          },

        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'DD-MM-YYYY',
              },
            },
            ticks: {
              maxRotation: 45,
              minRotation: 45,
              color: colorStr // x-axis font color
            },
            border: {
              display: true // border on x axis
            },
            grid: {
              display: true, // Grid on x axix 
              drawOnChartArea: true,
              drawTicks: true,
              color: colorStr, // X- axis grid color
            }
          },
          y: {
            beginAtZero: false, // Auto matically set the Y-Axix starting value which is lowest value
            ticks: {
              stepSize: 15,
              callback: function (value: number) {
                return '₹' + value;
              },
              color: colorStr, // y-axis font color
            },
            border: {
              display: true,
            },
            grid: {
              // color: function(context) {
              //   if (context.tick.value > 0) {
              //     return 'rgb(255, 99, 132)';
              //   } else if (context.tick.value < 0) {
              //     return 'rgb(255, 99, 132)';
              //   }

              //   return '#000000';
              // },
              color: colorStr // Y-Axis grid color
            },
          },
        },
      };

      // @ts-ignore
      const chart = new Chart(chartRef.current, {
        type: 'line',
        data: chartData,
        options: chartOptions,
      });

      return () => {
        chart.destroy();
      };
    }
  }, [sellsData]);

  return <canvas ref={chartRef} />;
};

export default LineChart;

