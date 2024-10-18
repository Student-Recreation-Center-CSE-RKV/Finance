

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



