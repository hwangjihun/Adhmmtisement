const advanceCSVResultUrl = 'http://localhost:3000/advance/result';

const advanceCSVResultQuery = {
    optionIds: null,
    budget: null
};

const advanceCSVObject = {
    optionIdsLength: null,
    splitCounter: 1,
    splitClickedCounter: 0,
}

function populateAdvanceCSVResultTable(data) {
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

function getAdvanceCSVResultFromBackEnd(callback) {
    $.get(advanceCSVResultUrl, advanceCSVResultQuery)
        .done((result) => callback(null, result))
        .fail((message) => callback(message, null));
    advanceCSVResultQuery['optionIds'] = null;
}

function refreshAdvanceResultTable() {
    getAdvanceCSVResultFromBackEnd(function (err, data) {

        if (CheckDuplicates() == true) {
            return alert('Duplicate Option IDs Found! (Highlighted in Red)');
        }
        console.log("data" + JSON.stringify(data));
        if (err) return alert(err.responseJSON.error);
        populateAdvanceCSVResultTable(data);

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

function splitInputs() {
    if (advanceCSVObject['splitClickedCounter'] >= 0) {
        $('#budget').show();
        $('#submit').show();
    }

    console.log("counter: " + advanceCSVObject['splitCounter']);

    if (advanceCSVObject['splitCounter'] > 1) {
        $("#split").empty();
        advanceCSVObject['splitCounter'] = 1;
    }

    $('#advance-result-csv-input-form input')
        .not(':input[type=submit]')
        .each((_, input) => {
            console.log($(input).val());
            if ($(input).attr('key') == 'optionIds') {
                advanceCSVResultQuery['optionIds'] = $(input).val();
                console.log(advanceCSVResultQuery['optionIds']);
            }
        });

    if (advanceCSVResultQuery['optionIds'] == "") {
        $('#budget').hide();
        $('#submit').hide();
        return alert('Please enter the optionIds in CSV format before clicking the split button');
    }
    advanceCSVObject['optionIdsLength'] = advanceCSVResultQuery['optionIds'].split(',').length;

    console.log(advanceCSVObject['optionIdsLength']);

    console.log('CLicked');
    let splitField = '<h3 class="text-center text-white">Splitted User Inputs</h3> ';

    let items = advanceCSVResultQuery['optionIds'].split(',');
    for (let i = 0; i < advanceCSVObject['optionIdsLength']; i++) {

        splitField += `<div id="optionTemplate" class="form-group text-white text-center">
        <input required type="number" id="input${i}" class="form-control text-center" key="optionId" placeholder="Option Id" onchange=CheckDuplicates()>
        </div>
        `
    }

    $('#split').append(splitField);

    $('#split-inputs input')
        .not(':input[type=submit]')
        .each((index, input) => {
            console.log(input);
            console.log(index);
            console.log(items[index]);
            $("#input" + [index]).val(items[index]);
        });

    advanceCSVObject['splitCounter']++;
    advanceCSVObject['splitClickedCounter']++;
    return false;
}

function computeCSVResult() {
    $('#advance-result-csv-input-form input')
        .not(':input[type=submit]')
        .each((_, input) => {
            console.log($(input).val());
            if ($(input).attr('key') == 'optionIds') {
                advanceCSVResultQuery['optionIds'] = $(input).val();
                console.log(advanceCSVResultQuery['optionIds']);
            }
            else if ($(input).attr('key') == 'budget') {
                advanceCSVResultQuery['budget'] = $('#budget').val();
                console.log(advanceCSVResultQuery['optionIds'])
                console.log(advanceCSVResultQuery['budget'])
            }
        });
    refreshAdvanceResultTable();
    return false;
}

function splitAdvanceCSVResultInput() {
    $('#split-btn').click(splitInputs);
}

function registerAdvanceCSVResultInput() {
    $('#advance-result-csv-input-form').submit(computeCSVResult);
}

$(document).ready(function () {
    splitAdvanceCSVResultInput();
    registerAdvanceCSVResultInput();
    CheckDuplicates();
    $('#budget').hide();
    $('#submit').hide();
});

$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});