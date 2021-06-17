import { plotGraph } from "./graphHelper.js";
import { getAttandance, getAbsentSummary, getLeaveOfAbsenceSummary } from "./dataProcessor.js"

export function addButton(name) {
    const btn = document.createElement("BUTTON");
    btn.setAttribute("class", "btn btn-secondary");
    btn.setAttribute("id", name);
    btn.innerHTML = name;
    document.getElementById('cources-btn-group').appendChild(btn);
    return btn;
}

export function plotSummaryTable(data) {
    const table = document.getElementById('summary-table-area');
    const attandance = data;
    const attandanceP = ((attandance.present / attandance.totalClasses) * 100).toFixed(2);

    let leaves = 0;
    let tattandanceP = attandanceP;
    let str = "";

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
        }
    }

    table.innerHTML = `
    <h3 class='d-flex justify-content-center'>${data.courseName}</h3>
    <table class='table table-bordered'>
        <caption>${data.courseName}</caption>
        <tbody>
            <tr>
                <th scope='row'>Your Attandance :</th>
                <td> ${attandanceP}% </td>
            </tr>
            <tr>
                <th scope='row'>Classes you ${str} to maintain 70%</th>
                <td> ${leaves} </td>
            </tr>
            <tr>
                <th scope='row'>Total Classes</th>
                <td> ${data.totalClasses} </td>
            </tr>
            <tr>
                <th scope='row'>Total marked Present</th>
                <td> ${data.present} </td>
            </tr>
            <tr>
                <th scope='row'>Total marked Absent</th>
                <td> ${data.absent} </td>
            </tr>
            <tr>
                <th scope='row'>Total marked Leave Of Absence</th>
                <td> ${data.leaveOfAbsence} </td>
            </tr>
        </tbody>
    </table>`;
}


const plotAbsentSummaryTable = (data) => {
    const table = document.getElementById('absent-summary-table-area');
    let records = "";
    data.reverse().forEach((element, index) => {
        records += `<tr>
            <td> ${index + 1} </td>
            <td> ${element.date} </td>
            <td> ${element.time} </td>
        </tr>`
    });
    table.innerHTML = `
    <br>
    <h2>Classes you were marked absent</h2>
    <table class='table table-bordered'>
        <tbody>
            <tr>
                <th scope='col'>S.No</th>
                <th scope='col'>Date</th>
                <th scope='col'>Time</th>
            </tr>
            ${records || "<tr> <td> No Data Found </td> </tr>"}
        </tbody>
    </table>`;
}

const plotLeaveOfAbsenceSummaryTable = (data) => {
    const table = document.getElementById('loa-summary-table-area');
    let records = "";
    data.forEach((element, index) => {
        records += `<tr>
            <td> ${index + 1} </td>
            <td> ${element.date} </td>
            <td> ${element.time} </td>
        </tr>`
    });
    table.innerHTML = `
    <br>
    <h2>Classes you got leave of absence</h2>
    <table class='table table-bordered'>
        <tbody>
            <tr>
                <th scope='col'>S.No</th>
                <th scope='col'>Date</th>
                <th scope='col'>Time</th>
            </tr>
            ${records || "<tr> <td> No Data Found </td> </tr>"}
        </tbody>
    </table>`;
}


export function showCourceDetail(args, event) {
    const [data] = args;
    plotSummaryTable(getAttandance(data, event.target.id));
    plotGraph(getAttandance(data, event.target.id));
    plotAbsentSummaryTable(getAbsentSummary(data, event.target.id));
    plotLeaveOfAbsenceSummaryTable(getLeaveOfAbsenceSummary(data, event.target.id));
}

const addSpinner = isDisabled => {
    document.querySelectorAll(".btn-primary").forEach(btn => {
        btn.innerHTML = "<div class='spinner-border'></div>";
        btn.disabled = isDisabled;
    });
}
const removeSpinner = (isDisabled, text) => {
    document.querySelectorAll(".btn-primary").forEach(btn => {
        btn.innerHTML = text;
        btn.disabled = isDisabled;
    });

}

export const spinnerHandler = [addSpinner, removeSpinner];