

| Endpoint                                | Method | Description                                     |
|-----------------------------------------|--------|-------------------------------------------------|
| `/update/student/tutionFee/addDue`                      | PUT    | Add New Due  to Tution Fee |


### Raw input
```json
{
    "StudentName": "PURIPARTI ANITHA RR",
    "Gender": "Girl",
    "Category": "BC-A",
    "FatherName": "Anjaneyulu",
    "BATCH": "2008"
}
```

### Success Response 


```json


{
    "updatedTutionFee": {
        "_id": "66f1877a2f577d2b0a901939",
        "ID": "R081002",
        "BATCH": 2008,
        "Total": 19664,
        "installments": [
            {
                "ReceiptNo": "5330",
                "Date": "18.05.2015",
                "Amount": "16664",
                "_id": "67066cb96c7adcad3f3f0c0e"
            },
            {
                "ReceiptNo": "sdfgrfgd",
                "Date": "08-08-2022",
                "Amount": "3000",
                "_id": "6706b5b7a013848760298c7d"
            }
        ],
        "__v": 0,
        "admissionFee": [
            {
                "ReceiptNo": "0",
                "Date": "0",
                "Amount": "0",
                "_id": "67066cb96c7adcad3f3f0c0f"
            }
        ],
        "cautionDeposit": [
            {
                "ReceiptNo": "0",
                "Date": "0",
                "Amount": "0",
                "_id": "67066cb96c7adcad3f3f0c10"
            }
        ],
        "reAdmissionFee": [
            {
                "ReceiptNo": "0",
                "Date": "0",
                "Amount": "0",
                "_id": "67066cb96c7adcad3f3f0c11"
            }
        ]
    },
    "updatedsch": {
        "_id": "66f19691783ce1fb87d58bf8",
        "ID": "R081002",
        "BATCH": "2008",
        "TotalSch": 212532,
        "OtherSch": 2804,
        "FeePaidbyTheStudent": 19664,
        "TotalFeePaid": 235000,
        "ActualPay": 232000,
        "RemainingBalance": -3000,
        "RefundAmount": 0,
        "academicYears": [
            {
                "Year": "2008-09",
                "ActualPay": 36000,
                "SchReceived": 33196,
                "_id": "670674926c7adcad3f3fc7e1"
            },
            {
                "Year": "2009-10",
                "ActualPay": 36000,
                "SchReceived": 34620,
                "_id": "670674926c7adcad3f3fc7e2"
            },
            {
                "Year": "2010-11",
                "ActualPay": 40000,
                "SchReceived": 38620,
                "_id": "670674926c7adcad3f3fc7e3"
            },
            {
                "Year": "2011-12",
                "ActualPay": 40000,
                "SchReceived": 35820,
                "_id": "670674926c7adcad3f3fc7e4"
            },
            {
                "Year": "2012-13",
                "ActualPay": 40000,
                "SchReceived": 35820,
                "_id": "670674926c7adcad3f3fc7e5"
            },
            {
                "Year": "2013-14",
                "ActualPay": 40000,
                "SchReceived": 34456,
                "_id": "670674926c7adcad3f3fc7e6"
            },
            {
                "Year": "2014-15",
                "ActualPay": 0,
                "SchReceived": null,
                "_id": "670674926c7adcad3f3fc7e7"
            },
            {
                "Year": "2015-16",
                "ActualPay": 0,
                "SchReceived": null,
                "_id": "670674926c7adcad3f3fc7e8"
            },
            {
                "Year": "2016-17",
                "ActualPay": 0,
                "SchReceived": null,
                "_id": "670674926c7adcad3f3fc7e9"
            }
        ],
        "__v": 0
    },
    "newDueAddedResponse": {
        "dueNumber": "sdfgrfgd",
        "amount": 3000,
        "feeType": "Tuition Fee",
        "addedToID": "R081002",
        "image":base64 string,
        "_id": "6706b5b8a013848760298c9c",
        "addedOn": "2024-10-09T16:56:24.062Z",
        "__v": 0
    }
}
```

### Failure responses
```json
{
    "error": "ID, ReceiptNo, Date, and Amount are required."
}

```




| Endpoint                                | Method | Description                                     |
|-----------------------------------------|--------|-------------------------------------------------|
| `/update/student/hostelFee/addDue`                      | PUT    | Add New Due  to Hostel Fee. Output is same as tution Fee |


