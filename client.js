console.log('Hello World');

$(document).ready(readyNow);

function readyNow() {
    $('#submit-button').on('click', submitEmployee);
}

function submitEmployee() {
    let firstName = $('#first-name').val();
    let lastName = $('#last-name').val();
    let idNumber = $('#id-number').val();
    let title = $('#title').val();
    let annualSalary = $('#annual-salary').val();
    console.log(firstName);
    
    $('.tbody').append(`
    <tr>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${idNumber}</td>
        <td>${title}</td>
        <td>$${annualSalary}</td>
    </tr>
    `)
}