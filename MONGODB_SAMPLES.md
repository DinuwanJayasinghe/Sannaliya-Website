# MongoDB Collections & Sample Data

Below are the sample JSON documents for each collection in the `sannaliya_db`.

## 1. `users` Collection
Stores both customers and admin accounts.

```json
{
  "_id": "60d5ecb8b391d21f842d0a1c",
  "firstName": "Sannaliya",
  "lastName": "Admin",
  "email": "sannaliya98@gmail.com",
  "password": "$2a$10$...(hashed_password)...",
  "phone": "0771115024",
  "address": "No 45, Main St, Colombo",
  "district": "Colombo",
  "city": "Colombo 07",
  "roles": ["ROLE_ADMIN"]
}
```

## 2. `products` Collection
Stores product details with size-wise variations and stock levels.

```json
{
  "_id": "60d5ecb8b391d21f842d0a1d",
  "name": "Elegant Office Frock",
  "description": "A stylish and professional office wear frock designed for comfort and elegance.",
  "category": "Office wear",
  "subCategory": "Frocks",
  "price": 3500.0,
  "weight": 0.4,
  "sizes": [
    {
      "size": "M",
      "imageUrl": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80",
      "stock": 15
    },
    {
      "size": "L",
      "imageUrl": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80",
      "stock": 8
    }
  ],
  "reviews": [
    {
      "userId": "60d5ecb8b391d21f842d0a1e",
      "userName": "Kamal Perera",
      "comment": "Very comfortable for office wear!",
      "rating": 5,
      "timestamp": 1713345600000
    }
  ],
  "averageRating": 5.0,
  "isNewArrival": true,
  "stockQuantity": 23
}
```

## 3. `orders` Collection
Stores order information, customer details for COD, and order items.

```json
{
  "_id": "60d5ecb8b391d21f842d0a1f",
  "userId": "60d5ecb8b391d21f842d0a1e",
  "firstName": "Kamal",
  "lastName": "Perera",
  "email": "kamal@gmail.com",
  "address": "No 12, Temple Road",
  "district": "Kandy",
  "nearestCity": "Peradeniya",
  "phone1": "0712345678",
  "phone2": "0778765432",
  "items": [
    {
      "productId": "60d5ecb8b391d21f842d0a1d",
      "productName": "Elegant Office Frock",
      "size": "M",
      "quantity": 1,
      "price": 3500.0
    }
  ],
  "totalPrice": 3500.0,
  "deliveryCharge": 500.0,
  "grandTotal": 4000.0,
  "status": "PENDING",
  "paymentMethod": "Cash on Delivery",
  "createdAt": 1713432000000
}
```

## 4. `audit_logs` Collection
Tracks administrative and system actions for security and monitoring.

```json
{
  "_id": "60d5ecb8b391d21f842d0a20",
  "action": "USER_LOGIN",
  "performedBy": "sannaliya98@gmail.com",
  "details": "User logged in",
  "timestamp": 1713432500000
}
```
