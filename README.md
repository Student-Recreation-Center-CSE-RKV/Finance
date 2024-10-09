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

| S.No | I.D NO | Student Name | Father Name | BATCH | Gender | Category | Admission Fee Receipt No. | Admission Fee Date | Admission Fee Amount | Re Admission Fee Receipt No. | Re Admission Fee Date | Re Admission Fee Amount | Caution Deposit Receipt No. | Caution Deposit Date | Caution Deposit Amount | 1st Installment Receipt No. | 1st Installment Date | 1st Installment Amount | 2nd Installment Receipt No. | 2nd Installment Date | 2nd Installment Amount | 3rd Installment Receipt No. | 3rd Installment Date | 3rd Installment Amount | 4th Installment Receipt No. | 4th Installment Date | 4th Installment Amount | 5th Installment Receipt No. | 5th Installment Date | 5th Installment Amount | 6th Installment Receipt No. | 6th Installment Date | 6th Installment Amount | 7th Installment Receipt No. | 7th Installment Date | 7th Installment Amount | 8th Installment Receipt No. | 8th Installment Date | 8th Installment Amount | 9th Installment Receipt No. | 9th Installment Date | 9th Installment Amount | 15th Installment Receipt No. | 15th Installment Date | 15th Installment Amount | Total |
|------|--------|--------------|-------------|-------|--------|----------|----------------------------|--------------------|----------------------|-------------------------------|-----------------------|------------------------|-----------------------------|---------------------|-----------------------|-------------------------------|--------------------|---------------------|-------------------------------|--------------------|---------------------|-------------------------------|--------------------|---------------------|-------------------------------|--------------------|---------------------|-------------------------------|--------------------|---------------------|-------------------------------|--------------------|---------------------|-------------------------------|--------------------|---------------------|-------------------------------|--------------------|---------------------|


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

| S.No | I.D NO | Student Name | Father Name | BATCH | Gender | Category | 1st Installment Receipt No. | 1st Installment Date | 1st Installment Amount | 2nd Installment Receipt No. | 2nd Installment Date | 2nd Installment Amount | 3rd Installment Receipt No. | 3rd Installment Date | 3rd Installment Amount | 4th Installment Receipt No. | 4th Installment Date | 4th Installment Amount | 5th Installment Receipt No. | 5th Installment Date | 5th Installment Amount | 6th Installment Receipt No. | 6th Installment Date | 6th Installment Amount | 7th Installment Receipt No. | 7th Installment Date | 7th Installment Amount | 8th Installment Receipt No. | 8th Installment Date | 8th Installment Amount | 9th Installment Receipt No. | 9th Installment Date | 9th Installment Amount | 10th Installment Receipt No. | 10th Installment Date | 10th Installment Amount | 11th Installment Receipt No. | 11th Installment Date | 11th Installment Amount | 12th Installment Receipt No. | 12th Installment Date | 12th Installment Amount | 13th Installment Receipt No. | 13th Installment Date | 13th Installment Amount | 14th Installment Receipt No. | 14th Installment Date | 14th Installment Amount | 15th Installment Receipt No. | 15th Installment Date | 15th Installment Amount | Total |
|------|--------|--------------|-------------|-------|--------|----------|------------------------------|----------------------|------------------------|-------------------------------|-----------------------|------------------------|-------------------------------|---------------------|-----------------------|-------------------------------|--------------------|---------------------|-------------------------------|--------------------|---------------------|-------------------------------|--------------------|---------------------|-------------------------------|--------------------|---------------------|-------------------------------|--------------------|---------------------|-------------------------------|--------------------|---------------------|-------------------------------|--------------------|---------------------|-------------------------------|--------------------|---------------------|


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


