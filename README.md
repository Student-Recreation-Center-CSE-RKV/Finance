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

| Endpoint                                | Method | Description                                           |
|-----------------------------------------|--------|-------------------------------------------------------|
| `/api/v1/upload/student/details`       | POST   | Upload student details Excel file.                   |

### Success Response
```json
{
    "message": "successfully uploaded student Details"
}


| Endpoint                                | Method | Description                                           |
|-----------------------------------------|--------|-------------------------------------------------------|
| `/api/v1/upload/student/fee`           | POST   | Upload tuition fee details for students.             |

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

