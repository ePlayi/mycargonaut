# Vehicles

### Get single vehicle
GET /vehicles/<id>
-> returns vehicle

### Create new vehicle
POST /vehicles
```json
body:
{
“userId”: number,
“brand”: “string”,
“model”: “string”,
“seats”: number,
“storage”: number,
“image”: “string”
}
```
### Update vehicle
PUT /vehicles/<id>
```json
body:
{
“userId”: number,
“brand”: “string”,
“model”: “string”,
“seats”: number,
“storage”: number,
“image”: “string”
}
```
### Delete vehicle
DELETE /vehicles/<id>
