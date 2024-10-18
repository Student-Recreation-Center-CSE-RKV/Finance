
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
