const { Client } = require('pg');
const { options } = require('./app');
const { validateResultAPI } = require('./validation');

const CONNECTION_STRING = 'postgres://ajpxdykx:Jyy5a_QYCGP8nFXjrqP3psDgBuflrm-v@john.db.elephantsql.com:5432/ajpxdykx';

function connect() {
    const client = new Client({
        connectionString: CONNECTION_STRING,
    });
    client.connect();
    return client;
};

async function resetTable() {
    const client = connect();
    const query = `
        DROP TABLE IF EXISTS adOptions;
        CREATE TABLE adOptions (
            optionId BIGINT NOT NULL,
            optionType INT NOT NULL,
            companyId BIGINT NOT NULL,
            audienceCount INTEGER NOT NULL,
            cost INTEGER NOT NULL,
            PRIMARY KEY (optionId, optionType)
        );
    `;
    try {
        let result = await client.query(query);
        return result;
    }
    catch (err) {
        throw err;
    }
    finally {
        client.end();
    }
};

// Insert Options
async function insertOptions(options, optionType) {
    console.log(optionType);
    if (options.length == 0) {
        console.log("empty");
        throw { 'message': 'Cannot Insert Empty Array.', 'status': 400 };
    }
    let i = 1;
    const template = options.map((option) => `($${i++}, $${i++}, $${i++}, $${i++}, $${i++})`).join(',');
    const values = options.reduce((reduced, option) => [...reduced, option.optionId, optionType, option.companyId, option.audienceCount, option.cost], []);
    const query = `INSERT INTO adOptions (optionId, optionType, companyId, audienceCount, cost) VALUES ${template}`;

    const client = connect();

    try {
        let result = await client.query(query, values);
        return result;
    }
    catch (err) {
        throw err;
    }
    finally {
        client.end();
    }
};

async function getOptions(companyId, audienceCount, page = 0, pageSize = 20) {
    let whereClause;
    let i = 1;
    const values = [];
    whereClause = 'WHERE optionType = 0'
    if (!companyId && !audienceCount) whereClause;
    else {
        if (companyId) {
            whereClause += ` AND companyId = $${i++}`;
            values.push(parseInt(companyId));
        };
        if (audienceCount) {
            whereClause += (companyId) ? ` AND audienceCount > $${i++}` : ` AND audienceCount > $${i++}`;
            values.push(parseInt(audienceCount));
        }
    }

    let limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`;
    values.push(parseInt(pageSize)); //limit = page size
    values.push(parseInt(page) * parseInt(pageSize)); // offset = page * pageSize
    const query = `SELECT *, COUNT(*) OVER() AS noOfRows FROM adOptions ${whereClause} ${limitOffsetClause}`;

    console.log(query);

    const client = connect();

    try {
        let result = await client.query(query, values);
        const { rows } = result;
        console.log(rows);
        if (rows.length == 0) {
            throw { 'message': 'No Result', 'status': 400 };
        }
        return rows;
    }
    catch (err) {
        throw err;
    }
    finally {
        client.end();
    }
};

async function getBasicComputationInfo(inputOptions, budget) {

    const options = inputOptions.split(',');

    console.log(options);

    const errObject = validateResultAPI(options, budget);

    if (errObject) {
        throw errObject;
    }

    let optionParams = options.map((item, index) => { return '$' + (index + 1) });

    const query = 'SELECT optionid, cost, audiencecount FROM adOptions WHERE optionType = 0 AND optionid IN (' + optionParams.join(',') + ')';

    const client = connect();

    try {
        let result = await client.query(query, options);
        const { rows } = result;
        if (rows.length < options.length) {
            console.log("Id no exist");
            throw { 'message': 'one or more ID(s) does not exists', 'status': 400 };
        }
        return rows;
    }
    catch (err) {
        throw err;
    }
    finally {
        client.end();
    }
};

async function getAdvanceOptions(companyId, audienceCount, cost, page = 0, pageSize = 20) {
    let whereClause;
    let i = 1;
    const values = [];
    whereClause = 'WHERE optionType = 1'
    if (!companyId && !audienceCount && !cost) whereClause;
    else {
        if (companyId) {
            whereClause += ` AND companyId = $${i++}`;
            values.push(parseInt(companyId));
        }
        if (audienceCount) {
            whereClause += (companyId) ? ` AND audienceCount > $${i++}` : ` AND audienceCount > $${i++}`;
            values.push(parseInt(audienceCount));
        }
        if (cost) {
            whereClause += (cost) ? ` AND cost > $${i++}` : ` AND cost > $${i++}`;
            values.push(parseInt(cost));
        }
    }

    let limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`;
    values.push(parseInt(pageSize)); //limit = page size
    values.push(parseInt(page) * parseInt(pageSize)); // offset = page * pageSize
    const query = `SELECT *, COUNT(*) OVER() AS noOfRows FROM adOptions ${whereClause} ${limitOffsetClause}`;

    console.log(query);

    const client = connect();

    try {
        let result = await client.query(query, values);
        const { rows } = result;
        console.log(rows);
        if (rows.length == 0) {
            throw { 'message': 'No Result', 'status': 400 };
        }
        return rows;
    }
    catch (err) {
        throw err;
    }
    finally {
        client.end();
    }
};

async function getAdvanceComputationInfo(inputOptions, budget) {

    const options = inputOptions.split(',');

    const errObject = validateResultAPI(options, budget);

    if (errObject) {
        throw errObject;
    }

    let optionParams = options.map((item, index) => { return '$' + (index + 1) });

    const query = 'SELECT optionid, cost, audiencecount FROM adOptions WHERE optionType = 1 AND optionid IN (' + optionParams.join(',') + ')';

    const client = connect();

    try {
        let result = await client.query(query, options);
        const { rows } = result;
        if (rows.length < options.length) {
            console.log("Id no exist");
            throw { 'message': 'One or more ID(s) does not exist. Please re-enter with a valid Option ID.', 'status': 400 };
        }
        return rows;
    }
    catch (err) {
        throw err;
    }
    finally {
        client.end();
    }
};

module.exports = {
    resetTable,
    getOptions,
    getBasicComputationInfo,
    insertOptions,
    getAdvanceComputationInfo,
    getAdvanceOptions,
}