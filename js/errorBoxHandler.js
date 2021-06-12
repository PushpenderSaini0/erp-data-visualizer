//get error box
const errorBox = document.getElementById('error-alert-box');

//functions for error box
const showError = (error) => {
    errorBox.innerHTML = `<div class='alert alert-danger' role='alert'>${error}</div>`;
}
const clearError = () => {
    errorBox.innerHTML = '';
}

export const errorBoxHandler = [showError, clearError];