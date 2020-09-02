var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var path = require('path');

const database = require('./database');
const computeAlgo = require('./backend');
const csv = require('fast-csv');
const fs = require('fs');

var app = express();

var multer = require('multer');

//Storage Engine 
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/dataStorage/')
	},
	filename: async function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

var upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype == "text/csv" || file.mimetype == "application/vnd.ms-excel") {
			cb(null, true);
		} else {
			cb(null, false);
			let err = { 'message': 'You did not upload a file with .csv format.', 'status': 400 };
			return cb(err);
		}
	}
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    return res.json({
        message: "Welcome to JiBaBoom - hmmm",
        availableEndpoints: [
             'POST /basic/insert { "data": [ {key1: value1, key2: value2, ...} ] }',
             'POST /advance/insert { "data": [ {key1: value1, key2: value2, ...} ] }',
             'GET /basic/result?para1=value1&para2=value2',
             'GET /advance/result?para1=value1&para2=value2',
        ]
    });
});

//reset
app.get('/reset', async (req, res, next) => {
	try {
		const result = await database.resetTable();
		const jsonData = {
			"result": "success"
		};
		res.json(jsonData);
	}

	catch (err) {
		return next(err);
	}
});

// insert for basic API
app.post('/basic/insert', async (req, res, next) => {
	const { data } = req.body;
	const optionType = 0;
	console.log(optionType);
	try {
		const result = await database.insertOptions(data, optionType);
		const jsonData = {
			"result": "success"
		};
		res.json(jsonData);
	}
	catch (err) {
		return next(err);
	}
});

app.get('/basic/data', async (req, res, next) => {
	let { companyId, audienceCount, page, pageSize } = req.query;
	try {
		const result = await database.getOptions(companyId, audienceCount, page, pageSize);
		res.json(result);
	}
	catch (err) {
		return next(err);
	}
});

app.get('/basic/result', async (req, res, next) => {
	let { optionIds, budget } = req.query;
	try {
		const result = await database.getBasicComputationInfo(optionIds, budget);
		let bestOptions = computeAlgo.basicComputeBestOption(result, budget);
		res.json(bestOptions);
	}
	catch (err) {
		return next(err);
	}
});

// insert for advance API
app.post('/advance/insert', async (req, res, next) => {
	const { data } = req.body;
	const optionType = 1;
	console.log(optionType);
	try {
		const result = await database.insertOptions(data, optionType);
		const jsonData = {
			"result": "success"
		};
		res.json(jsonData);
	}
	catch (err) {
		return next(err);
	}
});

app.get('/advance/data', async (req, res, next) => {
	let { companyId, audienceCount, cost, page, pageSize } = req.query;
	try {
		const result = await database.getAdvanceOptions(companyId, audienceCount, cost, page, pageSize);
		res.json(result);
	}
	catch (err) {
		return next(err);
	}
});

app.get('/advance/result', async (req, res, next) => {
	let { optionIds, budget } = req.query;
	try {
		const result = await database.getAdvanceComputationInfo(optionIds, budget);
		let bestOptions = computeAlgo.advancedComputeBestOption(result, budget);
		res.json(bestOptions);
	}
	catch (err) {
		return next(err);
	}
});

app.post('/basic/uploadComputeCSV', upload.single('inputBasicCSV'), async (req, res, next) => {

	let { budget } = req.body;

	console.log(budget);

	let userBudget = parseInt(budget);

	const file = req.file;

	if (!file) {
		let err = { 'message': 'You did not upload a file.', 'status': 400 };
		return next(err);
	}

	const fileRows = [];

	try {
		csv.parseFile(req.file.path)
			.on("data", function (data) {
				fileRows.push(...data);
			})
			.on("end", async function () {
				try {
					let optionIds = fileRows.join(',');
					const result = await database.getBasicComputationInfo(optionIds, userBudget);
					let bestOptions = computeAlgo.basicComputeBestOption(result, userBudget);
					console.log(bestOptions);
					res.json(bestOptions);
				}
				catch (err) {
					return next(err);
				}
			});
	}

	catch (err) {
		return next(err);
	}

	finally {
		fs.unlinkSync(req.file.path);
	}
});

app.post('/advance/uploadComputeCSV', upload.single('inputAdvanceCSV'), async (req, res, next) => {

	let { budget } = req.body;
	let userBudget = budget;
	const file = req.file;

	if (!file) {
		let err = { 'message': 'You did not upload a file.', 'status': 400 };
		return next(err);
	}

	const fileRows = [];

	try {
		csv.parseFile(req.file.path)
			.on("data", function (data) {
				fileRows.push(...data);
			})
			.on("end", async function () {
				try {
					let optionIds = fileRows.join(',');
					const result = await database.getAdvanceComputationInfo(optionIds, userBudget);
					let bestOptions = computeAlgo.advancedComputeBestOption(result, userBudget);
					res.json(bestOptions);
				}

				catch (err) {
					return next(err);
				}

				finally {
					fs.unlinkSync(req.file.path);
				}
			});
	}

	catch (err) {
		return next(err);
	}
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({
		error: err.message,
		code: err.status || 500
	});
});

module.exports = app;