const basicDataQuery = {
    companyId: null,
    audienceCount: null,
    page: 0,
    pageSize: 5,
};

const basicDataPaginationFunction = {
    gotoFirstPage: function () {
        basicDataQuery['page'] = 0;
        console.log(`PageNo: ${basicDataQuery['page']}`);
    },
    changePage: function (delta) {
        basicDataQuery['page'] += parseInt(delta);
        console.log(`PageNo: ${basicDataQuery['page']}`);
    },
    changePageSize: function (newPageSize) {
        console.log(newPageSize);
        basicDataQuery['page'] = 0;
        basicDataQuery['pageSize'] = newPageSize;
    }
};

const basicDataUrl = 'https://adhmmmtisement.onrender.com/basic/data';

function populateBasicDataTable(data) {
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
    $('#basic-data-tbody').html(dataTableHtml);
}

function getBasicDataFromBackEnd(callback) {
    $.get(basicDataUrl, basicDataQuery)
        .done((result) => callback(null, result))
        .fail((message) => callback(message, null));
}

function refreshBasicDataTable() {
    getBasicDataFromBackEnd(function (err, data) {
    
        console.log("data" + JSON.stringify(data));

        if (err) return alert(err.responseJSON.error);
        dataCount = parseInt(data[0].noofrows);
        var totalPg = (Math.ceil(dataCount / basicDataQuery['pageSize'])) - 1;
        if (basicDataQuery['page'] == 0) {
            if (dataCount <= basicDataQuery['pageSize']) {
                $('#basic-data-previous-page').hide();
                $('#basic-data-next-page').hide();
            } else {
                $('#basic-data-previous-page').hide();
                $('#basic-data-next-page').show();
            }
        } else if (basicDataQuery['page'] == parseInt(totalPg)) {
            $('#basic-data-previous-page').show();
            $('#basic-data-next-page').hide();
        } else {
            $('#basic-data-previous-page').show();
            $('#basic-data-next-page').show();
        }
        
        console.log("total pgs: " + totalPg);
        console.log(basicDataQuery['page']);
        console.log("total rows: " + dataCount);

        if (err) return alert(err);
        populateBasicDataTable(data);
    });
}

function filterBasicData() {
    // This is for selecting those that are not input type submit.
    // console.log($('#basic-data-filter-form input').not(':input[type=submit]')); 
    $('#basic-data-filter-form input')
        .not(':input[type=submit]')
        .each((idx, input) => {
            console.log($(input).val());
            basicDataQuery[$(input).attr('key')] = $(input).val();
        });
    basicDataQuery['page'] = 0;
    basicDataQuery['pageSize'] = 5;
    refreshBasicDataTable();
    return false;
}

function registerBasicDataFilterForm() {
    $('#basic-data-filter-form').submit(filterBasicData);
}

function paginateBasicData(event) {
    const fn = $(this).attr('fn');
    const value = $(this).attr('value') || $(this).val();
    basicDataPaginationFunction[fn](value);
    refreshBasicDataTable();
}

function registerBasicDataPaginationForm() {
    $('#basic-data-first-page').click(paginateBasicData);
    $('#basic-data-previous-page').click(paginateBasicData);
    $('#basic-data-next-page').click(paginateBasicData);
    $('#basic-data-page-size-select').change(paginateBasicData);
}

$(document).ready(function () {
    registerBasicDataFilterForm();
    registerBasicDataPaginationForm();
    refreshBasicDataTable();
});

$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});
