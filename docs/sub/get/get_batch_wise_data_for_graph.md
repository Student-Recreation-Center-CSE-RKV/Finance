
| Endpoint                                | Method | Description                                     |
|-----------------------------------------|--------|-------------------------------------------------|
| `/api/v1/graph/batch`                      | GET    | different types of fee Details batch wise   |

### Success Response 


```json
{
    "totalHostelfeeBybatch": [
        {
            "_id": "0",
            "totalHostelFee": 3766
        },
        {
            "_id": "2008",
            "totalHostelFee": 64757107
        }
    ],
    "totalTutionFeeByBatch": [
        {
            "_id": "0",
            "totalTutionFee": 3766
        },
        {
            "_id": "2008",
            "totalTutionFee": 64757107
        }
    ],
    "totalScholarShipByBatch": [
        {
            "_id": "0",
            "totalFeePaid": 0,
            "totalRemainingBalance": 0,
            "totalScholarShip": 0
        },
        {
            "_id": "2008",
            "totalFeePaid": 434750859,
            "totalRemainingBalance": -748523,
            "totalScholarShip": 339172356
        },
        {
            "_id": "2009",
            "totalFeePaid": 434179454,
            "totalRemainingBalance": -409118,
            "totalScholarShip": 339032986
        }
    ],
    "totalLoanByBatch": [
        {
            "_id": "2008",
            "totalLoan": 30470336
        },
        {
            "_id": "2009",
            "totalLoan": 30470336
        }
    ]
}
```
