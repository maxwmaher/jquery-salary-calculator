$(document).ready(readyNow);

let grandTotal = 0;

let monthlyTotalRaw = 0;

let monthlyTotalDisplay = '$0.00';

function readyNow() {
    $('#submit-button').on('click', submitEmployee);
    $('.table').on('click', '.delete-button', storeSalary);
    $('.table').on('click', '.delete-button', deleteEmployee);
    $('#myAlert').on('click', '.close', removeAlert);
    $('#monthly-cost').append(monthlyTotalDisplay);
}

function submitEmployee() {
    let employeeData = {
        firstname: $('#first-name').val(),
        lastname: $('#last-name').val(),
        idnumber: $('#id-number').val(),
        title: $('#title').val(),
        annualsalary: $('#annual-salary').val()
    }
    let salNumber = Number(employeeData.annualsalary);
    if (salNumber > 9999999999.99) {
        $('#annual-salary').val('');
        $('#myAlert').append(`
            <div id="firstAlert" class="alert alert-danger alert-dismissible fade show">
            <strong>Error!</strong> The salary you entered exceeds $1 trillion, which not even Jeff Bezos makes (yet).
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            `);
        return false;
    }
    if (salNumber < 0.01) {
        $('#annual-salary').val('')
        $('#myAlert').append(`
            <div id="secondAlert" class="alert alert-danger alert-dismissible fade show">
            <strong>Error!</strong> Please enter a valid salary.
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            `);
        return false;
    }

    adjustMonthly(salNumber);
    let convertedSal = convertEmploySal(salNumber);
    $('.tbody').append(`
    <tr>
        <td class="format-td1">${employeeData.firstname}</td>
        <td class="format-td1">${employeeData.lastname}</td>
        <td class="format-td1">${employeeData.idnumber}</td>
        <td class="format-td1">${employeeData.title}</td>
        <td class="format-td1">${convertedSal}</td>
        <td class="format-td2"><div class="delete-button">
        <button type="button" class="btn btn-outline-danger" id="delete-button">Delete</button>
            </div>
        </td>
    </tr>
    `);

    $('#first-name').val('');
    $('#last-name').val('');
    $('#id-number').val('');
    $('#title').val('');
    $('#annual-salary').val('');
}

function storeSalary() {
    let salaryStringDelete = $(this).closest('td').prev('td').text();
    let salaryNumberDelete = Number(salaryStringDelete.replace(/[^0-9.-]+/g, ''));
    salaryNumberDelete = -salaryNumberDelete;
    adjustMonthly(salaryNumberDelete);
}

function deleteEmployee() {
    $(this).closest('tr').remove();
}

function adjustMonthly(value) {
    grandTotal += value * 100;
    monthlyTotalRaw = grandTotal / 12 / 100;
    monthlyTotalRaw = Math.round(100 * monthlyTotalRaw) / 100;
    if (monthlyTotalRaw > 20000) {
        $('#monthly-cost').css('background-color', 'red');
    } else if (monthlyTotalRaw <= 20000) {
        $('#monthly-cost').css('background-color', 'white');
    }
    monthlyTotalDisplay = monthlyTotalRaw;
    if (monthlyTotalDisplay === -0) {
        monthlyTotalDisplay = 0;
    }
    formatMoney(monthlyTotalDisplay);
    $('#monthly-cost').text(monthlyTotalDisplay);
}

function formatMoney(number) {
    monthlyTotalDisplay = number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function convertEmploySal(number) {
    let salConversion = number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return salConversion;
}

function removeAlert() {
    $(this).closest('div').remove();
}