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

