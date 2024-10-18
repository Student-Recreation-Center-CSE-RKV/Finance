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

![TutionFee  Header first half](https://github.com/revanthkumarJ/Finance-API/blob/main/images/TutionFeeHeader1.png)
![TutionFee  Header second half](https://github.com/revanthkumarJ/Finance-API/blob/main/images/TutionFeeHeader2.png)

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
![TutionFee  Header first half](https://github.com/revanthkumarJ/Finance-API/blob/main/images/HostelFeeHeader.png)


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

## Scholarship header format

![Scholarship  Header first half](https://github.com/revanthkumarJ/Finance-API/blob/main/images/scholarShipHeader1.png)
![Scholarship  Header first half](https://github.com/revanthkumarJ/Finance-API/blob/main/images/scholarShipHeader2.png)


### Success Response
```json
{
    "message": "Succesfully uploaded data"
}
```
| Endpoint                                | Method | Description                                           |
|-----------------------------------------|--------|-------------------------------------------------------|
| `/api/v1/upload/student/loan`           | POST   | Upload student loan data Excel file.                  |

## Loan Header Format

![Loan Header](https://github.com/revanthkumarJ/Finance-API/blob/main/LoanHeader.png)


### Success Response
```json
{
    "message": "Succesfully uploaded data"
}
```
| Endpoint                                | Method | Description                                           |
|-----------------------------------------|--------|-------------------------------------------------------|
| `/api/v1/upload/msi`                    | POST   | Upload MSI data Excel file.                           |

## MSI Excel format

| Category Name  | Payment Mode  | Bank Reference No | Transaction Date | Amount | Status | Date | Name of the Student | Class and Year | ID No | On Account Of | Amount Paid (Rs) | Amount In Words | Remarks |
| -------------- | ------------- | ----------------- | ---------------- | ------ | ------ | ---- | ------------------- | -------------- | ----- | ------------- | --------------- | --------------- | ------- |


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
