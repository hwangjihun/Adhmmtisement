function populateAdvanceCSVFileResultTable(data) {
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

function processAdvanceCSVFile() {
    let formData = new FormData();
    formData.append('inputAdvanceCSV', $('input[type=file]')[0].files[0]);
    formData.append('budget', $('input[type=number]')[0].valueAsNumber);
    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    fetch('http://localhost:3000/advance/uploadComputeCSV', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw response;
            }
        })
        .then((body) => {
            populateAdvanceCSVFileResultTable(body);
        })
        .catch(err => err.text().then(errorMessage => {
            return alert(JSON.parse(errorMessage).error);
        }));
    return false;
}

function submitAdvanceCSVFile() {
    $('#advance-result-csv-upload').submit(processAdvanceCSVFile);
}

function fileName() {
    $('input[type="file"]').change(function (e) {
        var fileName = e.target.files[0].name;
        $("#displayfilename").text(fileName);
    });
}

$(document).ready(function () {
    fileName();
    submitAdvanceCSVFile();
});

$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});
