# Finance


## Description
A project for the finance office of our college. The API allows users to upload bank MSI, student details in Excel, tuition fee Excel, hostel fee Excel, and more. It scrapes these details and organizes them in a structured manner, enabling users to retrieve any information using filter options for graphs and other analyses.

## Features
- Upload bank MSI and various Excel files (student details, tuition fees, hostel fees).
- Scraping and organizing data for easy access.
- Filtering options for retrieving specific details.
- Support for generating graphs and analytics based on filtered data.

## Technologies Used
- **Backend**: Express.js with TypeScript

## Contributors
- B. Nagarjuna
- J. Revanth Kumar

## API Endpoints

## Upload APIS

| Endpoint                                | Method | Description                                           |
|-----------------------------------------|--------|-------------------------------------------------------|
| `/api/v1/upload/student/details`       | POST   | Upload student details Excel file.                   |

## Student Details Excel Header Format

The Excel file for uploading student details should have the following headers:

| S.No. | ROLL No. | NAME AS PER SSC RECORDS | Father Name | GENDER | CASTE | TC | BATCH |
|-------|----------|-------------------------|-------------|--------|-------|----|-------|


### Success Response
```json
{
    "message": "successfully uploaded student Details"
}
```

| Endpoint                                | Method | Description                                           |
|-----------------------------------------|--------|-------------------------------------------------------|
| `/api/v1/upload/student/fee`           | POST   | Upload tuition fee details for students.             |

## Tuition Fee Excel Header Format

The Excel file for uploading tuition fee details should have the following headers:

| S.No | I.D NO | Student Name | Father Name | BATCH | Gender | Category | Admission Fee Receipt No. | Admission Fee Date | Admission Fee Amount | Re Admission Fee Receipt No. | Re Admission Fee Date | Re Admission Fee Amount | Caution Deposit Receipt No. | Caution Deposit Date | Caution Deposit Amount | 1st Installment Receipt No. | 1st Installment Date | 1st Installment Amount | 2nd Installment Receipt No. | 2nd Installment Date | 2nd Installment Amount | 3rd Installment Receipt No. | 3rd Installment Date | 3rd Installment Amount | Total |
|------|--------|--------------|-------------|-------|--------|----------|--------------------------|-------------------|---------------------|-------------------------------|---------------------|-----------------------|-------------------------------|---------------------|-----------------------|-------------------------------|---------------------|-----------------------|-------------------------------|---------------------|-----------------------|-------------------------------|---------------------|-----------------------|-------|
|      |        |              |             |       |        |          |                          |                   |                     |                               |                     |                       |                               |                     |                       |                               |                     |                       |                               |                     |                       |                               |                     |                       |       |

### Success Response
```json
[
    {
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
    ...
]
```
| Endpoint                                | Method | Description                                           |
|-----------------------------------------|--------|-------------------------------------------------------|
| `/api/v1/upload/student/hostelFee`     | POST   | Upload hostel fee details for students.              |

## Hostel Fee Excel Header Format

The Excel file for uploading hostel fee details should have the following headers:

| S.No | I.D NO | Student Name | Father Name | BATCH | Gender | Category | 1st Installment Receipt No. | 1st Installment Date | 1st Installment Amount | 2nd Installment Receipt No. | 2nd Installment Date | 2nd Installment Amount | 3rd Installment Receipt No. | 3rd Installment Date | 3rd Installment Amount | Total |
|------|--------|--------------|-------------|-------|--------|----------|------------------------------|----------------------|------------------------|-------------------------------|-----------------------|------------------------|-------------------------------|---------------------|-----------------------|-------|
|      |        |              |             |       |        |          |                              |                      |                        |                               |                       |                        |                               |                     |                       |       |

The installments should be merged like in image 

### Success Response
```json
{
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
}
```

| Endpoint                                | Method | Description                                           |
|-----------------------------------------|--------|-------------------------------------------------------|
| `/api/v1/upload/student/sch`            | POST   | Upload scholarship data Excel file.                   |

### Success Response
```json
{
    "message": "Succesfully uploaded data"
}
```
| Endpoint                                | Method | Description                                           |
|-----------------------------------------|--------|-------------------------------------------------------|
| `/api/v1/upload/student/loan`           | POST   | Upload student loan data Excel file.                  |

### Success Response
```json
{
    "message": "Succesfully uploaded data"
}
```
| Endpoint                                | Method | Description                                           |
|-----------------------------------------|--------|-------------------------------------------------------|
| `/api/v1/upload/msi`                    | POST   | Upload MSI data Excel file.                           |

