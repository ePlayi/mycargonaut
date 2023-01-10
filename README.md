# MyCargonaut

MyCargonaut ist ein Projekt, welches im Wintersemester 22/23 für das Modul "Konzepte Moderner Softwareentwicklung" aufgesetzt und entwickelt wurde. 

MyCargonaut ist dazu da, Waren und Personen von einem Ort an einen anderen zu befördern. Hierbei ist es aber so, dass die befördernde Person privat diese Reise antritt und freie Plätze / Stauraum durch die zu befördernden Güter auffüllen kann.

---
1. Frontend
    - Architektur
    - Komponenten
    - Router
    - Funktionen
2. Backend
    - Architektur
    - Datenbank
    - server.ts
3. Projekt bauen

---
## 1 Frontend

### 1.1 Architektur

Das Frontend wurde unter dem Vue-Framework aufgebaut. wir haben uns dafür entschieden, weil es sehr leichtgewichtig und einfach zu erlernen ist. Auch hatten wir im Team schon Erfahrung mit Vue, was ein weiterer Faktor zur Wahl war.

Auch gibt es verschiedene Plugins, die den Workflow erleichtern. Folgende Plugins, die spezielle für Vue gebaut worden sind, haben wir in unserem Projekt verwendet:
- Vue-Router - wird genutzt, um eine Browser-History zu erstellen
- Vuetify - eine UI Library, mit der man seine Website einfach stylen kann

Im Projekt haben wir teilweise auch Bootstrap verwendet, um u.A. Buttons oder Modale zu stylen.

Auch wird Axios als HTTP Libary verwendet, weil dadurch ein einfacher Umgang mit API-Calls möglich ist.

