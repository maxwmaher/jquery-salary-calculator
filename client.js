$(document).ready(readyNow);

let grandTotal = 0;

let monthlyTotalRaw = 0;

let monthlyTotalDisplay = '$0.00';

function readyNow() {
    $('#submit-button').on('click', submitEmployee);
    $('.table').on('click', '.delete-button', storeSalary);
    $('.table').on('click', '.delete-button', deleteEmployee);
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
        $('#annual-salary').val('')
        alert(`There's no way anyone makes that much money!`);
        return false;
    }
    if (salNumber < 0.01) {
        $('#annual-salary').val('')
        alert(`Please enter a valid salary.`);
        return false;
    }

    adjustMonthly(salNumber);
    let convertedSal = convertEmploySal(salNumber);
    $('.tbody').append(`
    <tr>
        <td>${employeeData.firstname}</td>
        <td>${employeeData.lastname}</td>
        <td>${employeeData.idnumber}</td>
        <td>${employeeData.title}</td>
        <td>${convertedSal}</td>
        <td><div class="delete-button">
        <button id="delete-button">Delete</button>
            </div>
        </td>
    </tr>
    `)

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