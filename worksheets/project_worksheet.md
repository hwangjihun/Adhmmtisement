> For this worksheet, you'll need plantuml to view the diagram

# Project Worksheet

This document aims to provide you with a better understanding of the structure/flow of the project.

## Use Case

Recall that there are a few functionality requried from this system

```plantuml
@startuml
left to right direction
actor JiBaBoom as jbb
actor Administrator as admin
rectangle Advance {
    rectangle Basic {
        jbb -- (insert basic data)
        (view basic data) -- admin
        (compute basic result) as compute
        jbb -- compute
        compute -- admin

    }
    jbb -- (insert advance data)
    (view advance data) -- admin
    (compute advance result) as advCompute
    jbb -- advCompute
    advCompute -- admin
}
@enduml
```
Link: [Use Case Diagram](https://www.plantuml.com/plantuml/svg/0/RP5D4e8m38NtFKMMik0EY3jl4Kh4ED0wRS25mzrjeVoEsULxBydhjF22JlgkLIqz1CI2u-OfKBCZBMoDGYtMmPrBBAtj03sygYhHQzsnOIyEOnSaZ435KJHDIy4meD44NmMXDbwYPvrehB0IyXmkR3mvWMgIQnJCLijbOFhibJWmtrijsdRlNYYv7Fc-bIpcIiBvtXaly-lcIHdLduYONhQ5d0CU-37Y6c_nx086TDk5ISTET6ktnQCgoDJX0ty0 "project_worksheet")

### Question

The above listed are functional requirements, that is, **WHAT** the system should allow users to do. There are also non-functional requirements that state **HOW** a system should perform.

-   Q1. Consider the use case of `Compute basic/advance result`, **HOW** is this functionality made available to both JiBaBoom and Adminstrator _(Hint: They are different)_? `When the result is computed by the backend, it is sent to both JiBaBoom and the Adminstrator. However, JiBaBoom views the compute result by calling the API in the backend while the Adminstrator views it in the frontend.`
-   Q2. Consider the use case of `Insert basic/advance data`. **HOW** is the data stored? `The data is stored using PostgreSQL. We have utilized that to insert our data into Elephant SQL and the data can be retrieved with the GET API/Endpoint.`

---

## Components

Recall that there are 3 or 4 components required

-   Frontend
-   Backend
-   Database
-   Mobile (For ADES students)

And in addition, **JiBaBoom**, the company you're developing for will also use your system.

Below is how they are connected with each other, and the means which they are connected.

```plantuml
@startuml
rectangle UI {
    [frontend]
    [mobile]
}


interface "database driver" as dd
[JiBaBoom] -right-> api
api -right-> [backend]
[backend] -right-> dd
[frontend] --> api
[mobile] --> api
dd -right-> [database]
@enduml
```
Link: [Component Diagram](https://www.plantuml.com/plantuml/svg/0/JK-x3i8m3Dpz5LRt_WAgki7EL6LmOhT4j0boGXV4lnCUJR5aoRxJdSzTogJvlioWuZA5QHOy7_41M6eODOOiWSrtNQBrinXu0e0lX8xa11kcJ9QI8AjVHHkaXCmmd7nFVOoBmLRzTCdj0UdceVGE39RSzNEXJZlvDgaHiFtfjnWLOFxpsy8Ow8ggFFO2 "project_worksheet-1")


### Questions:

1. Does the frontend communicate with the mobile? `(Yes/No)`
2. Does the frontend communicate directly with the database? `(No)`
3. How should the frontend display data from the database? `The index.js utilizes functions that include jquery and urls that send http requests to connect to the backend (app.js and database.js). The backend api sends sql queries to the database and the result will be sent to the front end (index.js) which gets displayed in index.html.` 
4. How does the frontend communicate with backend? `The frontend (index.js) utilizes functions that include jquery and urls that send http requests to connect to the api in app.js that calls functions in database.js to execute queries. Then, the result of the queries will be sent back to the frontend.`

---

## Sequence of event

Recall that the following are the required features:

1. Frontend/Mobile
    1. Data Viewer - To view data stored in the database
    2. Result Viewer - To view result based on data stored in the database and some computation input.
2. Backend
    1. Insert API - To insert data into the database
    2. Result API - to view result based on data stored in the database and some computation input.

Below is a diagram to illustrate the sequence of event and how the different features will trigger communications among the different components.

```plantuml
@startuml
title Adding data to backend
actor Administrator as admin
actor JiBaBoom as jbb
collections "frontend/mobile" as ui
participant backend
database  database

jbb -> backend: <b><font color=red>Q1) ???</b> api
backend -> database: insert data
database --> backend: return rows
backend --> jbb: return api response

newpage Viewing data from frontend/mobile

admin -> ui: <b><font color=red>Q2) ???</b> viewer
ui -> backend: get data*
note left: how can frontend/mobile\nget data from backend?
backend -> database: select data
database --> backend: return rows
backend --> ui: return api response
ui -> ui: update HTML DOM
ui --> admin

newpage Viewing result from JiBaBoom

jbb -> backend: <b><font color=red>Q3) ???</b> api
backend -> database: select data
database --> backend: return rows
backend -> backend: compute result
backend --> jbb: return api response

newpage Viewing result from Frontend/Mobile

admin -> ui: <b><font color=red>Q4) ???</b> viewer
ui -> backend: <b><font color=red>Q5) ???</b> api
backend -> database: select data
database --> backend: return rows
backend -> backend: compute result
backend --> ui: return api response
ui -> ui: update HTML DOM
ui --> admin
@enduml
```
Links:
- [Adding data to backend(Q1)](https://www.plantuml.com/plantuml/svg/0/nLHDIyD04BtlhnXwKoZYrwNKf1OH4Oi8uidB9fdMqMGtxCwQl-ziqxIr1Ypru6qpR_RDUxEFJ3nhnw4g5HEN2DT5GMO1XMODR27J-GUQGkcShHEm8aEUdOvVseEEXHLuJrCzjRQAzVSiKxajIyoPhF4mc3jhM8XEAfjHYOFO54ZLCfjoghNXzQWuEjCU0RgJKi87mwHh6S4uIyPpOGGPOjsLmo9vEZs2D4t79ra2kYQrwetNEfuHaF7eU5dOp1bkCplau0mus_WDXJI8WZKez7BqjJWJRGQRMYyGNWYRzUh4RmKxffLQhYig2jJluMpZuLFeqAb0tumli5L_h8nbX1BdF88tsq2kpUwyLzDrjt9M96d_QZp6rpfaDT5CtsPQwH4DjJ0Yt3tF7k3cSRP416hJysE1GX1ARZLteTel0kTxHE10drjuRgiwY9rMvu4fsJPvsxtRRD-SNFoMaxvBb_-zdJy6PI8yygFw0W00 "Adding data to backend")
- [Viewing data from frontend/mobile(Q2)](https://www.plantuml.com/plantuml/svg/1/nLHDIyD04BtlhnXwKoZYrwNKf1OH4Oi8uidB9fdMqMGtxCwQl-ziqxIr1Ypru6qpR_RDUxEFJ3nhnw4g5HEN2DT5GMO1XMODR27J-GUQGkcShHEm8aEUdOvVseEEXHLuJrCzjRQAzVSiKxajIyoPhF4mc3jhM8XEAfjHYOFO54ZLCfjoghNXzQWuEjCU0RgJKi87mwHh6S4uIyPpOGGPOjsLmo9vEZs2D4t79ra2kYQrwetNEfuHaF7eU5dOp1bkCplau0mus_WDXJI8WZKez7BqjJWJRGQRMYyGNWYRzUh4RmKxffLQhYig2jJluMpZuLFeqAb0tumli5L_h8nbX1BdF88tsq2kpUwyLzDrjt9M96d_QZp6rpfaDT5CtsPQwH4DjJ0Yt3tF7k3cSRP416hJysE1GX1ARZLteTel0kTxHE10drjuRgiwY9rMvu4fsJPvsxtRRD-SNFoMaxvBb_-zdJy6PI8yygFw0W00 "Adding data to backend")
- [Viewing result from JiBaBoom(Q3)](https://www.plantuml.com/plantuml/svg/2/nLHDIyD04BtlhnXwKoZYrwNKf1OH4Oi8uidB9fdMqMGtxCwQl-ziqxIr1Ypru6qpR_RDUxEFJ3nhnw4g5HEN2DT5GMO1XMODR27J-GUQGkcShHEm8aEUdOvVseEEXHLuJrCzjRQAzVSiKxajIyoPhF4mc3jhM8XEAfjHYOFO54ZLCfjoghNXzQWuEjCU0RgJKi87mwHh6S4uIyPpOGGPOjsLmo9vEZs2D4t79ra2kYQrwetNEfuHaF7eU5dOp1bkCplau0mus_WDXJI8WZKez7BqjJWJRGQRMYyGNWYRzUh4RmKxffLQhYig2jJluMpZuLFeqAb0tumli5L_h8nbX1BdF88tsq2kpUwyLzDrjt9M96d_QZp6rpfaDT5CtsPQwH4DjJ0Yt3tF7k3cSRP416hJysE1GX1ARZLteTel0kTxHE10drjuRgiwY9rMvu4fsJPvsxtRRD-SNFoMaxvBb_-zdJy6PI8yygFw0W00 "Adding data to backend")
- [Viewing result from Frontend/Mobile(Q4 & Q5)](https://www.plantuml.com/plantuml/svg/3/nLHDIyD04BtlhnXwKoZYrwNKf1OH4Oi8uidB9fdMqMGtxCwQl-ziqxIr1Ypru6qpR_RDUxEFJ3nhnw4g5HEN2DT5GMO1XMODR27J-GUQGkcShHEm8aEUdOvVseEEXHLuJrCzjRQAzVSiKxajIyoPhF4mc3jhM8XEAfjHYOFO54ZLCfjoghNXzQWuEjCU0RgJKi87mwHh6S4uIyPpOGGPOjsLmo9vEZs2D4t79ra2kYQrwetNEfuHaF7eU5dOp1bkCplau0mus_WDXJI8WZKez7BqjJWJRGQRMYyGNWYRzUh4RmKxffLQhYig2jJluMpZuLFeqAb0tumli5L_h8nbX1BdF88tsq2kpUwyLzDrjt9M96d_QZp6rpfaDT5CtsPQwH4DjJ0Yt3tF7k3cSRP416hJysE1GX1ARZLteTel0kTxHE10drjuRgiwY9rMvu4fsJPvsxtRRD-SNFoMaxvBb_-zdJy6PI8yygFw0W00 "Adding data to backend")

### Questions:

Choose the correct API/Viewer to be used for each of the `???` steps in the diagram:

-   Q1. `[Insert]` API (Delete one of the options)
-   Q2. `[Data]` Viewer
-   Q3. `[Result]` API  
-   Q4. `[Result]` Viewer
-   Q5. `[Result]` API

```
how can frontend/mobile\nget data from backend?
```

Think about how you can do it and type your answer below:

```
The frontend sends an HTTP request to the api and to the backend which should fetch the requested data from the backend and return it to the frontend. 
```

---