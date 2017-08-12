URL shortener Microservice
==========================

## User stories:

* **User Story 1:** I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

* **User Story 2:** If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

* **User Story 3:** When I visit that shortened URL, it will redirect me to my original link.

##Usage
###Create short url:

````
curl -X POST \
http://localhost:4200/api/short-urls \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d url=https%3A%2F%2Fgoogle.com
````
###Response

````
{ "original_url": "https://google.com", "short_url": "http://localhost:4200/p/rJVV7unPb" }
````
###Error Response

````
{"error":"Given url does not exist."}
````
````
{"error":"Invalid url format given."}
````
