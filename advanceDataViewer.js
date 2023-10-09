const advanceDataQuery = {
    companyId: null,
    audienceCount: null,
    cost: null,
    page: 0,
    pageSize: 5,
};

const advanceDataPaginationFunction = {
    gotoFirstPage: function () {
        advanceDataQuery['page'] = 0;
        console.log(`PageNo: ${advanceDataQuery['page']}`);
    },
    changePage: function (delta) {
        advanceDataQuery['page'] += parseInt(delta);
        console.log(`PageNo: ${advanceDataQuery['page']}`);
    },
    changePageSize: function (newPageSize) {
        console.log(newPageSize);
        advanceDataQuery['page'] = 0;
        advanceDataQuery['pageSize'] = newPageSize;
    }
};

const advanceDataUrl = 'https://adhmmmtisement.onrender.com/advance/data';

function populateAdvanceDataTable(data) {
    console.log(data);
    const dataTableHtml = data.map(
        ({ optionid, companyid, audiencecount, cost }) => `
            <tr>
                <th scope="row">${optionid}</th>
                <td>${companyid}</td>
                <td>${audiencecount}</td>
                <td>${cost}</td>
            </tr>
    `,
    );
    $('#advance-data-tbody').html(dataTableHtml);
}

function getAdvanceDataFromBackEnd(callback) {
    $.get(advanceDataUrl, advanceDataQuery)
        .done((result) => callback(null, result))
        .fail((message) => callback(message, null));
}

function refreshAdvanceDataTable() {
    getAdvanceDataFromBackEnd(function (err, data) {

        console.log("data" + JSON.stringify(data));

        if (err) return alert(err.responseJSON.error);
        
        dataCount = parseInt(data[0].noofrows);
        var totalPg = (Math.ceil(dataCount / advanceDataQuery['pageSize'])) - 1;
        if (advanceDataQuery['page'] == 0) {
            if (dataCount <= advanceDataQuery['pageSize']) {
                $('#advance-data-previous-page').hide();
                $('#advance-data-next-page').hide();
            } else {
                $('#advance-data-previous-page').hide();
                $('#advance-data-next-page').show();
            }
        } else if (advanceDataQuery['page'] == parseInt(totalPg)) {
            $('#advance-data-previous-page').show();
            $('#advance-data-next-page').hide();
        } else {
            $('#advance-data-previous-page').show();
            $('#advance-data-next-page').show();
        }
        
        console.log("total pgs: " + totalPg);
        console.log(advanceDataQuery['page']);
        console.log("total rows: " + dataCount);

        if (err) return alert(err);
        populateAdvanceDataTable(data);
    });
}

function filterAdvanceData() {
    // This is for selecting those that are not input type submit.
    // console.log($('#advance-data-filter-form input').not(':input[type=submit]')); 
    $('#advance-data-filter-form input')
        .not(':input[type=submit]')
        .each((idx, input) => {
            console.log($(input).val());
            advanceDataQuery[$(input).attr('key')] = $(input).val();
        });
    advanceDataQuery['page'] = 0;
    advanceDataQuery['pageSize'] = 5;
    refreshAdvanceDataTable();
    return false;
}

function registerAdvanceDataFilterForm() {
    $('#advance-data-filter-form').submit(filterAdvanceData);
}

function paginateAdvanceData() {
    const fn = $(this).attr('fn');
    const value = $(this).attr('value') || $(this).val();
    advanceDataPaginationFunction[fn](value);
    refreshAdvanceDataTable();
}

function registerAdvanceDataPaginationForm() {
    $('#advance-data-first-page').click(paginateAdvanceData);
    $('#advance-data-previous-page').click(paginateAdvanceData);
    $('#advance-data-next-page').click(paginateAdvanceData);
    $('#advance-data-page-size-select').change(paginateAdvanceData);
}

$(document).ready(function () {
    registerAdvanceDataFilterForm();
    registerAdvanceDataPaginationForm();
    refreshAdvanceDataTable();
});

$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});
