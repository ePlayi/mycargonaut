# User Login & Register


### Check if user is logged in
GET /login
-> returns user

### Register new user
POST /register
```json
body:
{
“name”: “string”,
“lastname”: “string”,
“username”: “string”,
“mail”: “string”,
“password”: “string”,
“phone”: “string”
}
```

### Login user
POST /login
```json
body:
{
“username”: “string”,
“password”: “string”
}
```
-> returns user


### Logout user
POST /logout
```json
body:
{
“username”: “string”,
“password”: “string”
}
```
-> returns user



