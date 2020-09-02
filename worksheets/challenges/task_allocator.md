# Challenges

You are given the set of input and a few queries. Fill in the results based on the input and queries.

# Basic

## Algorithm

1. Correctly select the set of tasks for computation
2. Sort the tasks by increasing order of their deadline
3. Calculate the start time and end time of each task
4. Calculate the lateness of each task
5. Sum up all lateness

Name of problem: **Minimize latness**

## Basic Input

|   taskId   | projectId  |  dueDate   | dueTime | duration |
| :--------: | :--------: | :--------: | :-----: | :------: |
| 1000000001 | 1100000001 | 2020/01/01 |  1100   |    1     |
| 1000000002 | 1100000001 | 2020/01/01 |  1100   |    1     |
| 1000000003 | 1100000001 | 2020/01/01 |  1100   |    1     |
| 1000000004 | 1100000001 | 2020/01/01 |  1100   |    1     |
| 1000000005 | 1100000002 | 2020/01/01 |  1400   |    1     |
| 1000000006 | 1100000002 | 2020/01/01 |  1400   |    2     |
| 1000000007 | 1100000002 | 2020/01/01 |  1400   |    3     |
| 1000000008 | 1100000002 | 2020/01/01 |  1400   |    4     |
| 1000000009 | 1100000003 | 2020/01/01 |  1100   |    1     |
| 1000000010 | 1100000003 | 2020/01/01 |  1300   |    3     |
| 1000000011 | 1100000003 | 2020/01/01 |  1500   |    5     |
| 1000000012 | 1100000003 | 2020/01/01 |  1700   |    7     |
| 1000000013 | 1100000004 | 2020/01/01 |  1200   |    1     |
| 1000000014 | 1100000004 | 2020/01/01 |  1400   |    4     |
| 1000000015 | 1100000004 | 2020/01/01 |  1900   |    7     |
| 1000000016 | 1100000004 | 2020/01/01 |  1500   |    7     |
| 1000000017 | 1100000004 | 2020/01/01 |  1900   |    11    |

## Basic Query 1

| Attribute | Value      |
| --------- | ---------- |
| projectId | 1100000001 |
| startDate | 2020/01/01 |
| startTime | 0900       |

## Basic Result 1

| Task # | taskId     | fromTime | toTime | lateness |
| ------ | ---------- | -------- | ------ | -------- |
| 1      | 1000000001 | 0900     | 1000   | 0        |
| 2      | 1000000002 | 1000     | 1100   | 0        |
| 3      | 1000000003 | ?        | ?      | ?        |
| 4      | 1000000004 | ?        | ?      | ?        |

Total lateness: ?

## Basic Query 2

| Attribute | Value      |
| --------- | ---------- |
| projectId | 1100000002 |
| startDate | 2020/01/01 |
| startTime | 0900       |

## Basic Result 2

| Task # | taskId | fromTime | toTime | lateness |
| ------ | ------ | -------- | ------ | -------- |
| 1      | ?      | ?        | ?      | ?        |

Total lateness: ?

## Basic Query 3

| Attribute | Value      |
| --------- | ---------- |
| projectId | 1100000003 |
| startDate | 2020/01/01 |
| startTime | 0900       |

## Basic Result 3

| Task # | taskId | fromTime | toTime | lateness |
| ------ | ------ | -------- | ------ | -------- |
| 1      | ?      | ?        | ?      | ?        |

Total lateness: ?

## Basic Query 4

| Attribute | Value      |
| --------- | ---------- |
| projectId | 1100000004 |
| startDate | 2020/01/01 |
| startTime | 0900       |

## Basic Result 4

| Task # | taskId | fromTime | toTime | lateness |
| ------ | ------ | -------- | ------ | -------- |
| 1      | ?      | ?        | ?      | ?        |

Total lateness: ?

# Advance

## Algorithm

Name of problem: **Partition Problem**

> Hint: It is possible to solve this problem by modeling it as a 0-1 knapsack problem.

## Advance Input

|   taskId   | projectId  | duration |
| :--------: | :--------: | :------: |
| 1000000001 | 1100000001 |    1     |
| 1000000002 | 1100000001 |    1     |
| 1000000003 | 1100000001 |    1     |
| 1000000004 | 1100000001 |    1     |
| 1000000005 | 1100000002 |    1     |
| 1000000006 | 1100000002 |    2     |
| 1000000007 | 1100000002 |    3     |
| 1000000008 | 1100000002 |    4     |
| 1000000009 | 1100000003 |    1     |
| 1000000010 | 1100000003 |    3     |
| 1000000011 | 1100000003 |    5     |
| 1000000012 | 1100000003 |    7     |
| 1000000013 | 1100000004 |    1     |
| 1000000014 | 1100000004 |    4     |
| 1000000015 | 1100000004 |    7     |
| 1000000016 | 1100000004 |    7     |
| 1000000017 | 1100000004 |    11    |

> It's the exact same as Basic input but without the duedate/duetime.

## Advance Query 1

| Attribute | Value      |
| --------- | ---------- |
| projectId | 1100000001 |

## Advance Result 1

| Member | Assigned Tasks | Total Hours |
| ------ | -------------- | ----------- |
| 1      | 1, 2           | ?           |
| 2      | 3, 4           | ?           |

## Advance Query 2

| Attribute | Value      |
| --------- | ---------- |
| projectId | 1100000002 |

## Advance Result 2

| Member | Assigned Tasks | Total Hours |
| ------ | -------------- | ----------- |
| 1      | ?              | ?           |
| 2      | ?              | ?           |

## Advance Query 3

| Attribute | Value      |
| --------- | ---------- |
| projectId | 1100000003 |

## Advance Result 3

| Member | Assigned Tasks | Total Hours |
| ------ | -------------- | ----------- |
| 1      | ?              | ?           |
| 2      | ?              | ?           |

## Advance Query 4

| Attribute | Value      |
| --------- | ---------- |
| projectId | 1100000004 |

## Advance Result 4

| Member | Assigned Tasks | Total Hours |
| ------ | -------------- | ----------- |
| 1      | ?              | ?           |
| 2      | ?              | ?           |
