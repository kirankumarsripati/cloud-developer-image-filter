# Udagram Image Filtering Microservice

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

## Installation
1. `npm i` to install all dependencies
2. `npm run dev` to build and start

## Usage
1. Create a environment variable `JWT_SECRET`
`
For example, if you are on Mac/Linux, add to bash profile (`~/.zshrc` or `./bash_profile`)

`export JWT_SECRET=myJWTSecretForUdacity`

2. Generate a JWT Token

`POST /api/v0/auth`

    curl -i -H 'Content-Type: application/json' -X POST -d '{ "email": "demo@example.com", "password": "anypassword"}' http://localhost:8082/api/v0/auth

3. Use generated JWT Token in authorization header of image filter API

`GET /api/v0/filteredimage?image_url={{image_url}}`

You can use Postman Collection - `cloud-cdnd-c2-final.postman_collection.json` to test the functionality. Make sure to update JWT Token for the collection and HOST variable to test with your URL.

## AWS Beanstalk URL
[http://cloud-developer-image-filter-dev.ap-south-1.elasticbeanstalk.com/](http://cloud-developer-image-filter-dev.ap-south-1.elasticbeanstalk.com/)
