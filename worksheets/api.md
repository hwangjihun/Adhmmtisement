# API Documentation

This document allows you to define your API schema.

Each API should include

1. HTTP Method
2. Endpoint
3. Request body/Parameters
4. Response body
5. Error Body
6. Sample Request
7. Sample Response
8. Sample Error

> Errors and it's corresponding code can be defined by yourself. You need not follow HTTP errors.

## Reset Table

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /reset      |

### Parameters

| parameter     | datatype        | example   |
| ------------- | --------------- | --------- |
| Not Applicable     | Not Applicable  | Not Applicable  |

### Response Body

```json
{ 
    "result": string
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
GET /reset
```

### Sample Response

```json
{ 
    "result": "success"
}
```

### Sample Error

```json
{
    "error": "relation \"adoptions\" already exists",
    "code": 500
}
```

## Post Basic Data

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | POST         |
| Endpoint    | /basic/insert |

### Parameters

| parameter     | datatype        | example   |
| ------------- | --------------- | --------- |
| optionId      |      BIGINT     | 123456789 |
| optionType    |        INT      |     0     |
| companyId     |      BIGINT     | 123456789 |
| audienceCount |     INTEGER     |   1500    |
| cost          |     INTEGER     |    200    |

### Request Body

```json
{
    "data": [
        {
            "optionId": number,
            "optionType": number,
            "companyId": number,
            "audienceCount": number,
            "cost": number
        }
    ]
}
```

### Response Body

```json
{
    "result": string
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
POST /basic/insert
```

### Sample Request Body

```json
{
    "data": [
        {
            "optionId": 1000000001,
            "optionType": 0,
            "companyId": 1100000001,
            "audienceCount": 1,
            "cost": 1
        }
    ]
}
```

### Sample Response Body

```json
{
    "result": "success"
}
```

### Sample Error

```json
{
    "error": "duplicate key value violates unique constraint \"adoptions_optionid_key\"",
    "code": 500
}
```

## Post Advanced Data

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | POST         |
| Endpoint    | /advance/insert |

### Parameters

| parameter     | datatype        | example   |
| ------------- | --------------- | --------- |
| optionId      |      BIGINT     | 123456789 |
| optionType    |        INT      |     0     |
| companyId     |      BIGINT     | 123456789 |
| audienceCount |     INTEGER     |   1500    |
| cost          |     INTEGER     |    200    |

### Request Body

```json
{
    "data": [
        {
            "optionId": number,
            "optionType": number,
            "companyId": number,
            "audienceCount": number,
            "cost": number
        }
    ]
}
```

### Response Body

```json
{
    "result": string
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
POST /basic/insert
```

### Sample Request Body

```json
{
    "data": [
        {
            "optionId": 1000000001,
            "optionType": 1,
            "companyId": 1100000001,
            "audienceCount": 1,
            "cost": 1
        }
    ]
}
```

### Sample Response Body

```json
{
    "result": "success"
}
```

### Sample Error

```json
{
    "error": "duplicate key value violates unique constraint \"adoptions_optionid_key\"",
    "code": 500
}
```

## Get Basic Data

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /basic/data |

### Parameters

| parameter     | datatype        | example   |
| ------------- | --------------- | --------- |
| companyId     |      BIGINT     | 123456789 |
| audienceCount |     INTEGER     |   10000   |
| page          |     INTEGER     |     1     |
| pageSize      |     INTEGER     |     5     |


### Response Body

```json
{ 
    "result": [
        {
            "optionid": IDENTIFIER,
            "optiontype": number,
            "companyid": IDENTIFIER,
            "audiencecount": number,
            "cost": number,
            "noofrows": string
        }
    ]
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
GET /basic/data?companyId=1111111111&page=1&pageSize=1
```

### Sample Response

```json
{
    "result": [
        {
            "optionid": "1111111112",
            "optiontype": 0,
            "companyid": "1111111111",
            "audiencecount": 1000,
            "cost": 100,
            "noofrows": "2"
        }
    ]
}
```

### Sample Error

```json
{
    "error": "invalid input syntax for integer: \"NaN\"",
    "code": 500
}
```

## Get Advance Data
| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /advance/data |

### Parameters

