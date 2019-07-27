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
    adjustMonthly(employeeData.annualsalary);
    $('.tbody').append(`
    <tr>
        <td>${employeeData.firstname}</td>
        <td>${employeeData.lastname}</td>
        <td>${employeeData.idnumber}</td>
        <td>${employeeData.title}</td>
        <td>${employeeData.annualsalary}</td>
        <td><div class="delete-button">
        <button id="delete-button">Delete</button>
            </div>
        </td>
    </tr>
    `)
    $('#first-name').val('')
    $('#last-name').val('')
    $('#id-number').val('')
    $('#title').val('')
    $('#annual-salary').val('')
}

function storeSalary() {
    let pn = $(this).closest('td').prev('td').text();
    console.log(pn);
}

function deleteEmployee() {
    console.log('This is actually talking.');
    $(this).closest('tr').remove();
}

function adjustMonthly(value) {
    let employeeMonthly = value / 12;
    monthlyTotal += employeeMonthly;
    monthlyTotal = Math.round(100 * monthlyTotal) / 100;
    if (monthlyTotal > 20000) {
        $('#monthly-cost').css('background-color', 'red');
    }
    monthlyTotalDisplay = monthlyTotal;
    formatMoney(monthlyTotalDisplay);
    $('#monthly-cost').text(monthlyTotalDisplay);
}

function formatMoney(number) {
    monthlyTotalDisplay = number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}