Mit vue war es möglich mit wenigen Zeilen eine Progressive Web App, kurz PWA, zu erstellen. Sehr einfach kann man das unter Android testen: Beim betreten der Website ist es möglich, diese als "App" herunterzuladen. Unter iOS ist es durch einen [Umwege](https://support.appyourself.net/de/articles/1252130-ablegen-der-progressive-web-app-auf-dem-homescreen-unter-ios) auch möglich.

### 1.2 Komponenten

Unsere Vue-Anwendung besteht aus mehreren Komponenten. Diese Komponenten kann man im Verzeichnis unter [mycargonaut/frontend/src/components/](mycargonaut/frontend/src/components/) finden.

Grundlegend hat jede Ansicht eine Main-Komponente. Das bedeutet, dass z.B. beim Aufruf der Profilseite die `Profile.vue` Komponente geladen wird. Diese wird im Projekt mit vue und vue-router so manipuliert, dass entweder das eigene Profil, oder ein Profil von jemand anderem angezeigt wird. Mit normalen HTML, CSS und JS wäre dieses Verhalten schwer zu realisieren gewesen, weshalb das ein weiterer Grund für das Vue-Framework ist.

### 1.3 Router

Das Routing und festhalten der History von der Website wird wie schon zuvor erwähnt mit vue-router realisiert. In der [mycargonaut/frontend/src/router/index.js](mycargonaut/frontend/src/router/index.js) Datei sind die möglichen Routen der Website aufgelistet.

### 1.4 Funktionen

Alle Ansichten, die mit dem Backend zusammenarbeiten, kommunizieren mittls Axios mit den Backend API-Routen. Sonst gibt es nur Funktionen, die die erhaltenen Daten filtern und auswerten, damit die Daten richtig auf der Website dargestellt werden können.

---
## 2 Backend

### 2.1 Architektur

Express.js wurde als Architektur im Backend gewählt. Auch wie bei Vue ist es einfach zu erlernen und es gab im Team Mitglieder, die schon Vorerfahrung damit hatten.

### 2.2 Datenbank

Am Anfang wurde versucht die Datenbank mittels Directus aufzusetzen. Directus ist eine SQL basierte Datenbank, die von sich aus eine API bereitstellt. Leider konnten wir nicht mit Directus weiterarbeiten, weil wir zu viele Requests getätigt haben, was die Datenbank nicht supported hat.

Nach diesem Fehlschlag wurde unsere Datenbank altbewährt mit MySQL umgesetzt. Es war einfach für uns mit phpMyAdmin die Datenbank zu erstellen und zu bearbeiten.

### 2.3 server.ts

In [mycargonaut/backend/src/server.ts](mycargonaut/backend/src/server.ts) findet man alles, was die Website zum laufen braucht. Wie zuvor beschrieben wird zunächst Express.js importiert und verwendet und im Nachhinein bereitgestellt. 

Auch sind alle Routen, die man im Frontend benötigt, in der Datei geschriebene. Es wird also die API bereitgestellt.

#### 2.3.1 Routen

User Login / Register
- Check if user is logged in
    - GET /login -> returns User
- Register new User
    - POST /register

        `body:
        {
        “name”: “string”,
        “lastname”: “string”,
        “username”: “string”,
        “mail”: “string”,
        “password”: “string”,
        “phone”: “string”
        }`
- Login user
    - POST /login
    
        `body:
        {
        “username”: “string”,
        “password”: “string”
        }`
        -> returns user
- Logout user
    - POST /logout

        `body:
        {
        “username”: “string”,
        “password”: “string”
        }`
        -> returns user
---

Profile
- Get profile
    - GET /profile
    -> returns user

- Get only ID of logged in User
    - GET /onlyUserId

- Get user profile by id
    - GET /user/**id**
    -> returns user

- Get vehicles of user
    - GET /profile/vehicles
    -> returns vehicleList

- Get ratings
    - GET /profile/ratings
    -> returns ratingList

- Get rating from profile by Id
    - GET /profile/ratings/**id**
    -> returns ratingList

- Update profile
    - PUT /profile

        `body:
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
        }`

- Update currency
    - PUT /currency

        `body:
        {
        “change”: number,
        “offerer”: number,
        “user”: number,
        “reason”: “string”
        }`

- Put currency back when ride canceled
    - PUT /currencyBack

        `body:
        {
        “change”: number,
        “customer”: number
        }`


- Update password
    - PUT /password

        `body:
        {
        “password”: “string”
        }`
---

Vehicles
- Get single vehicle
    - GET /vehicles/**id**
    -> returns vehicle
- Create new vehicle
    - POST /vehicles
        
        `body:
        {
        “userId”: number,
        “brand”: “string”,
        “model”: “string”,
        “seats”: number,
        “storage”: number,
        “image”: “string”
        }`
- Update vehicle
    - PUT /vehicles/**id**

        `body:
        {
        “userId”: number,
        “brand”: “string”,
        “model”: “string”,
        “seats”: number,
        “storage”: number,
        “image”: “string”
        }`
- Delete vehicle
    - DELETE /vehicles/**id**
---
Bookings

- STATUS LIST:
    - 1 - requested
    - 2 - booked
    - 3 - declined
    - 4 - in progress
    - 5 - done

- Get single booking
    - GET /bookings/**id**
    -> returns booking

- Get bookingIds where userId
    - GET /bookedRides
    -> returns booking_rideIds

- Get bookings for a customer
    - GET /profile/bookings
    -> returns bookingList

- Get booking requests for ride
    - GET /rides/_id_/bookings
    -> returns bookingList

- Create new booking
    - POST /bookings

        `body:
        {
        “customerId”: number,
        “rideId”: number,
        “status”: number
        }`

- Update booking
    - PUT /bookings/**id**

        `body:
        {
        “customerId”: number,
        “rideId”: number,
        “status”: number,
        “rating”: number,
        “comment”: “string”,
        }`

- Delete booking
    - DELETE /bookings/**id**

---
Rides
- Get single ride
    - GET /rides/**id**
    -> returns ride

- Get all rides
    - GET /rides
    -> returns rideList

- Create new ride
    - POST /rides

        `body:
        {
        “driverId”: number,
        “vehicleId”: number,
        “start”: “string”,
        “destination”: “string”,
        “dateTime”: “string”,
        “price”: number,
        “description”: “string”
        }`

- Update ride
    - PUT /rides/**id**

        `body:
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
        }`

- Delete ride
    - DELETE /rides/**id**
---
Tracking
- Update position of dirver where status = 4
    - PUT /updatePos

        `body:
        {
        “rideId”: number,
        “long”: decimal,
        “lat”: decimal
        }`

- Update status of ride
    - PUT /changeStatusRide

        `body:
        {
        “id”: number,
        “changeTo”: number,
        “bookingId": number
        }`

- Get active rides
    - GET /activeRides
    -> returns activeRides

- Get rides for driver where status = 1
    - GET /ridesAccepted
    -> returns acceptedList

- Get rides for driver where status = 2
    - GET /requestedRides
    -> returns requestList


---
Chats
- Get own chats
    - GET /chats
    -> returns chats

- Send message
    - POST /chat

        `body:
        {
        "sessionId”: number,
        “receiverId”: number,
        “message”: “string”
        }`

- Get single chat by id
    - GET /chat/**id**
    -> returns messages
---
Rating
- Get bookings where user can rate
    - GET /rateable
    -> returns rateables
- Update booking comment and rating
    - PUT /sendRating

        `body:
        {
        "rating”: number,
        “comment”: "string",
        “bookingId”: number
        }`

- Update user profile rating
    - PUT /updateUserRating

        `body:
        {
        "driverId”: number
        }`
---



### 3 Projekt lokal aufbauen
1. Zunächst muss das Repo mit `git clone https://github.com/ePlayi/mycargonaut.git` oder `git clone git@github.com:ePlayi/mycargonaut.git` geklont werden
2. Man muss in den `frontend` Ordner gehen und alle nötigen Dependencies mit `npm install` installieren
3. Im gleichen Ordner muss `npm run build` aufgerufen werden, damit das Frontend gebaut wird und zur Verfügung steht
4. Jetzt muss man in den Ordner `backend/src` gehen und mit `node server.js` den Server starten
    - Hier ist es ratsam nach einem Pull den Server neu zu compilen. Das macht man mit `tsc server.ts`, was eine neue `server.js` generiert
5. Jetzt kann man das Projekt lokal unter `localhost:3001` aufrufen.
