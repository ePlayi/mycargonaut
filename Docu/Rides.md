# Rides


### Get single ride
GET /rides/<id>
-> returns ride

### Get all rides
GET /rides
-> returns rideList

### Create new ride
POST /rides

```json
body:
{
“driverId”: number,
“vehicleId”: number,
“start”: “string”,
“destination”: “string”,
“dateTime”: “string”,
“price”: number,
“description”: “string”
}
```


### Update ride
PUT /rides/<id>

```json
body:
{
“driverId”: number,
“vehicleId”: number,
“start”: “string”,
“destination”: “string”,
“dateTime”: “string”,
“price”: number,
“description”: “string”,
“open”: bool,
“posLongitude”: decimal,
“postLatitude”: decimal
}
```

### Delete ride
DELETE /rides/<id>
