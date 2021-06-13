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