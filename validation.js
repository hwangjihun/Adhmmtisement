function validateResultAPI(options, budget) {

    if (!options && !budget) {
        return { 'message': 'Missing Options and Budget Field', 'status': 400 };
    }

    if (!options) {
        return { 'message': 'Missing Options Field', 'status': 400 };
    }

    if (!budget) {
        return { 'message': 'Missing Budget Field', 'status': 400 };
    }

    if (budget == '' && options[0] == '') {
        return { 'message': 'Option Ids and Budget Inputs cannot be detected.', 'status': 400 };
    }

    if (budget == '') {
        return { 'message': 'Please insert a Budget', 'status': 400 };
    }

    if (parseInt(budget) < 0) {
        return { 'message': 'Please enter a Budget that is not negative', 'status': 400 }
    }

    if (options[0] == '') {
        return { 'message': 'Please insert Option Id.', 'status': 400 };
    }

    if (options.length < 2) {
        return { 'message': 'Minimum of 2 Option Ids Required', 'status': 400 };
    }

    if (new Set(options).size !== options.length) {
        return { 'message': 'Duplicate Option Ids Detected.', 'status': 400 };
    }
}

module.exports = {
    validateResultAPI
}