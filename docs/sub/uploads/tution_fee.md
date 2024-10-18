
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
