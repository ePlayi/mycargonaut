# Bookings



### Get single booking
GET /bookings/<id>
-> returns booking

### Get bookings for a customer
GET /profile/bookings
-> returns bookingList

### Get booking requests for ride
GET /rides/<id>/bookings
-> returns bookingList

### Create new booking
POST /bookings

```json
body:
{
“customerId”: number,
“rideId”: number,
“status”: number
}
```

### STATUS LIST:
1 - requested, 2 - booked, 3 - declined, 4 - in progress, 5 - done

### Update booking
PUT /bookings/<id>

```json

body:
{
“customerId”: number,
“rideId”: number,
“status”: number,
“rating”: number,
“comment”: “string”,
}
```

### Delete booking
DELETE /bookings/<id>
