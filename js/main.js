isDataFetched = false;
var erpDataG = [];


async function getERPDataAPI() {
    const sid = document.getElementById("sid");
    const url = 'https://notes.pushpendersaini.com/tools/erpdvapi/getAbsentSummaryData.php?sid=';
    const response = await fetch(url + sid.value);
    const data = await response.json();
    return data;
}

function getCourses(data) {
    const cources = new Set();
    const addToSet = (item) => {
        cources.add(item.courseName);
    }
    data.forEach(addToSet);
    return [...cources];
}

function addButton(name) {
    const btn = document.createElement("BUTTON");
    btn.setAttribute("class", "btn btn-secondary");
    btn.setAttribute("onclick", `plotData("${name}")`);
    btn.innerHTML = name;
    const courcesButtonGroup = document.getElementById('cources-btn-group');
    courcesButtonGroup.appendChild(btn);
}

function getAttandance(cource) {
    var totalClasses = 0;
    var present = 0;
    const getEntry = (item) => {
        if (cource.localeCompare(item.courseName) == 0) {
            if ("Present".localeCompare(item.status) == 0) {
                totalClasses = totalClasses + 1;
                present = present + 1;
            }
            else {
                totalClasses = totalClasses + 1;
            }
        }
    }
    erpDataG.forEach(getEntry);
    return { "totalClasses": totalClasses, "present": present };
}

function plotSummaryTable(cource) {
    const table = document.getElementById('summary-table-area');
    const attandance = getAttandance(cource);
    const attandanceP = ((attandance.present / attandance.totalClasses) * 100).toFixed(2);

    var leaves = 0;
    var tattandanceP = attandanceP;
    var str = "";

    if (attandanceP >= 70) {
        str = "can miss";
        while (tattandanceP > 70) {
            leaves = leaves + 1;
            tattandanceP = (((attandance.present) / (attandance.totalClasses + leaves)) * 100).toFixed(2);
        }
        if (attandanceP != 70) leaves = leaves - 1;
    }
    else {
        str = "need to attend";
        while (tattandanceP <= 70) {
            leaves = leaves + 1;
            tattandanceP = (((attandance.present + leaves) / (attandance.totalClasses + leaves)) * 100).toFixed(2);
            console.log(tattandanceP);
        }
    }

    table.innerHTML = `<table class='table table-bordered'><caption>${cource}</caption><tbody><tr><th scope='row'>Your Attandance :</th><td> ${attandanceP}% </td></tr><tr><th scope='row'>Classes you ${str} to maintain 70%</th><td> ${leaves} </td></tr></tbody></table>`;
}

function plotAbsentSummaryTable(cource) {
    const table = document.getElementById('absent-summary-table-area');
    var str = "";
    var num = 0;
    const getEntry = (item) => {
        if (cource.localeCompare(item.courseName) == 0) {
            if ("Absent".localeCompare(item.status) == 0) {
                num = num + 1;
                str = str + `<tr><td> ${num} </td><td> ${item.date} </td><td> ${item.time} </td></tr>`;
            }
        }
    }
    erpDataG.forEach(getEntry);
    table.innerHTML = `<br><br><h2>Classes you were marked abset in ${cource}</h2><table class='table table-bordered'><tbody><tr><th scope='col'>S.No</th><th scope='col'>Date</th><th scope='col'>Time</th></tr>${str}</tbody></table>`;
}

async function getERPData() {
    if (!isDataFetched) {
        const getDataBtn = document.getElementById('get-data-btn');
        const errorBox = document.getElementById('error-alert-box');

        getDataBtn.innerHTML = "<div class='spinner-border'></div>";

        const erpData = await getERPDataAPI();
        if ((erpData.length) < 1) {
            errorBox.innerHTML = "<div class='alert alert-danger' role='alert'>Could not fetch data</div>";
            getDataBtn.innerHTML = "Get Data";
            return "ERROR";
        }
        errorBox.innerHTML = "";
        erpDataG = erpData;
        const cources = getCourses(erpData);
        cources.forEach(addButton);
        isDataFetched = true;
        getDataBtn.disabled = true;
        getDataBtn.innerHTML = "Data Loaded";
    }
    else { }

}

function getCoursePlotX(cource) {
    const plotX = [];
    const getEntry = (item) => {
        if (cource.localeCompare(item.courseName) == 0) {
            plotX.push(item.date);
        }
    }
    erpDataG.forEach(getEntry);
    return plotX;
}
function getCoursePlotY(cource) {
    const plotY = [];
    var totalClasses = 0;
    const getEntry = (item) => {
        if (cource.localeCompare(item.courseName) == 0) {
            totalClasses = totalClasses + 1;
            plotY.push(totalClasses);
        }
    }
    erpDataG.forEach(getEntry);
    return plotY;
}

function getCoursePlotYP(cource) {
    const plotY = [];
    var totalClasses = 0;
    const getEntry = (item) => {
        if (cource.localeCompare(item.courseName) == 0) {
            if ("Present".localeCompare(item.status) == 0) {
                totalClasses = totalClasses + 1;
                plotY.push(totalClasses);
            }
            else {
                plotY.push(totalClasses);
            }
        }
    }
    erpDataG.forEach(getEntry);
    return plotY;
}

function plotData(cource) {

    plotSummaryTable(cource);

    document.getElementById('chart-area').innerHTML = "";
    const chartCanvas = document.createElement("CANVAS");
    const chartArea = document.getElementById('chart-area');
    chartArea.appendChild(chartCanvas);

    var ctx = chartCanvas.getContext('2d');
    const plotX = getCoursePlotX(cource);
    const plotY = getCoursePlotY(cource);

    const plotYP = getCoursePlotYP(cource);


    const seventyP = ((7 / 10) * plotX.length).toFixed(2);;

    var plotYS = [];
    for (var i = 0; i < plotX.length; i++) {
        plotYS.push(seventyP);
    }


    var chartData = {
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



    var myChart = new Chart(ctx, {
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

    plotAbsentSummaryTable(cource);

}
