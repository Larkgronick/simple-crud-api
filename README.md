# Simple CRUD API

This CRUD API allows manage list of persons, stored  using in-memory database. 

## About

List of API paths:
* **GET** `/person` or `/person/personId` return all persons or person with corresponding `personId`
* **POST** `/person` is used to create record about new person and store it in database
* **PUT** `/person/personId` is used to update record about existing person
* **DELETE** `/person/personId` is used to delete record about existing person from database

Persons are stored as `objects` that have following properties:
* `id` — unique identifier, supposed to be generated via `uuid`
* `name` — person's name 
* `age` — person's age
* `hobbies` — person's hobbies

## Usage

1. Clone this repo on your local machine:
```bash
$ git clone https://github.com/Larkgronick/simple-crud-api.git
```
2. Be sure that you have install **node** and needed **dependencies**
3. Run application in **_development_** mode: 
 ```bash
$ npm run start:dev
```
To create **_production build_** you can execute:
 ```bash
$ npm run start:prod
``` 
4. Work with requests, composed in way, described in About section (more convenient via Postman)
