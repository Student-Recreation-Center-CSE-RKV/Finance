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
