import { errorBoxHandler } from "./errorBoxHandler.js";
import { getERPData } from "./apiHandler.js";
import { getCourses } from "./dataProcessor.js"
import { addButton, showCourceDetail, spinnerHandler } from "./domHelper.js";

const [showError, clearError] = errorBoxHandler;
const [addSpinner, removeSpinner] = spinnerHandler;
//button click handler
const btnClickHandler = event => {
    let data;
    addSpinner(true);
    if (event.target.id === "get-data-btn-sid")
        data = getERPData("SID")
    if (event.target.id === "get-data-btn-upd")
        data = getERPData("UPD")
    data.then(data => {
        if (data.length < 1) {
            throw "Could not fetch data";
        }
        else {
            document.getElementById('summary-table-area')
                .innerHTML = `
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Data Loaded Successfully</h4>
                <hr>
                <p>You can now click on each subject to get more
                    details about it !</p>
            </div>
            `;
            removeSpinner(true, "Data Loaded");
            clearError();
            getCourses(data).forEach(cource => {
                addButton(cource).addEventListener("click", showCourceDetail.bind(this, [data]));
            }
            );
        }
    }).catch(error => {
        removeSpinner(false, "Get Data");
        showError(error);
    });
}


//set click listners
document.getElementById("get-data-btn-sid").addEventListener("click", btnClickHandler);
document.getElementById("get-data-btn-upd").addEventListener("click", btnClickHandler);