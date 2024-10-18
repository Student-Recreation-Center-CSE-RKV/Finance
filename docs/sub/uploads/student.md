

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
