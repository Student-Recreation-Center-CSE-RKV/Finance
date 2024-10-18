


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