| parameter     | datatype        | example   |
| ------------- | --------------- | --------- |
| companyId     |      BIGINT     | 123456789 |
| audienceCount |     INTEGER     |   10000   |
| page          |     INTEGER     |     1     |
| pageSize      |     INTEGER     |     5     |


### Response Body

```json
{ 
    "result": [
        {
            "optionid": IDENTIFIER,
            "optiontype": number,
            "companyid": IDENTIFIER,
            "audiencecount": number,
            "cost": number,
            "noofrows": string
        }
    ]
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
GET /advance/data?companyId=1111111111&page=1&pageSize=1
```

### Sample Response

```json
{
    "result": [
        {
            "optionid": "1111111112",
            "optiontype": 1,
            "companyid": "1111111111",
            "audiencecount": 1000,
            "cost": 100,
            "noofrows": "2"
        }
    ]
}
```

### Sample Error

```json
{
    "error": "invalid input syntax for integer: \"NaN\"",
    "code": 500
}
```

## Get Basic Result

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /basic/result |

### Parameters

| parameter     | datatype        | example   |
| ------------- | --------------- | --------- |
| optionId      |      BIGINT     | 123456789 |
| budget        |     INTEGER     |     50    |



### Response Body

```json
{ 
    "result": [
        {
            "optionid": IDENTIFIER,
            "amount": number,
            "audienceReached": number
        }
    ]
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
GET /basic/result?optionIds=1000000001,1000000002&budget=1
```

### Sample Response

```json
{
    "result": [
        {
            "optionid": "1000000001",
            "amount": 1,
            "audienceReached": 1
        }
    ]
}
```

### Sample Error

```json
{
    "error": "Missing Budget Field",
    "code": 400
}
```


## Get Advance Result

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /advance/result |

### Parameters

| parameter     | datatype        | example   |
| ------------- | --------------- | --------- |
| optionId      |      BIGINT     | 123456789 |
| budget        |     INTEGER     |     50    |



### Response Body

```json
{ 
    "result": [
        {
            "optionid": IDENTIFIER,
            "amount": number,
            "audienceReached": number
        }
    ]
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
GET /basic/result?optionIds=9000000001,9000000002&budget=2
```

### Sample Response

```json
{
    "result": [
        {
            "optionid": "9000000001",
            "amount": 1,
            "audienceReached": 1
        }
    ]
}
```

### Sample Error

```json
{
    "error": "Minimum of 2 Option Ids Required",
    "code": 400
}
```

## POST Basic Result CSV

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | POST        |
| Endpoint    | /basic/uploadComputeCSV |

### Parameters

| parameter     | datatype                                   | example   |
| ------------- | ---------------                            | --------- |
| inputBasicCSV |      text/csv, application/vnd.ms-excel    | sample.csv|
| budget        |                 INTEGER                    |     50    |
(Requires File Upload)

### Response Body

```json
{ 
    "result": [
        {
            "optionid": IDENTIFIER,
            "amount": number,
            "audienceReached": number
        }
    ]
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
POST /basic/uploadComputeCSV
(Requires File Upload)
```

### Sample Response

```json
{
    "result": [
        {
            "optionid": "1000000001",
            "amount": 1,
            "audienceReached": 1
        }
    ]
}
```

### Sample Error

```json
{
    "error": "You did not upload a file.",
    "code": 400
}
```


## POST Advance Result CSV

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | POST        |
| Endpoint    | /advance/uploadComputeCSV |

### Parameters

| parameter       | datatype                                   | example   |
| -------------   | ---------------                            | --------- |
| inputAdvanceCSV |      text/csv, application/vnd.ms-excel    | sample.csv|
| budget          |                 INTEGER                    |     50    |
(Requires File Upload)



### Response Body

```json
{ 
    "result": [
        {
            "optionid": IDENTIFIER,
            "amount": number,
            "audienceReached": number
        }
    ]
}
```

### Error

```json
{
	"error": string,
	"code": number
}
```

### Sample Request

```http
POST /advance/uploadComputeCSV
(Requires File Upload)
```

### Sample Response

```json
{
    "result": [
        {
            "optionid": "1000000001",
            "amount": 1,
            "audienceReached": 1
        }
    ]
}
```

### Sample Error

```json
{
    "error": "You did not upload a file.",
    "code": 400
}
```
