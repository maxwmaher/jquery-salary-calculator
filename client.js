$(document).ready(readyNow);

let monthlyTotal = 0;

function readyNow() {
    $('#submit-button').on('click', submitEmployee);
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
        <td>$${employeeData.annualsalary}</td>
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

function deleteEmployee() {
    $(this).closest('tr').remove();
}

function adjustMonthly(value) {
    let employeeMonthly = value / 12;
    monthlyTotal += employeeMonthly;
    monthlyTotal = Math.round(100 * monthlyTotal) / 100;
    $('#monthly-cost').empty(monthlyTotal);
    $('#monthly-cost').append(monthlyTotal);
}