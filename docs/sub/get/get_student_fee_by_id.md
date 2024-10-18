
| Endpoint                                | Method | Description                                     |
|-----------------------------------------|--------|-------------------------------------------------|
| `/api/v1/student/fee/:id`              | GET    | Retrieve fee details for a student by ID.      |

### Success Response
```json
{
    "student": {
        "status": 200,
        "student": {
            "_id": "66eefebeef3eb9259f1610ea",
            "ID": "R081001",
            "StudentName": "NAVABOTHU SESHA VALLIKA",
            "Gender": "Girl",
            "Category": "OC",
            "FatherName": "Lakshmi Narayana",
            "BATCH": "2008",
            "__v": 0
        }
    },
    "tutionFee": {
        "_id": "66f1877a2f577d2b0a901935",
        "ID": "R081001",
        "BATCH": 2008,
        "Total": 19000,
        "installments": [
            {
                "ReceiptNo": "DUD9266337",
                "Date": "07.12.2020",
                "Amount": "19000",
                "_id": "67066cb96c7adcad3f3f0bfd"
            }
        ],
        "__v": 0,
        "admissionFee": [
            {
                "ReceiptNo": "0",
                "Date": "0",
                "Amount": "0",
                "_id": "67066cb96c7adcad3f3f0bfe"
            }
        ],
        "cautionDeposit": [
            {
                "ReceiptNo": "0",
                "Date": "0",
                "Amount": "0",
                "_id": "67066cb96c7adcad3f3f0bff"
            }
        ],
        "reAdmissionFee": [
            {
                "ReceiptNo": "0",
                "Date": "0",
                "Amount": "0",
                "_id": "67066cb96c7adcad3f3f0c00"
            }
        ]
    },
    "hostelFee": {
        "_id": "66f1435612a85def5213d65a",
        "ID": "R081001",
        "BATCH": 2008,
        "Total": 18000,
        "installments": [
            {
                "ReceiptNo": "DUD9266337",
                "Date": "07.12.2020",
                "Amount": "18000",
                "_id": "67066ee76c7adcad3f3f8cc9"
            }
        ],
        "__v": 0
    },
    "otherFee": {
        "_id": "6706502822554492fabb3e95",
        "ID": "R081001",
        "Total": 1200,
        "installments": [
            {
                "ReceiptNo": "DUN0046984",
                "Date": "2024-08-08",
                "Amount": "1200",
                "category": "EXAMINATION / CONVOCATION / CERTIFICATES FEE",
                "_id": "6706502822554492fabb3e9a"
            }
        ],
        "__v": 0
    },
    "sch": {
        "_id": "66f19691783ce1fb87d58bec",
        "ID": "R081001",
        "BATCH": "2008",
        "TotalSch": 141000,
        "OtherSch": 72000,
        "FeePaidbyTheStudent": 19000,
        "TotalFeePaid": 232000,
        "ActualPay": 232000,
        "RemainingBalance": 0,
        "RefundAmount": 0,
        "academicYears": [
            {
                "Year": "2008-09",
                "ActualPay": 36000,
                "SchReceived": null,
                "_id": "670674926c7adcad3f3fc7c4"
            },
            {
                "Year": "2009-10",
                "ActualPay": 36000,
                "SchReceived": 25000,
                "_id": "670674926c7adcad3f3fc7c5"
            },
            {
                "Year": "2010-11",
                "ActualPay": 40000,
                "SchReceived": 29000,
                "_id": "670674926c7adcad3f3fc7c6"
            },
            {
                "Year": "2011-12",
                "ActualPay": 40000,
                "SchReceived": 29000,
                "_id": "670674926c7adcad3f3fc7c7"
            },
            {
                "Year": "2012-13",
                "ActualPay": 40000,
                "SchReceived": 29000,
                "_id": "670674926c7adcad3f3fc7c8"
            },
            {
                "Year": "2013-14",
                "ActualPay": 40000,
                "SchReceived": 29000,
                "_id": "670674926c7adcad3f3fc7c9"
            },
            {
                "Year": "2014-15",
                "ActualPay": 0,
                "SchReceived": null,
                "_id": "670674926c7adcad3f3fc7ca"
            },
            {
                "Year": "2015-16",
                "ActualPay": 0,
                "SchReceived": null,
                "_id": "670674926c7adcad3f3fc7cb"
            },
            {
                "Year": "2016-17",
                "ActualPay": 0,
                "SchReceived": null,
                "_id": "670674926c7adcad3f3fc7cc"
            }
        ],
        "__v": 0
    },
    "loan": {
        "refund": {
            "RefundP1": 0,
            "RefundP1_1": 232000
        },
        "_id": "66efed3c5f59e2f58d81de37",
        "ID": "R081001",
        "grandTotal": 72000,
        "acYears": [
            {
                "year": "2008-09",
                "Loan": 36000,
                "Others": 0,
                "Total": 36000,
                "_id": "6706a8b131192aff31d0a2ee"
            },
            {
                "year": "2009-10",
                "Loan": 36000,
                "Others": 0,
                "Total": 36000,
                "_id": "6706a8b131192aff31d0a2ef"
            },
            {
                "year": "2010-11",
                "Loan": 0,
                "Others": 0,
                "Total": 0,
                "_id": "6706a8b131192aff31d0a2f0"
            },
            {
                "year": "2011-12",
                "Loan": 0,
                "Others": 0,
                "Total": 0,
                "_id": "6706a8b131192aff31d0a2f1"
            },
            {
                "year": "2012-13",
                "Loan": 0,
                "Others": 0,
                "Total": 0,
                "_id": "6706a8b131192aff31d0a2f2"
            },
            {
                "year": "2013-14",
                "Loan": 0,
                "Others": 0,
                "Total": 0,
                "_id": "6706a8b131192aff31d0a2f3"
            }
        ],
        "__v": 0
    }
}
```
### Failure Response 
```json
{
    "message": "Student not found"
}

```

| Endpoint                                | Method | Description                                     |
|-----------------------------------------|--------|-------------------------------------------------|
| `/api/v1/students`                      | GET    | Retrieve fee details of all students in above json format      |

