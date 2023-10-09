const advanceResultUrl = 'https://adhmmmtisement.onrender.com/advance/result';

const advanceResultQuery = {
    optionIds: [],
    budget: null,
};

const trackField = {
    counter: 3,
};

function populateAdvanceResultTable(data) {
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
    $('#advance-data-tbody').html(dataTableHtml);
}

function getAdvanceResultFromBackEnd(callback) {
    $.get(advanceResultUrl, advanceResultQuery)
        .done((result) => callback(null, result))
        .fail((message) => callback(message, null));
    advanceResultQuery['optionIds'] = [];
}

function refreshAdvanceResultTable(id) {
    getAdvanceResultFromBackEnd(function (err, data) {

        if (CheckDuplicates() == true) {
            return alert('Duplicate Option IDs Found! (Highlighted in Red)');
        }
        console.log("data" + JSON.stringify(data));
        if (err) return alert(err.responseJSON.error);
        populateAdvanceResultTable(data);

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
    $('#advance-result-input-form input')
        .not(':input[type=submit]')
        .each((_, input) => {
            console.log($(input).val());
            if ($(input).attr('key') == 'optionId') {
                advanceResultQuery['optionIds'].push($(input).val());
            }
            else if ($(input).attr('key') == 'budget') {
                advanceResultQuery['budget'] = $(input).val();
            }
            resultArray.push($(input).val());
        });
    advanceResultQuery['optionIds'] = advanceResultQuery['optionIds'].join();
    console.log("array: " + resultArray);
    console.log("advanceResultQuery['optionIds']: " + advanceResultQuery['optionIds']);
    console.log("advanceResultQuery: " + JSON.stringify(advanceResultQuery));
    console.log("length: " + advanceResultQuery['optionIds'].split(",").length);

    refreshAdvanceResultTable(advanceResultQuery['optionIds']);
    return false;
}

function registerAdvanceResultInput() {
    $('#advance-result-input-form').submit(compute);
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
    registerAdvanceResultInput();
    CheckDuplicates();
});

$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});

