import { getCourses, getAttandance } from './dataProcessor.js'

export function plotGraph(data) {

    document.getElementById('chart-area').innerHTML = "";
    const chartCanvas = document.createElement("CANVAS");
    const chartArea = document.getElementById('chart-area');
    chartArea.appendChild(chartCanvas);

    let ctx = chartCanvas.getContext('2d');
    const plotX = data.dates;
    const plotY = Array.from({ length: data.dates.length }, (_, index) => index + 1);

    const plotYP = data.classAttended;

    const seventyP = ((7 / 10) * plotX.length).toFixed(2);;

    const plotYS = [];
    for (let i = 0; i < plotX.length; i++) {
        plotYS.push(seventyP);
    }

    const chartData = {
        labels: plotX,
        datasets: [{
            type: 'line',
            label: '# Present',
            fill: false,
            // borderJoinStyle: 'round',
            borderWidth: 2,
            borderColor: "#118AB2",
            pointBorderColor: "#118AB2",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointRadius: 4,
            pointHitRadius: 4,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 2,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(0,153,153,1)",
            data: plotYP
        }, {
            type: 'line',
            label: '# 70% Mark',
            data: plotYS,
            fill: false,
            borderColor: '#F71735',
            borderDash: [5, 5],
            pointRadius: 0,
            borderWidth: 2
        }, {
            type: 'bar',
            label: '# Total Classes',
            backgroundColor: 'rgb(0,255,0)',
            data: plotY,



            backgroundColor: '#9EE493',
            borderColor: "#6CD65C",
            borderWidth: 2,

        }]

    };

    new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Total classes vs present'
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


// helper function for plotSummaryGraph
function getColors(data) {
    // returns an Array of n colors, 
    // if less than 70, red else green.
    let colors = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i] >= 70)
            colors.push(`hsla(140, 50%, 60%, 1)`);
        else
            colors.push(`hsla(0, 50%, 60%, 1)`);
    }
    return colors
}

//-Custom Plugin-//
let originalLineDraw = Chart.controllers.horizontalBar.prototype.draw;
Chart.helpers.extend(Chart.controllers.horizontalBar.prototype, {

    draw: function () {
        originalLineDraw.apply(this, arguments);

        let chart = this.chart;
        let ctx = chart.chart.ctx;

        let index = chart.config.options.lineAtIndex;
        if (index) {

            let xaxis = chart.scales['x-axis-0'];
            let yaxis = chart.scales['y-axis-0'];

            let x1 = xaxis.getPixelForValue(index);
            let y1 = yaxis.top;

            let x2 = xaxis.getPixelForValue(index);
            let y2 = yaxis.bottom;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.strokeStyle = 'red';
            ctx.lineTo(x2, y2);
            ctx.stroke();

            ctx.restore();
        }
    }
});

export function plotSummaryGraph(data) {
    document.getElementById('chart-area').style.margin = "0px 0px 30px 0px";
    document.getElementById('chart-area').innerHTML = "";
    const chartCanvas = document.createElement("CANVAS");
    const chartArea = document.getElementById('chart-area');
    chartArea.appendChild(chartCanvas);

    let ctx = chartCanvas.getContext('2d');

    const courses = getCourses(data);
    let courseAttendance = [];
    courses.forEach((course) => {
        courseAttendance.push(getAttandance(data, course).percentage);
    });

    data = {
        datasets: [{
            type: 'horizontalBar',
            data: courseAttendance,
            label: "Subject Attendance",
            backgroundColor: getColors(courseAttendance)
        }],
        labels: courses
    };

    new Chart(ctx, {
        type: 'horizontalBar',
        data: data,
        options: {
            lineAtIndex: 70,
            responsive: true,
            title: {
                display: true,
                text: 'Quick Overview'
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 100
                    }
                }]
            }
        }
    });

}

