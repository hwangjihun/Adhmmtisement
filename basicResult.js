const basicResultUrl = 'http://localhost:3000/basic/result';

const basicResultQuery = {
    optionIds: [],
    budget: null,
};

const trackField = {
    counter: 3,
};

function populateBasicResultTable(data) {
    console.log(data);
    let dataTableHtml = data.result.map(
        ({ optionId, amount, audienceReached }) => `
            <tr>
                <th scope="row">${optionId}</th>
                <td>${amount}</td>
                <td>${audienceReached}</td>
            </tr>
    `,
    );
    let accumulatedAudience = data.result.reduce((sum, { audienceReached }) => sum + audienceReached, 0)
    dataTableHtml += `
        <tr>
            <th scope="row"></th>
            <td></td>
            <td>Total Audience: ${accumulatedAudience}</td>
        </tr>
        `
    $('#basic-data-tbody').html(dataTableHtml);
}

function getBasicResultFromBackEnd(callback) {
    $.get(basicResultUrl, basicResultQuery)
        .done((result) => callback(null, result))
        .fail((message) => callback(message, null));
    basicResultQuery['optionIds'] = [];
}

function refreshBasicResultTable() {
    getBasicResultFromBackEnd(function (err, data) {

        if (CheckDuplicates() == true) {
            return alert('Duplicate Option IDs Found! (Highlighted in Red)');
        }
        console.log("data" + JSON.stringify(data));
        if (err) return alert(err.responseJSON.error);
        populateBasicResultTable(data);

    });
}

function CheckDuplicates() {
    let values = [];  //Create array where we'll store values

    $(".duplicate").removeClass("duplicate"); //Clear all duplicates
    let $inputs = $('input[class="form-control text-center"]'); //Store all inputs 

    $inputs.each(function () {   //Loop through the inputs

        let v = this.value;
        if (!v) return true; //If no value, skip this input

        //If this value is a duplicate, get all inputs from our list that
        //have this value, and mark them ALL as duplicates
        if (values.includes(v)) $inputs.filter(function () { return this.value == v }).addClass("duplicate");

        values.push(v); //Add the value to our array
    });

    return $(".duplicate").length > 0;
};

function compute() {
    let resultArray = [];
    $('#basic-result-input-form input')
        .not(':input[type=submit]')
        .each((_, input) => {
            console.log($(input).val());
            if ($(input).attr('key') == 'optionId') {
                basicResultQuery['optionIds'].push($(input).val());
            }
            else if ($(input).attr('key') == 'budget') {
                basicResultQuery['budget'] = $(input).val();
            }
            resultArray.push($(input).val());
        });
    basicResultQuery['optionIds'] = basicResultQuery['optionIds'].join();
    console.log("array: " + resultArray);
    console.log("basicResultQuery['optionIds']: " + basicResultQuery['optionIds']);
    console.log("basicResultQuery: " + JSON.stringify(basicResultQuery));
    console.log("length: " + basicResultQuery['optionIds'].split(",").length);

    refreshBasicResultTable(basicResultQuery['optionIds']);
    return false;
}

function registerBasicResultInput() {
    $('#basic-result-input-form').submit(compute);
}

function addDeleteButton() {

    $('#add').click(function () {
        // $('#optionTemplate').empty();
        let fieldAddHTML = `<div class="form-group text-white text-center" id="field${trackField['counter']}"> <input required type="number" class="form-control text-center" key="optionId" placeholder="Option Id" onchange=CheckDuplicates()>`;
        fieldAddHTML += `<button type="button" class="btn btn-danger remove" id="remove${trackField['counter']}">Remove</button></div>`;
        $('#options').append(fieldAddHTML);
        trackField['counter']++;
    });

    $('body').on('click', '.remove', (function (event) {
        deleteField = event.target.id;
        console.log(deleteField);
        $("#" + deleteField).closest('div').remove();
    }));
}

$(document).ready(function () {
    addDeleteButton();
    registerBasicResultInput();
    CheckDuplicates();
});

$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});

