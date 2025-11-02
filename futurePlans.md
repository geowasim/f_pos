# 💼 Future plans

- **useReducer**
- **Multi Projects**
- **Multi Machines**

---

## Current Invoice

````js
{
    "cartItems": [
        {
            "id": 2,
            "title": "Amber Oud",
            "qty": 1,
            "vol": "200",
            "category": "Perfume",
            "description": "عطر عود العنبر",
            "unitPrice": 199,
            "finalPrice": 398,
            "lineTotal": 398
        }
    ],
    "paymentMethod": {
        "method": "Mada"
    },
    "invoiceNumber": {
        "sn": 100
    },
    "paidandchange": {
        "paidMoney": null,
        "change": null
    },
    "dateMyPC": "2025-09-26T20:43:58.521Z",
    "subtotal": 149.25,
    "tax": 22.39,
    "totalPrice": 171.64,
    "totalItems": 1,
    "itemsPrice": 149.25,
    "totalBasicPrice": 199,
    "isOffer": true,
    "priceBeforeDiscount": 199
}
```

## Future strucutr for multi projects- one local machine
-

```js
{
  ownerData: {
    companyName: "My Company",
    commercialNumber: "1234567890",
    address: "الرياض، السعودية",
    phone: "+966-5XXXXXXX"
  },
  currentProjectId: "proj-003",
  invoiceSerial: 0,
  projects: [
    {
      projectId: "proj-001",
      name: "معرض الرياض",
      startDate: "2025-09-01",
      invoices: [ ... ]
    },
    {
      projectId: "proj-002",
      name: "معرض جدة",
      startDate: "2025-10-15",
      invoices: [ ... ]
    },
    {
      projectId: "proj-003",
      name: "معرض الدمام",
      startDate: "2025-11-01",
      invoices: [ ... ]
    }
  ]
}
````

### Expected future invoices structure :

- Multi location

```js
{
  "owners": {
    "ownerId_001": {
      "companyName": "...",
      "projects": {
        "proj_001": {
          "name": "...",
          "startDate": "...",
          "invoices": {
            "inv_001": { ... },
            "inv_002": { ... }
          }
        }
      }
    }
  }
}
```

## Exapnd with users and sessions

- Structure

```js
{
  sessionId: "session-2025-09-26-A",
  startTime: "2025-09-26T09:00:00",
  endTime: null,
  cashier: "Wasim",
  openingCash: 500,
  invoices: [],
  totalSales: 0,
  totalReturns: 0,
  closingCash: null
}
```

-invoice stucutre with session

```js
{
  sessionId: "session-2025-09-26-A",
  startTime: "2025-09-26T09:00:00",
  endTime: null,
  cashier: "Wasim",
  openingCash: 500,
  invoices: [101, 102, 103],
  totalSales: 171.64,
  totalReturns: 0,
  closingCash: null
}
```

## create inventory
