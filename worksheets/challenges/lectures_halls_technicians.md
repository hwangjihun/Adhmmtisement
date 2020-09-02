# Challenges

You are given the set of input and a few queries. Fill in the results based on the input and queries.

# Basic

## Algorithm

1. Correctly select the set of lectures for computation
2. Sort lectures by startTime
3. Find a suitable hall for the lecture; if no hall exists create a new hall
4. When creating a new hall, keep track of the end time of the last lesson.

Name of problem: **Interval Scheduling**

## Input

| lectureId  | facultyId  | semesterId | dayOfWeek | startTime | endTime |
| :--------: | :--------: | :--------: | :-------: | :-------: | :-----: |
| 1000000001 | 1100000000 | 1110000000 |     1     |   1000    |  1100   |
| 1000000002 | 1100000000 | 1110000000 |     1     |   1030    |  1130   |
| 1000000003 | 1100000000 | 1110000000 |     2     |   1000    |  1100   |
| 1000000004 | 1100000000 | 1110000000 |     2     |   1200    |  1300   |
| 1000000005 | 1100000000 | 1110000000 |     2     |   1030    |  1230   |
| 1000000006 | 1100000000 | 1110000000 |     3     |   1000    |  1100   |
| 1000000007 | 1100000000 | 1110000000 |     3     |   1200    |  1300   |
| 1000000008 | 1100000000 | 1110000000 |     3     |   0900    |  1400   |
| 1000000009 | 1100000000 | 1110000000 |     3     |   1030    |  1230   |
| 1000000010 | 1100000000 | 1110000000 |     4     |   1000    |  1100   |
| 1000000011 | 1100000000 | 1110000000 |     4     |   1200    |  1300   |
| 1000000012 | 1100000000 | 1110000000 |     4     |   0900    |  1400   |
| 1000000013 | 1100000000 | 1110000000 |     4     |   1030    |  1230   |
| 1000000014 | 1100000000 | 1110000000 |     4     |   1215    |  1425   |

## Query 1

| Attribute  | Value      |
| ---------- | ---------- |
| facultyId  | 1100000000 |
| semesterId | 1110000000 |
| dayOfWeek  | 1          |

## Result 1

| lectureId  | Hall # |
| ---------- | ------ |
| 1000000001 | ?      |
| 1000000002 | ?      |

## Query 2

| Attribute  | Value      |
| ---------- | ---------- |
| facultyId  | 1100000000 |
| semesterId | 1110000000 |
| dayOfWeek  | 2          |

## Result 2

| lectureId  | Hall # |
| ---------- | ------ |
| 100000000? | ?      |

> Which lectures are invovled and which halls are they allocated to?

## Query 3

| Attribute  | Value      |
| ---------- | ---------- |
| facultyId  | 1100000000 |
| semesterId | 1110000000 |
| dayOfWeek  | 3          |

## Result 3

| lectureId  | Hall # |
| ---------- | ------ |
| 100000000? | ?      |

> Which lectures are invovled and which halls are they allocated to?

## Query 4

| Attribute  | Value      |
| ---------- | ---------- |
| facultyId  | 1100000000 |
| semesterId | 1110000000 |
| dayOfWeek  | 4          |

## Result 4

| lectureId  | Hall # |
| ---------- | ------ |
| 100000000? | ?      |

> Which lectures are invovled and which halls are they allocated to?

# Advance

## Algorithm

Name of problem: **Overlapping Interval**

Modified to increase difficulty of problem

> Hint: Think about how a technician is actually an invert of a lecture.

## Input

> Same set of lectures from Basic

| lectureId  | facultyId  | semesterId | dayOfWeek | startTime | endTime |
| :--------: | :--------: | :--------: | :-------: | :-------: | :-----: |
| 1000000001 | 1100000000 | 1110000000 |     1     |   1000    |  1100   |
| 1000000002 | 1100000000 | 1110000000 |     1     |   1030    |  1130   |
| 1000000003 | 1100000000 | 1110000000 |     2     |   1000    |  1100   |
| 1000000004 | 1100000000 | 1110000000 |     2     |   1200    |  1300   |
| 1000000005 | 1100000000 | 1110000000 |     2     |   1030    |  1230   |
| 1000000006 | 1100000000 | 1110000000 |     3     |   1000    |  1100   |
| 1000000007 | 1100000000 | 1110000000 |     3     |   1200    |  1300   |
| 1000000008 | 1100000000 | 1110000000 |     3     |   0900    |  1400   |
| 1000000009 | 1100000000 | 1110000000 |     3     |   1030    |  1230   |
| 1000000010 | 1100000000 | 1110000000 |     4     |   1000    |  1100   |
| 1000000011 | 1100000000 | 1110000000 |     4     |   1200    |  1300   |
| 1000000012 | 1100000000 | 1110000000 |     4     |   0900    |  1400   |
| 1000000013 | 1100000000 | 1110000000 |     4     |   1030    |  1230   |
| 1000000014 | 1100000000 | 1110000000 |     4     |   1215    |  1425   |

| technicianId | facultyId  | semesterId | dayOfWeek | startTime | endTime |
| :----------: | :--------: | :--------: | :-------: | :-------: | :-----: |
|  1000000001  | 1100000000 | 1110000000 |     1     |   1000    |  1100   |
|  1000000002  | 1100000000 | 1110000000 |     1     |   1000    |  1130   |
|  1000000003  | 1100000000 | 1110000000 |     2     |   1000    |  1130   |
|  1000000004  | 1100000000 | 1110000000 |     2     |   1130    |  1300   |
|  1000000005  | 1100000000 | 1110000000 |     3     |   0900    |  1030   |
|  1000000006  | 1100000000 | 1110000000 |     3     |   1000    |  1200   |
|  1000000007  | 1100000000 | 1110000000 |     3     |   1100    |  1400   |
|  1000000008  | 1100000000 | 1110000000 |     4     |   1000    |  1300   |
|  1000000009  | 1100000000 | 1110000000 |     4     |   1000    |  1300   |
|  1000000010  | 1100000000 | 1110000000 |     4     |   1215    |  1425   |
|  1000000011  | 1100000000 | 1110000000 |     4     |   1215    |  1500   |
|  1000000012  | 1100000000 | 1110000000 |     4     |   0800    |  1400   |

## Query 1

| Attribute  | Value      |
| ---------- | ---------- |
| facultyId  | 1100000000 |
| semesterId | 1110000000 |
| dayOfWeek  | 1          |

## Result 1

| From Time | To Time | Suplus/Lack |
| --------- | ------- | ----------- |
| 1000      | 1030    | Surplus 1   |
| 1030      | 1100    | 0           |
| 1100      | ?       | ???         |

## Query 2

| Attribute  | Value      |
| ---------- | ---------- |
| facultyId  | 1100000000 |
| semesterId | 1110000000 |
| dayOfWeek  | 2          |

## Result 2

| From Time | To Time | Suplus/Lack |
| --------- | ------- | ----------- |
| ?         | ?       | ???         |

## Query 3

| Attribute  | Value      |
| ---------- | ---------- |
| facultyId  | 1100000000 |
| semesterId | 1110000000 |
| dayOfWeek  | 3          |

## Result 3

| From Time | To Time | Suplus/Lack |
| --------- | ------- | ----------- |
| ?         | ?       | ???         |

## Query 4

| Attribute  | Value      |
| ---------- | ---------- |
| facultyId  | 1100000000 |
| semesterId | 1110000000 |
| dayOfWeek  | 4          |

## Result 4

| From Time | To Time | Suplus/Lack |
| --------- | ------- | ----------- |
| ?         | ?       | ???         |
