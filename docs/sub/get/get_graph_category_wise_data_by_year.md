

| Endpoint                                | Method | Description                                     |
|-----------------------------------------|--------|-------------------------------------------------|
| `/api/v1/graph/category/:batchYear`                      | GET    | different types of fee Details category wise   |

### Success Response 


```json
{
    "totalPeople": [
        {
            "_id": "BC-A",
            "totalPeople": 240
        },
        {
            "_id": "BC-B",
            "totalPeople": 397
        },
        {
            "_id": "BC-C",
            "totalPeople": 16
        },
        {
            "_id": "BC-D",
            "totalPeople": 268
        },
        {
            "_id": "BC-E",
            "totalPeople": 97
        },
        {
            "_id": "NA",
            "totalPeople": 11
        },
        {
            "_id": "OC",
            "totalPeople": 444
        },
        {
            "_id": "SC",
            "totalPeople": 366
        },
        {
            "_id": "ST",
            "totalPeople": 145
        }
    ],
    "feesBycategory": [
        {
            "_id": "BC-A",
            "totalFeePaid": 51253898,
            "totalRemainingBalance": -45140
        },
        {
            "_id": "BC-B",
            "totalFeePaid": 87802072,
            "totalRemainingBalance": -265022
        },
        {
            "_id": "BC-C",
            "totalFeePaid": 3845470,
            "totalRemainingBalance": -133470
        },
        {
            "_id": "BC-D",
            "totalFeePaid": 58835701,
            "totalRemainingBalance": 56157
        },
        {
            "_id": "BC-E",
            "totalFeePaid": 20900908,
            "totalRemainingBalance": -40264
        },
        {
            "_id": "NA",
            "totalFeePaid": 2321058,
            "totalRemainingBalance": -1058
        },
        {
            "_id": "OC",
            "totalFeePaid": 98740181,
            "totalRemainingBalance": -584639
        },
        {
            "_id": "SC",
            "totalFeePaid": 79488416,
            "totalRemainingBalance": 130982
        },
        {
            "_id": "ST",
            "totalFeePaid": 31294111,
            "totalRemainingBalance": 134975
        }
    ],
    "gender": [
        {
            "_id": "Girl",
            "totalStudents": 831
        },
        {
            "_id": "Boy",
            "totalStudents": 1150
        },
        {
            "_id": "NA",
            "totalStudents": 3
        }
    ],
    "totalHostelFee": [
        {
            "_id": "BC-A",
            "totalHostelFee": 7942697
        },
        {
            "_id": "BC-B",
            "totalHostelFee": 12951432
        },
        {
            "_id": "BC-C",
            "totalHostelFee": 555408
        },
        {
            "_id": "BC-D",
            "totalHostelFee": 8890474
        },
        {
            "_id": "BC-E",
            "totalHostelFee": 3064111
        },
        {
            "_id": "NA",
            "totalHostelFee": 153992
        },
        {
            "_id": "OC",
            "totalHostelFee": 15440922
        },
        {
            "_id": "SC",
            "totalHostelFee": 10541264
        },
        {
            "_id": "ST",
            "totalHostelFee": 5195573
        }
    ],
    "totalTutionFee": [
        {
            "_id": "BC-A",
            "totalTutionFee": 7912697
        },
        {
            "_id": "BC-B",
            "totalTutionFee": 12997083
        },
        {
            "_id": "BC-C",
            "totalTutionFee": 555408
        },
        {
            "_id": "BC-D",
            "totalTutionFee": 8977974
        },
        {
            "_id": "BC-E",
            "totalTutionFee": 3064111
        },
        {
            "_id": "NA",
            "totalTutionFee": 153992
        },
        {
            "_id": "OC",
            "totalTutionFee": 15612748
        },
        {
            "_id": "SC",
            "totalTutionFee": 10540538
        },
        {
            "_id": "ST",
            "totalTutionFee": 5220161
        }
    ],
    "totalLoan": [
        {
            "_id": "BC-A",
            "totalLoan": 3648188
        },
        {
            "_id": "BC-B",
            "totalLoan": 6322124
        },
        {
            "_id": "BC-C",
            "totalLoan": 163000
        },
        {
            "_id": "BC-D",
            "totalLoan": 4024848
        },
        {
            "_id": "BC-E",
            "totalLoan": 1213388
        },
        {
            "_id": "NA",
            "totalLoan": 89884
        },
        {
            "_id": "OC",
            "totalLoan": 6882355
        },
        {
            "_id": "SC",
            "totalLoan": 5645757
        },
        {
            "_id": "ST",
            "totalLoan": 2414792
        }
    ]
}
```
### Failure Response
```json
{
    "totalPeople": [],
    "feesBycategory": [],
    "gender": [],
    "totalHostelFee": [],
    "totalTutionFee": [],
    "totalLoan": []
}
```