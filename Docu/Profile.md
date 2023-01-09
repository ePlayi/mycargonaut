# Profile

### Get profile
GET /profile
-> returns user

### Get user profile by id
GET /user/<id>
-> returns user

### Get vehicles of user
GET /profile/vehicles
-> returns vehicleList

### Get ratings
GET /profile/ratings
-> returns ratingList

### Update profile
PUT /profile
```json
body:
{
“name”: “string”,
“nachname”: “string”,
“email”: “string”,
“mobilenr”: “string”,
“birthdate”: “string”,
“gender”: “string”,
“address”: “string”,
“profilePicture”: “string”,
“description”: “string”
}
```

### Update password
PUT /password
```json
body:
{
“password”: “string”
}
```
