$(document).ready(readyNow);

let monthlyTotal = 0;

let monthlyTotalDisplay;

function readyNow() {
    $('#submit-button').on('click', submitEmployee);
    $('.table').on('click', '.delete-button', storeSalary);
    $('.table').on('click', '.delete-button', deleteEmployee);
    $('#monthly-cost').append(monthlyTotal);
}

function submitEmployee() {
    let employeeData = {
        firstname: $('#first-name').val(),
        lastname: $('#last-name').val(),
        idnumber: $('#id-number').val(),
        title: $('#title').val(),
        annualsalary: $('#annual-salary').val()
    }
    let salToConvert = Number(employeeData.annualsalary);
    if (salToConvert > 9999999999.99) {
        $('#annual-salary').val('')
        alert(`There's no way anyone makes that much money!`);
        return false;
    }
    if (salToConvert < 0.01) {
        $('#annual-salary').val('')
        alert(`Please enter a valid salary.`);
        return false;
    }

    adjustMonthly(employeeData.annualsalary);
    let convertedSal = convertEmploySal(salToConvert);
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
    let salaryToDeleteAsString = $(this).closest('td').prev('td').text();
    let salaryToDelete = Number(salaryToDeleteAsString.replace(/[^0-9.-]+/g, ''));
    salaryToDelete = -salaryToDelete;
    adjustMonthly(salaryToDelete);
}

function deleteEmployee() {
    $(this).closest('tr').remove();
}

function adjustMonthly(value) {
    let employeeMonthly = value / 12;
    monthlyTotal += employeeMonthly;
    monthlyTotal = Math.round(100 * monthlyTotal) / 100;
    if (monthlyTotal > 20000) {
        $('#monthly-cost').css('background-color', 'red');
    } else if (monthlyTotal <= 20000) {
        $('#monthly-cost').css('background-color', 'white');
    }
    if (monthlyTotal <= 0) {
        monthlyTotal = 0;
    }  //  This code may look weird, but without it, I experienced a glitch where I could get Total Monthly to equal -$0.00.  To replicate this, I entered first value as 55555.55, and second value as 65555.55.  Then, I deleted the first value, then I deleted the second value.  -$0.00 displayed as the Total Monthly.
    monthlyTotalDisplay = monthlyTotal;
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