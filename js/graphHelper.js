import {getCourses, getAttandance} from './dataProcessor.js'

export function plotGraph(data) {

    document.getElementById('chart-area').innerHTML = "";
    const chartCanvas = document.createElement("CANVAS");
    const chartArea = document.getElementById('chart-area');
    chartArea.appendChild(chartCanvas);

    var ctx = chartCanvas.getContext('2d');
    const plotX = data.dates;
    const plotY = Array.from({ length: data.dates.length }, (_, index) => index + 1);

    const plotYP = data.classAttended;

    const seventyP = ((7 / 10) * plotX.length).toFixed(2);;

    const plotYS = [];
    for (var i = 0; i < plotX.length; i++) {
        plotYS.push(seventyP);
    }

    const chartData = {
        labels: plotX,
        datasets: [{
            type: 'line',
            label: '# Present',
            borderColor: 'rgb(0,0,255)',
            borderWidth: 2,
            fill: false,
            data: plotYP
        }, {
            type: 'line',
            label: '# 70% Mark',
            backgroundColor: 'rgb(255,0,0)',
            data: plotYS,
            fill: false,
            borderColor: 'rgb(255,0,0)',
            borderWidth: 2
        }, {
            type: 'bar',
            label: '# Total Classes',
            backgroundColor: 'rgb(0,255,0)',
            data: plotY,
            borderColor: 'white',
            borderWidth: 2
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
function generateColors(n){
    // returns an Array of n colors
    var colors = [];
    var avg = Math.floor(360/n);
    var hue = 0;
    for(var i=0; i<n; i++){
        hue += avg;
        colors.push(`hsla(${hue}, 50%, 60%, 1)`);
    }
    return colors
}

export function plotSummaryGraph(data){
    document.getElementById('chart-area').innerHTML = "";
    const chartCanvas = document.createElement("CANVAS");
    const chartArea = document.getElementById('chart-area');
    chartArea.appendChild(chartCanvas);

    var ctx = chartCanvas.getContext('2d');

    const courses = getCourses(data);
    var courseAttendance = [];
    courses.forEach( (course) =>{
        var courseData = getAttandance(data, course);
        courseAttendance.push(((courseData.present / courseData.totalClasses) * 100).toFixed(2));
    });

    data = {
        datasets: [{
            data: [...courseAttendance],
            backgroundColor: [...generateColors(courses.length)]
        }],
    
        labels: [...courses]
    };

    new Chart(ctx, {
        type: 'polarArea',
        data: data,
        options:{
            responsive: true,
            title: {
                display: true,
                text: 'Quick Overview'
            }}
    });

}

