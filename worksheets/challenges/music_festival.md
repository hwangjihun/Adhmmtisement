# Challenges

You are given the set of input and a few queries. Fill in the results based on the input and queries.

# Basic

## Algorithm

1. Correctly select the set of performances for computation
2. Sort the performances by increasing order of their finishing time.
3. Maintain a list of selected performance
4. Iterate through each of the sorted performance
    1. If it doesn't clash with any selected performance, add it to the list
    2. Otherwise skip that performance.

Name of problem: **Activity Selection**

## Basic Input

| performanceId | festivalId | startTime | endTime |
| ------------- | ---------- | --------- | ------- |
| 1000000001    | 1100000001 | 1000      | 1100    |
| 1000000002    | 1100000001 | 1000      | 1100    |
| 1000000003    | 1100000001 | 1030      | 1130    |
| 1000000004    | 1100000002 | 1000      | 1100    |
| 1000000005    | 1100000002 | 1100      | 1200    |
| 1000000006    | 1100000002 | 1200      | 1300    |
| 1000000007    | 1100000002 | 1030      | 1230    |
| 1000000008    | 1100000003 | 1000      | 1100    |
| 1000000009    | 1100000003 | 1100      | 1200    |
| 1000000010    | 1100000003 | 1200      | 1300    |
| 1000000011    | 1100000003 | 1030      | 1230    |
| 1000000012    | 1100000003 | 1130      | 1300    |
| 1000000013    | 1100000004 | 1000      | 1100    |
| 1000000014    | 1100000004 | 1100      | 1200    |
| 1000000015    | 1100000004 | 1200      | 1300    |
| 1000000016    | 1100000004 | 1030      | 1230    |
| 1000000017    | 1100000004 | 1130      | 1330    |
| 1000000018    | 1100000004 | 0900      | 1200    |

## Basic Query 1

| attribute  | value      |
| ---------- | ---------- |
| festivalId | 1100000001 |

## Basic Result 1

| Performance # | Performance Id |
| ------------- | -------------- |
| 1             | 1000000001     |
| 2             | 100000000?     |

## Basic Query 2

| attribute  | value      |
| ---------- | ---------- |
| festivalId | 1100000002 |

## Basic Result 2

| Performance # | Performance Id |
| ------------- | -------------- |
| 1             | ?              |

## Basic Query 3

| attribute  | value      |
| ---------- | ---------- |
| festivalId | 1100000003 |

## Basic Result 3

| Performance # | Performance Id |
| ------------- | -------------- |
| 1             | ?              |

## Basic Query 4

| attribute  | value      |
| ---------- | ---------- |
| festivalId | 1100000004 |

## Basic Result 4

| Performance # | Performance Id |
| ------------- | -------------- |
| 1             | ?              |

# Advance

## Algorithm

Name of problem: **Weighted Activity Selection**

> Hint: It is sufficient to implement a linear search instead of a binary search.

## Advance Input

| performanceId | festivalId | startTime | endTime | popularity |
| ------------- | ---------- | --------- | ------- | ---------- |
| 1000000001    | 1100000001 | 1000      | 1100    | 1          |
| 1000000002    | 1100000001 | 1000      | 1100    | 1          |
| 1000000003    | 1100000001 | 1030      | 1130    | 10         |
| 1000000004    | 1100000002 | 1000      | 1100    | 1          |
| 1000000005    | 1100000002 | 1100      | 1200    | 1          |
| 1000000006    | 1100000002 | 1200      | 1300    | 1          |
| 1000000007    | 1100000002 | 1030      | 1230    | 3          |
| 1000000008    | 1100000003 | 1000      | 1100    | 1          |
| 1000000009    | 1100000003 | 1100      | 1200    | 1          |
| 1000000010    | 1100000003 | 1200      | 1300    | 1          |
| 1000000011    | 1100000003 | 1030      | 1230    | 1          |
| 1000000012    | 1100000003 | 1130      | 1300    | 3          |
| 1000000013    | 1100000004 | 1000      | 1100    | 1          |
| 1000000014    | 1100000004 | 1100      | 1200    | 1          |
| 1000000015    | 1100000004 | 1200      | 1300    | 2          |
| 1000000016    | 1100000004 | 1030      | 1230    | 3          |
| 1000000017    | 1100000004 | 1130      | 1330    | 4          |
| 1000000018    | 1100000004 | 0900      | 1200    | 5          |

## Advance Query 1

| attribute  | value      |
| ---------- | ---------- |
| festivalId | 1100000001 |

## Advance Result 1

| Performance # | Performance Id |
| ------------- | -------------- |
| 1             | 1000000001     |
| 2             | 100000000?     |

## Advance Query 2

| attribute  | value      |
| ---------- | ---------- |
| festivalId | 1100000002 |

## Advance Result 2

| Performance # | Performance Id |
| ------------- | -------------- |
| 1             | ?              |

## Advance Query 3

| attribute  | value      |
| ---------- | ---------- |
| festivalId | 1100000003 |

## Advance Result 3

| Performance # | Performance Id |
| ------------- | -------------- |
| 1             | ?              |

## Advance Query 4

| attribute  | value      |
| ---------- | ---------- |
| festivalId | 1100000004 |

## Advance Result 4

| Performance # | Performance Id |
| ------------- | -------------- |
| 1             | ?              |
