# SQL Statements

For this worksheet you will need to provide an example of your own SQL statement. The two given are examples.

## INSERT

Example:
```sql
INSERT INTO adOptions (optionId, optionType, companyId, audienceCount, cost) VALUES ${template}

--The variable template will be in the format of ($1, $2, $3, $4, $5) in this case as there are 5 columns to insert.
```

## SELECT Data with Filtering and Pagination
Example:
```sql
SELECT *, COUNT(*) OVER() AS noOfRows FROM adOptions ${whereClause} ${limitOffsetClause}

-- The variable whereClause will depend on the users input whether they want to filter data using both companyId and audienceCount or just one of them. The optionType indicates whether the options are from basic (0) or advance (1) data. COUNT(*) OVER() AS noofrows will be used to count the number of rows in the filtered data for pagination in frontend.

E.g:

WHERE optionType = 0

WHERE companyId = $1, 

WHERE audienceCount = $1,

WHERE companyId = $1 AND audienceCount = $2

-- The variable limitOffsetClause will be in the format of ($i++, $i++) because there are two parameters in it which are LIMIT and OFFSET.

E.g.:

-- If only one parameter is used for filtering:

LIMIT $2 OFFSET $3 

-- If two parameters are used for filtering:

LIMIT $3 OFFSET $4
```

## Select Result

Example:
```sql
SELECT optionid, cost, audiencecount FROM adOptions WHERE optionType = 0 AND optionid IN (' + optionParams.join(',') + ')

-- The options will first be split apart by the commas in an array and will be validated by validateResultAPI in validation.js. The options will then be mapped in optionParams in the form of ${index+1}. It will be joined by the commas to use in the SQL statement. The optionType will depend on whether the options are from basic (0) or advance (1) data
```