### Success Response
```json
[
    {
        "_id": "6704e83e2f274ea31a372c77",
        "CategoryName": "EXAMINATION / CONVOCATION / CERTIFICATES FEE",
        "PaymentMode": "UPI",
        "BankReferenceNo": "DUN0046984",
        "TransactionDate": "2024-08-08T00:00:00.000Z",
        "Amount": 1200,
        "Status": "Completed Successfully",
        "Date": "2024-08-08",
        "NameoftheStudent": "K. Lavanya",
        "ClassAndYear": "Mu8 and PUC1",
        "IDNo": "R081001",
        "OnAccountOf": "EXAMINATION FEE",
        "AmountPaidRs": "1000",
        "AmountInWords": "One thousand rupees",
        "isVerified": false,
        "__v": 0
    },
    ...
]
```


## GET ROUTES

| Endpoint                                | Method | Description                                     |
|-----------------------------------------|--------|-------------------------------------------------|
| /api/v1/student/:id                  | GET    | Retrieve details of a student by ID.           |

### Success Response
```json
{
    "status": 200,
    "student": {
        "_id": "66eefebeef3eb9259f1610ea",
        "ID": "R200716",
        "StudentName": "JILAKARA REVANTH KUMAR",
        "Gender": "Boy",
        "Category": "BC-B",
        "FatherName": "Adi Narayana",
        "BATCH": "2020",
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




| Endpoint                                | Method | Description                                     |
|-----------------------------------------|--------|-------------------------------------------------|
| `/api/v1/bank/due/:dueNumber`                      | GET    | Retrieve fee details based on Due Number      |

### Success Response 
```json
{
    "status": 200,
    "tutionFee": {
        "_id": "66f1877a2f577d2b0a901939",
        "ID": "R081002",
        "BATCH": 2008,
        "Total": 16664,
        "installments": [
            {
                "ReceiptNo": "5330",
                "Date": "18.05.2015",
                "Amount": "16664",
                "_id": "67066cb96c7adcad3f3f0c0e"
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
    "hostelFee": {
        "_id": "66f1435612a85def5213d65e",
        "ID": "R081002",
        "BATCH": 2008,
        "Total": 16664,
        "installments": [
            {
                "ReceiptNo": "5330",
                "Date": "18.05.2015",
                "Amount": "16664",
                "_id": "67066ee76c7adcad3f3f8ccf"
            }
        ],
        "__v": 0
    },
    "otherFee": null
}
```

### Failure Response 
```json

{
    "message": "Due No. Not found"
}
```


| Endpoint                                | Method | Description                                     |
|-----------------------------------------|--------|-------------------------------------------------|
| `/api/v1/getAllAddedDues`                      | GET    | Retrieve all details of dues added by admin explicitly      |

### Success Response 


```json
[
{
    "_id": "67064aaba66f7fbb81dd1579",
    "dueNumber": "gfjhnd",
    "amount": 3426,
    "feeType": "Tuition Fee",
    "addedToID": "R091001",
    "image":base64String,   
    "addedToID": "R081001",
    "addedOn": "2024-10-07T10:22:58.161Z",
    "__v": 0
},...
]
```





| Endpoint                                | Method | Description                                     |
|-----------------------------------------|--------|-------------------------------------------------|
| `/api/v1/graph/batch`                      | GET    | different types of fee Details batch wise   |

### Success Response 


```json
{
    "totalHostelfeeBybatch": [
        {
            "_id": "0",
            "totalHostelFee": 3766
        },
        {
            "_id": "2008",
            "totalHostelFee": 64757107
        }
    ],
    "totalTutionFeeByBatch": [
        {
            "_id": "0",
            "totalTutionFee": 3766
        },
        {
            "_id": "2008",
            "totalTutionFee": 64757107
        }
    ],
    "totalScholarShipByBatch": [
        {
            "_id": "0",
            "totalFeePaid": 0,
            "totalRemainingBalance": 0,
            "totalScholarShip": 0
        },
        {
            "_id": "2008",
            "totalFeePaid": 434750859,
            "totalRemainingBalance": -748523,
            "totalScholarShip": 339172356
        },
        {
            "_id": "2009",
            "totalFeePaid": 434179454,
            "totalRemainingBalance": -409118,
            "totalScholarShip": 339032986
        }
    ],
    "totalLoanByBatch": [
        {
            "_id": "2008",
            "totalLoan": 30470336
        },
        {
            "_id": "2009",
            "totalLoan": 30470336
        }
    ]
}
```




| Endpoint                                | Method | Description                                     |
|-----------------------------------------|--------|-------------------------------------------------|
| `/api/v1/graph/category/:batchYear`                      | GET    | different types of fee Details category wise   |

### Success Response 


```json
{
    "totalPeople": [
        {
            "_id": "BC-A",
            "totalPeople": 240
        },
        {
            "_id": "BC-B",
            "totalPeople": 397
        },
        {
            "_id": "BC-C",
            "totalPeople": 16
        },
        {
            "_id": "BC-D",
            "totalPeople": 268
        },
        {
            "_id": "BC-E",
            "totalPeople": 97
        },
        {
            "_id": "NA",
            "totalPeople": 11
        },
        {
            "_id": "OC",
            "totalPeople": 444
        },
        {
            "_id": "SC",
            "totalPeople": 366
        },
        {
            "_id": "ST",
            "totalPeople": 145
        }
    ],
    "feesBycategory": [
        {
            "_id": "BC-A",
            "totalFeePaid": 51253898,
            "totalRemainingBalance": -45140
        },
        {
            "_id": "BC-B",
            "totalFeePaid": 87802072,
            "totalRemainingBalance": -265022
        },
        {
            "_id": "BC-C",
            "totalFeePaid": 3845470,
            "totalRemainingBalance": -133470
        },
        {
            "_id": "BC-D",
            "totalFeePaid": 58835701,
            "totalRemainingBalance": 56157
        },
        {
            "_id": "BC-E",
            "totalFeePaid": 20900908,
            "totalRemainingBalance": -40264
        },
        {
            "_id": "NA",
            "totalFeePaid": 2321058,
            "totalRemainingBalance": -1058
        },
        {
            "_id": "OC",
            "totalFeePaid": 98740181,
            "totalRemainingBalance": -584639
        },
        {
            "_id": "SC",
            "totalFeePaid": 79488416,
            "totalRemainingBalance": 130982
        },
        {
            "_id": "ST",
            "totalFeePaid": 31294111,
            "totalRemainingBalance": 134975
        }
    ],
    "gender": [
        {
            "_id": "Girl",
            "totalStudents": 831
        },
        {
            "_id": "Boy",
            "totalStudents": 1150
        },
        {
            "_id": "NA",
            "totalStudents": 3
        }
    ],
    "totalHostelFee": [
        {
            "_id": "BC-A",
            "totalHostelFee": 7942697
        },
        {
            "_id": "BC-B",
            "totalHostelFee": 12951432
        },
        {
            "_id": "BC-C",
            "totalHostelFee": 555408
        },
        {
            "_id": "BC-D",
            "totalHostelFee": 8890474
        },
        {
            "_id": "BC-E",
            "totalHostelFee": 3064111
        },
        {
            "_id": "NA",
            "totalHostelFee": 153992
        },
        {
            "_id": "OC",
            "totalHostelFee": 15440922
        },
        {
            "_id": "SC",
            "totalHostelFee": 10541264
        },
        {
            "_id": "ST",
            "totalHostelFee": 5195573
        }
    ],
    "totalTutionFee": [
        {
            "_id": "BC-A",
            "totalTutionFee": 7912697
        },
        {
            "_id": "BC-B",
            "totalTutionFee": 12997083
        },
        {
            "_id": "BC-C",
            "totalTutionFee": 555408
        },
        {
            "_id": "BC-D",
            "totalTutionFee": 8977974
        },
        {
            "_id": "BC-E",
            "totalTutionFee": 3064111
        },
        {
            "_id": "NA",
            "totalTutionFee": 153992
        },
        {
            "_id": "OC",
            "totalTutionFee": 15612748
        },
        {
            "_id": "SC",
            "totalTutionFee": 10540538
        },
        {
            "_id": "ST",
            "totalTutionFee": 5220161
        }
    ],
    "totalLoan": [
        {
            "_id": "BC-A",
            "totalLoan": 3648188
        },
        {
            "_id": "BC-B",
            "totalLoan": 6322124
        },
        {
            "_id": "BC-C",
            "totalLoan": 163000
        },
        {
            "_id": "BC-D",
            "totalLoan": 4024848
        },
        {
            "_id": "BC-E",
            "totalLoan": 1213388
        },
        {
            "_id": "NA",
            "totalLoan": 89884
        },
        {
            "_id": "OC",
            "totalLoan": 6882355
        },
        {
            "_id": "SC",
            "totalLoan": 5645757
        },
        {
            "_id": "ST",
            "totalLoan": 2414792
        }
    ]
}
```
### Failure Response
```json
{
    "totalPeople": [],
    "feesBycategory": [],
    "gender": [],
    "totalHostelFee": [],
    "totalTutionFee": [],
    "totalLoan": []
}
```

## PUT Routes



| Endpoint                                | Method | Description                                     |
|-----------------------------------------|--------|-------------------------------------------------|
| `/update/student/?id`                      | PUT    | Edit student details based on id   |


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
    "_id": "66eefebfef3eb9259f1610ed",
    "ID": "R081002",
    "StudentName": "PURIPARTI ANITHA RR",
    "Gender": "Girl",
    "Category": "BC-A",
    "FatherName": "Anjaneyulu",
    "BATCH": "2008",
    "__v": 0
}
```

### Failure response
```json
{
    "message": "Student not found"
}

```





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


